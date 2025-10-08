import * as tf from '@tensorflow/tfjs-node';
import path from 'path';

// Placement Prediction Model using TensorFlow.js
class PlacementPredictor {
  constructor() {
    this.model = null;
    this.isTrained = false;
    // Use relative path for backend deployment
    this.modelPath = path.join(process.cwd(), 'src', 'services', 'ml', 'models', 'placement_model');
  }

  // Create model architecture
  createModel() {
    this.model = tf.sequential({
      layers: [
        tf.layers.dense({ inputShape: [6], units: 32, activation: 'relu' }),
        tf.layers.dropout({ rate: 0.2 }),
        tf.layers.dense({ units: 16, activation: 'relu' }),
        tf.layers.dropout({ rate: 0.1 }),
        tf.layers.dense({ units: 8, activation: 'relu' }),
        tf.layers.dense({ units: 1, activation: 'sigmoid' }) // Probability output
      ]
    });

    this.model.compile({
      optimizer: tf.train.adam(0.001),
      loss: 'binaryCrossentropy',
      metrics: ['accuracy']
    });

    console.log('Placement prediction model created');
  }

  // Generate training data based on MCQ performance and other factors
  generateTrainingData() {
    // Features: [mcq_score, technical_score, aptitude_score, communication_score, projects_score, cgpa]
    // Target: placement_probability (0-1)

    const trainingData = [
      // High performers - High placement probability
      { features: [95, 92, 88, 90, 85, 8.5], target: 0.95 },
      { features: [88, 85, 82, 87, 80, 8.2], target: 0.88 },
      { features: [92, 89, 86, 88, 82, 8.7], target: 0.92 },
      { features: [87, 84, 81, 85, 78, 8.0], target: 0.85 },
      { features: [94, 91, 89, 92, 87, 8.8], target: 0.94 },

      // Medium performers - Medium placement probability
      { features: [78, 75, 72, 76, 70, 7.5], target: 0.75 },
      { features: [82, 79, 76, 80, 74, 7.8], target: 0.78 },
      { features: [75, 72, 69, 73, 67, 7.2], target: 0.70 },
      { features: [80, 77, 74, 78, 72, 7.7], target: 0.76 },
      { features: [85, 82, 79, 83, 77, 8.0], target: 0.82 },

      // Lower performers - Lower placement probability
      { features: [65, 62, 59, 63, 57, 6.8], target: 0.55 },
      { features: [70, 67, 64, 68, 62, 7.0], target: 0.62 },
      { features: [68, 65, 62, 66, 60, 6.9], target: 0.58 },
      { features: [72, 69, 66, 70, 64, 7.1], target: 0.65 },
      { features: [60, 57, 54, 58, 52, 6.5], target: 0.45 },

      // Very high performers
      { features: [98, 96, 94, 97, 92, 9.2], target: 0.98 },
      { features: [96, 94, 92, 95, 90, 9.0], target: 0.96 },
      { features: [99, 97, 95, 98, 93, 9.5], target: 0.99 },

      // Average performers
      { features: [76, 73, 70, 74, 68, 7.4], target: 0.72 },
      { features: [74, 71, 68, 72, 66, 7.2], target: 0.68 },
      { features: [79, 76, 73, 77, 71, 7.6], target: 0.74 },
    ];

    // Shuffle the data
    for (let i = trainingData.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [trainingData[i], trainingData[j]] = [trainingData[j], trainingData[i]];
    }

    return trainingData;
  }

  // Train the model
  async trainModel() {
    if (!this.model) {
      this.createModel();
    }

    const trainingData = this.generateTrainingData();
    const features = trainingData.map(d => d.features);
    const targets = trainingData.map(d => d.target);

    const xs = tf.tensor2d(features);
    const ys = tf.tensor2d(targets, [targets.length, 1]);

    console.log('Training placement prediction model...');

    await this.model.fit(xs, ys, {
      epochs: 100,
      batchSize: 8,
      validationSplit: 0.2,
      callbacks: {
        onEpochEnd: (epoch, logs) => {
          console.log(`Epoch ${epoch}: loss = ${logs.loss.toFixed(4)}, accuracy = ${logs.acc.toFixed(4)}`);
        }
      }
    });

    this.isTrained = true;
    console.log('Placement prediction model trained successfully');

    // Save the model
    await this.model.save(`file://${this.modelPath}`);
    console.log('Model saved to', this.modelPath);
  }

  // Load pre-trained model
  async loadModel() {
    try {
      this.model = await tf.loadLayersModel(`file://${this.modelPath}/model.json`);
      this.isTrained = true;
      console.log('Pre-trained placement prediction model loaded');
    } catch (error) {
      console.log('No pre-trained model found, need to train first');
      return false;
    }
    return true;
  }

  // Predict placement probability
  predictPlacementProbability(userData) {
    if (!this.model || !this.isTrained) {
      throw new Error('Model not trained or loaded');
    }

    // Expected format: { mcqScore, technicalScore, aptitudeScore, communicationScore, projectsScore, cgpa }
    const features = [
      userData.mcqScore || 0,
      userData.technicalScore || 0,
      userData.aptitudeScore || 0,
      userData.communicationScore || 0,
      userData.projectsScore || 0,
      userData.cgpa || 0
    ];

    const input = tf.tensor2d([features]);
    const prediction = this.model.predict(input);
    const probability = prediction.dataSync()[0];

    // Clean up tensors
    input.dispose();
    prediction.dispose();

    return {
      placementProbability: Math.round(probability * 100) / 100,
      confidence: this.calculateConfidence(probability),
      recommendations: this.generateRecommendations(userData, probability)
    };
  }

  // Calculate confidence based on prediction certainty
  calculateConfidence(probability) {
    // Higher confidence when prediction is closer to 0 or 1
    return Math.min(0.95, 1 - 2 * Math.abs(probability - 0.5));
  }

  // Generate personalized recommendations
  generateRecommendations(userData, probability) {
    const recommendations = [];

    if (userData.mcqScore < 70) {
      recommendations.push("Focus on improving MCQ performance through regular practice");
    }
    if (userData.technicalScore < 70) {
      recommendations.push("Strengthen your technical skills with coding practice and projects");
    }
    if (userData.aptitudeScore < 70) {
      recommendations.push("Practice more aptitude and logical reasoning questions");
    }
    if (userData.communicationScore < 70) {
      recommendations.push("Work on communication skills and presentation abilities");
    }
    if (userData.projectsScore < 70) {
      recommendations.push("Build more projects to showcase in your portfolio");
    }
    if (userData.cgpa < 7.0) {
      recommendations.push("Focus on maintaining good academic performance");
    }

    if (probability > 0.8) {
      recommendations.unshift("Excellent placement chances! Keep up the great work");
    } else if (probability > 0.6) {
      recommendations.unshift("Good placement chances with some improvements");
    } else if (probability > 0.4) {
      recommendations.unshift("Moderate placement chances - focus on weak areas");
    } else {
      recommendations.unshift("Placement chances need significant improvement");
    }

    return recommendations;
  }

  // Get model statistics
  getModelInfo() {
    return {
      isTrained: this.isTrained,
      modelPath: this.modelPath,
      architecture: this.model ? 'Neural Network (6->32->16->8->1)' : 'Not loaded'
    };
  }
}

export default new PlacementPredictor();
