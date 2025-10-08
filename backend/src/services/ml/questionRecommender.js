import * as tf from '@tensorflow/tfjs-node';
import path from 'path';
import Question from '../../models/Question.js';

// Question Recommendation System using collaborative filtering and content-based approaches
class QuestionRecommender {
  constructor() {
    this.questionModel = null;
    this.userModel = null;
    this.isTrained = false;
    this.questions = [];
    this.modelPath = path.join(process.cwd(), 'models', 'question_recommender');
  }

  // Create recommendation model
  createModel() {
    // Content-based filtering model for questions
    this.questionModel = tf.sequential({
      layers: [
        tf.layers.dense({ inputShape: [8], units: 16, activation: 'relu' }),
        tf.layers.dense({ units: 8, activation: 'relu' }),
        tf.layers.dense({ units: 4, activation: 'relu' }),
        tf.layers.dense({ units: 2, activation: 'linear' }) // 2D embedding
      ]
    });

    this.questionModel.compile({
      optimizer: tf.train.adam(0.001),
      loss: 'meanSquaredError'
    });

    // User preference model
    this.userModel = tf.sequential({
      layers: [
        tf.layers.dense({ inputShape: [6], units: 12, activation: 'relu' }),
        tf.layers.dense({ units: 6, activation: 'relu' }),
        tf.layers.dense({ units: 2, activation: 'linear' }) // 2D user preference vector
      ]
    });

    this.userModel.compile({
      optimizer: tf.train.adam(0.001),
      loss: 'meanSquaredError'
    });

    console.log('Question recommendation models created');
  }

  // Convert question to feature vector
  questionToFeatures(question) {
    return [
      question.difficulty === 'Easy' ? 1 : question.difficulty === 'Medium' ? 2 : 3, // difficulty score
      this.getTagScore(question.tags), // tag relevance score
      question.kind === 'mcq' ? 1 : 0, // question type
      this.getSourceScore(question.source), // source reliability
      question.createdAt ? new Date(question.createdAt).getTime() / (1000 * 60 * 60 * 24) : 0, // recency
      question.status === 'approved' ? 1 : 0, // approval status
      question.likes || 0, // popularity
      Math.random() * 0.1 // small random factor for exploration
    ];
  }

  // Get tag relevance score based on common placement topics
  getTagScore(tags) {
    if (!tags || !Array.isArray(tags)) return 0.5;

    const importantTags = ['technical', 'quant', 'verbal', 'logical', 'dsa', 'coding', 'aptitude'];
    const relevantTags = tags.filter(tag => importantTags.includes(tag.toLowerCase()));
    return Math.min(1, relevantTags.length / 3); // Normalize to 0-1
  }

  // Get source reliability score
  getSourceScore(source) {
    const reliabilityScores = {
      'LeetCode': 1.0,
      'GFG': 0.9,
      'Custom': 0.7,
      'InterviewBit': 0.95,
      'HackerRank': 0.9
    };
    return reliabilityScores[source] || 0.7;
  }

  // Convert user performance to preference vector
  userToFeatures(userData) {
    return [
      userData.mcqScore || 50, // MCQ performance
      userData.technicalScore || 50, // Technical knowledge
      userData.aptitudeScore || 50, // Aptitude skills
      userData.communicationScore || 50, // Communication skills
      userData.projectsScore || 50, // Project experience
      userData.cgpa || 7.0 // Academic performance
    ];
  }

  // Generate training data for question embeddings
  generateQuestionTrainingData() {
    const trainingData = [];

    // Create pairs of similar questions for training
    for (let i = 0; i < this.questions.length; i++) {
      for (let j = i + 1; j < Math.min(i + 5, this.questions.length); j++) {
        const q1 = this.questions[i];
        const q2 = this.questions[j];

        const features1 = this.questionToFeatures(q1);
        const features2 = this.questionToFeatures(q2);

        // Calculate similarity (1 if similar, 0 if different)
        const similarity = this.calculateQuestionSimilarity(q1, q2);

        trainingData.push({
          input1: features1,
          input2: features2,
          target: similarity
        });
      }
    }

    return trainingData;
  }

  // Calculate similarity between two questions
  calculateQuestionSimilarity(q1, q2) {
    let similarity = 0;

    // Same difficulty
    if (q1.difficulty === q2.difficulty) similarity += 0.3;

    // Similar tags
    const commonTags = q1.tags?.filter(tag => q2.tags?.includes(tag)) || [];
    similarity += Math.min(0.4, commonTags.length * 0.1);

    // Same source
    if (q1.source === q2.source) similarity += 0.2;

    // Same type
    if (q1.kind === q2.kind) similarity += 0.1;

    return Math.min(1, similarity);
  }

  // Train recommendation models
  async trainModels() {
    if (!this.questionModel || !this.userModel) {
      this.createModel();
    }

    // Load questions for training
    await this.loadQuestions();

    const questionTrainingData = this.generateQuestionTrainingData();

    if (questionTrainingData.length === 0) {
      console.log('No training data available for question recommendation');
      return;
    }

    // Prepare training data
    const q1Features = questionTrainingData.map(d => d.input1);
    const q2Features = questionTrainingData.map(d => d.input2);
    const targets = questionTrainingData.map(d => d.target);

    const q1Tensor = tf.tensor2d(q1Features);
    const q2Tensor = tf.tensor2d(q2Features);
    const targetTensor = tf.tensor2d(targets, [targets.length, 1]);

    console.log('Training question recommendation models...');

    // Train question model
    await this.questionModel.fit(q1Tensor, targetTensor, {
      epochs: 50,
      batchSize: 16,
      validationSplit: 0.2,
      callbacks: {
        onEpochEnd: (epoch, logs) => {
          console.log(`Question Model Epoch ${epoch}: loss = ${logs.loss.toFixed(4)}`);
        }
      }
    });

    // For user model, we'll use synthetic data based on performance patterns
    const userTrainingData = this.generateUserTrainingData();
    if (userTrainingData.length > 0) {
      const userFeatures = userTrainingData.map(d => d.input);
      const userTargets = userTrainingData.map(d => d.target);

      const userFeaturesTensor = tf.tensor2d(userFeatures);
      const userTargetsTensor = tf.tensor2d(userTargets, [userTargets.length, 2]);

      await this.userModel.fit(userFeaturesTensor, userTargetsTensor, {
        epochs: 30,
        batchSize: 8,
        validationSplit: 0.2,
        callbacks: {
          onEpochEnd: (epoch, logs) => {
            console.log(`User Model Epoch ${epoch}: loss = ${logs.loss.toFixed(4)}`);
          }
        }
      });
    }

    this.isTrained = true;
    console.log('Question recommendation models trained successfully');

    // Save models
    await this.questionModel.save(`file://${this.modelPath}_questions`);
    if (this.userModel) {
      await this.userModel.save(`file://${this.modelPath}_users`);
    }
  }

  // Generate synthetic user training data
  generateUserTrainingData() {
    // Create patterns: high performers prefer hard questions, low performers prefer easy questions
    const patterns = [
      { performance: [85, 80, 75, 70, 65, 8.0], preference: [0.7, 0.3] }, // Prefers medium-hard
      { performance: [95, 90, 85, 80, 75, 8.5], preference: [0.9, 0.1] }, // Prefers hard
      { performance: [65, 60, 55, 60, 55, 7.0], preference: [0.2, 0.8] }, // Prefers easy
      { performance: [75, 70, 65, 65, 60, 7.5], preference: [0.4, 0.6] }, // Prefers easy-medium
    ];

    return patterns.map(p => ({
      input: p.performance,
      target: p.preference
    }));
  }

  // Load questions for training
  async loadQuestions() {
    try {
      this.questions = await Question.find({ status: 'approved' }).limit(200);
      console.log(`Loaded ${this.questions.length} questions for training`);
    } catch (error) {
      console.error('Error loading questions:', error);
      this.questions = [];
    }
  }

  // Recommend questions for a user
  async recommendQuestions(userData, count = 10) {
    if (!this.isTrained) {
      await this.loadModels();
    }

    if (!this.questionModel || !this.userModel) {
      // Fallback: simple rule-based recommendation
      return this.getRuleBasedRecommendations(userData, count);
    }

    // Get user preference vector
    const userFeatures = this.userToFeatures(userData);
    const userInput = tf.tensor2d([userFeatures]);
    const userPreference = this.userModel.predict(userInput);
    const preferenceVector = userPreference.dataSync();

    // Score all questions
    const questionScores = [];
    for (const question of this.questions.slice(0, 100)) { // Limit for performance
      const questionFeatures = this.questionToFeatures(question);
      const qInput = tf.tensor2d([questionFeatures]);
      const qEmbedding = this.questionModel.predict(qInput);

      // Calculate similarity with user preference
      const similarity = this.calculateVectorSimilarity(preferenceVector, qEmbedding.dataSync());
      questionScores.push({
        question,
        score: similarity
      });

      // Clean up tensors
      qInput.dispose();
      qEmbedding.dispose();
    }

    // Clean up user tensors
    userInput.dispose();
    userPreference.dispose();

    // Sort by score and return top recommendations
    questionScores.sort((a, b) => b.score - a.score);

    return questionScores.slice(0, count).map(item => ({
      ...item.question.toObject(),
      recommendationScore: Math.round(item.score * 100) / 100,
      recommendationReason: this.getRecommendationReason(item.question, userData, item.score)
    }));
  }

  // Calculate cosine similarity between vectors
  calculateVectorSimilarity(vec1, vec2) {
    let dotProduct = 0;
    let norm1 = 0;
    let norm2 = 0;

    for (let i = 0; i < vec1.length; i++) {
      dotProduct += vec1[i] * vec2[i];
      norm1 += vec1[i] * vec1[i];
      norm2 += vec2[i] * vec2[i];
    }

    if (norm1 === 0 || norm2 === 0) return 0;
    return dotProduct / (Math.sqrt(norm1) * Math.sqrt(norm2));
  }

  // Get recommendation reason
  getRecommendationReason(question, userData, score) {
    const reasons = [];

    if (question.difficulty === 'Easy' && (userData.mcqScore < 70 || userData.technicalScore < 70)) {
      reasons.push("Builds foundational knowledge");
    } else if (question.difficulty === 'Hard' && (userData.mcqScore > 80 && userData.technicalScore > 80)) {
      reasons.push("Challenges advanced skills");
    }

    if (question.tags?.includes('technical') && userData.technicalScore > userData.mcqScore) {
      reasons.push("Matches your technical strengths");
    }

    if (question.tags?.includes('quant') && userData.aptitudeScore > userData.mcqScore) {
      reasons.push("Aligns with your aptitude skills");
    }

    if (score > 0.8) {
      reasons.push("Highly recommended for your skill level");
    }

    return reasons.length > 0 ? reasons[0] : "Personalized recommendation";
  }

  // Rule-based recommendation fallback
  getRuleBasedRecommendations(userData, count = 10) {
    const recommendations = [];

    // Prioritize based on weak areas
    const weakAreas = [];
    if (userData.mcqScore < 70) weakAreas.push('mcq');
    if (userData.technicalScore < 70) weakAreas.push('technical');
    if (userData.aptitudeScore < 70) weakAreas.push('quant');

    // Filter questions based on weak areas and user level
    for (const question of this.questions) {
      if (recommendations.length >= count) break;

      let shouldRecommend = false;
      let score = 0.5; // base score

      // Recommend based on weak areas
      if (weakAreas.includes('mcq') && question.kind === 'mcq') {
        shouldRecommend = true;
        score += 0.2;
      }

      if (weakAreas.includes('technical') && question.tags?.includes('technical')) {
        shouldRecommend = true;
        score += 0.2;
      }

      if (weakAreas.includes('quant') && question.tags?.includes('quant')) {
        shouldRecommend = true;
        score += 0.2;
      }

      // Adjust difficulty based on performance
      if (userData.mcqScore > 80 && question.difficulty === 'Hard') {
        shouldRecommend = true;
        score += 0.1;
      } else if (userData.mcqScore < 60 && question.difficulty === 'Easy') {
        shouldRecommend = true;
        score += 0.1;
      }

      if (shouldRecommend) {
        recommendations.push({
          ...question.toObject(),
          recommendationScore: Math.round(score * 100) / 100,
          recommendationReason: this.getRecommendationReason(question, userData, score)
        });
      }
    }

    return recommendations;
  }

  // Load pre-trained models
  async loadModels() {
    try {
      this.questionModel = await tf.loadLayersModel(`file://${this.modelPath}_questions/model.json`);
      try {
        this.userModel = await tf.loadLayersModel(`file://${this.modelPath}_users/model.json`);
      } catch (e) {
        console.log('User model not found, using rule-based approach');
      }
      this.isTrained = true;
      console.log('Question recommendation models loaded');
    } catch (error) {
      console.log('No pre-trained models found, using rule-based recommendation');
      this.isTrained = false;
    }
  }

  // Get model information
  getModelInfo() {
    return {
      isTrained: this.isTrained,
      questionsLoaded: this.questions.length,
      models: {
        questionModel: this.questionModel ? 'Neural Network (8->16->8->4->2)' : 'Not loaded',
        userModel: this.userModel ? 'Neural Network (6->12->6->2)' : 'Not loaded'
      }
    };
  }
}

export default new QuestionRecommender();
