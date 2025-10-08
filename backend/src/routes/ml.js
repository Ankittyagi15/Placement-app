import { Router } from 'express';
import placementPredictor from '../services/ml/placementPredictor.js';
import questionRecommender from '../services/ml/questionRecommender.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// Train placement prediction model
router.post('/train-placement', requireAuth, async (req, res) => {
  try {
    const { forceRetrain = false } = req.body;

    if (!forceRetrain && placementPredictor.isTrained) {
      return res.json({
        message: 'Model already trained',
        modelInfo: placementPredictor.getModelInfo()
      });
    }

    await placementPredictor.trainModel();

    res.json({
      message: 'Placement prediction model trained successfully',
      modelInfo: placementPredictor.getModelInfo()
    });
  } catch (error) {
    console.error('Error training placement model:', error);
    res.status(500).json({
      message: 'Failed to train placement model',
      error: error.message
    });
  }
});

// Get placement prediction
router.post('/predict-placement', requireAuth, async (req, res) => {
  try {
    const userData = req.body;

    if (!userData.mcqScore && !userData.technicalScore) {
      return res.status(400).json({
        message: 'At least MCQ score or technical score is required'
      });
    }

    // Ensure model is trained or load pre-trained model
    if (!placementPredictor.isTrained) {
      const loaded = await placementPredictor.loadModel();
      if (!loaded) {
        // Train model if no pre-trained model exists
        await placementPredictor.trainModel();
      }
    }

    const prediction = placementPredictor.predictPlacementProbability(userData);

    res.json({
      success: true,
      prediction,
      modelInfo: placementPredictor.getModelInfo()
    });
  } catch (error) {
    console.error('Error predicting placement:', error);
    res.status(500).json({
      message: 'Failed to predict placement probability',
      error: error.message
    });
  }
});

// Train question recommendation model
router.post('/train-recommendations', requireAuth, async (req, res) => {
  try {
    const { forceRetrain = false } = req.body;

    if (!forceRetrain && questionRecommender.isTrained) {
      return res.json({
        message: 'Models already trained',
        modelInfo: questionRecommender.getModelInfo()
      });
    }

    await questionRecommender.trainModels();

    res.json({
      message: 'Question recommendation models trained successfully',
      modelInfo: questionRecommender.getModelInfo()
    });
  } catch (error) {
    console.error('Error training recommendation models:', error);
    res.status(500).json({
      message: 'Failed to train recommendation models',
      error: error.message
    });
  }
});

// Get personalized question recommendations
router.post('/recommend-questions', requireAuth, async (req, res) => {
  try {
    const { count = 10 } = req.body;
    const userData = req.body;

    if (!userData.mcqScore && !userData.technicalScore) {
      return res.status(400).json({
        message: 'At least MCQ score or technical score is required for recommendations'
      });
    }

    // Ensure models are trained or load pre-trained models
    if (!questionRecommender.isTrained) {
      await questionRecommender.loadModels();
    }

    const recommendations = await questionRecommender.recommendQuestions(userData, count);

    res.json({
      success: true,
      recommendations,
      count: recommendations.length,
      modelInfo: questionRecommender.getModelInfo()
    });
  } catch (error) {
    console.error('Error getting recommendations:', error);
    res.status(500).json({
      message: 'Failed to get question recommendations',
      error: error.message
    });
  }
});

// Get MCQ performance analysis
router.post('/analyze-mcq-performance', requireAuth, async (req, res) => {
  try {
    const { answers = [], questionIds = [] } = req.body;

    if (answers.length === 0) {
      return res.status(400).json({
        message: 'Answers array is required'
      });
    }

    // Calculate performance metrics
    const totalQuestions = answers.length;
    const correctAnswers = answers.filter(answer => answer.isCorrect).length;
    const accuracy = (correctAnswers / totalQuestions) * 100;

    // Analyze by difficulty
    const difficultyAnalysis = {};
    const topicAnalysis = {};

    answers.forEach(answer => {
      const { question, isCorrect } = answer;

      // Difficulty analysis
      const difficulty = question.difficulty || 'Unknown';
      if (!difficultyAnalysis[difficulty]) {
        difficultyAnalysis[difficulty] = { total: 0, correct: 0 };
      }
      difficultyAnalysis[difficulty].total++;
      if (isCorrect) difficultyAnalysis[difficulty].correct++;

      // Topic analysis
      if (question.tags) {
        question.tags.forEach(tag => {
          if (!topicAnalysis[tag]) {
            topicAnalysis[tag] = { total: 0, correct: 0 };
          }
          topicAnalysis[tag].total++;
          if (isCorrect) topicAnalysis[tag].correct++;
        });
      }
    });

    // Calculate accuracy by difficulty and topic
    Object.keys(difficultyAnalysis).forEach(difficulty => {
      const data = difficultyAnalysis[difficulty];
      data.accuracy = (data.correct / data.total) * 100;
    });

    Object.keys(topicAnalysis).forEach(topic => {
      const data = topicAnalysis[topic];
      data.accuracy = (data.correct / data.total) * 100;
    });

    // Generate improvement suggestions
    const suggestions = [];

    if (accuracy < 70) {
      suggestions.push("Focus on practicing more questions to improve overall accuracy");
    }

    // Check weak difficulties
    Object.entries(difficultyAnalysis).forEach(([difficulty, data]) => {
      if (data.accuracy < 60) {
        suggestions.push(`Need more practice with ${difficulty} level questions`);
      }
    });

    // Check weak topics
    Object.entries(topicAnalysis).forEach(([topic, data]) => {
      if (data.accuracy < 60) {
        suggestions.push(`Strengthen your understanding of ${topic} concepts`);
      }
    });

    if (suggestions.length === 0) {
      suggestions.push("Great performance! Keep practicing to maintain your skills");
    }

    res.json({
      success: true,
      analysis: {
        overall: {
          totalQuestions,
          correctAnswers,
          accuracy: Math.round(accuracy * 100) / 100
        },
        byDifficulty: difficultyAnalysis,
        byTopic: topicAnalysis,
        suggestions
      }
    });
  } catch (error) {
    console.error('Error analyzing MCQ performance:', error);
    res.status(500).json({
      message: 'Failed to analyze MCQ performance',
      error: error.message
    });
  }
});

// Get comprehensive placement dashboard data
router.post('/placement-dashboard', requireAuth, async (req, res) => {
  try {
    const userData = req.body;

    if (!userData.mcqScore && !userData.technicalScore) {
      return res.status(400).json({
        message: 'User performance data is required'
      });
    }

    // Get placement prediction
    let placementPrediction = null;
    try {
      if (!placementPredictor.isTrained) {
        await placementPredictor.loadModel();
      }
      if (placementPredictor.isTrained) {
        placementPrediction = placementPredictor.predictPlacementProbability(userData);
      }
    } catch (error) {
      console.log('Placement prediction not available:', error.message);
    }

    // Get question recommendations
    let recommendations = [];
    try {
      if (!questionRecommender.isTrained) {
        await questionRecommender.loadModels();
      }
      if (questionRecommender.isTrained) {
        recommendations = await questionRecommender.recommendQuestions(userData, 5);
      }
    } catch (error) {
      console.log('Question recommendations not available:', error.message);
    }

    // Calculate skill gaps
    const skillGaps = [];
    if (userData.mcqScore < 70) skillGaps.push({ skill: 'MCQ Practice', severity: 'high' });
    if (userData.technicalScore < 70) skillGaps.push({ skill: 'Technical Skills', severity: 'high' });
    if (userData.aptitudeScore < 70) skillGaps.push({ skill: 'Aptitude', severity: 'medium' });
    if (userData.communicationScore < 70) skillGaps.push({ skill: 'Communication', severity: 'medium' });
    if (userData.projectsScore < 70) skillGaps.push({ skill: 'Projects', severity: 'high' });
    if (userData.cgpa < 7.0) skillGaps.push({ skill: 'Academic Performance', severity: 'medium' });

    // Generate study plan
    const studyPlan = [];
    if (userData.mcqScore < 70) {
      studyPlan.push({
        category: 'MCQ Practice',
        duration: '2-3 hours daily',
        focus: 'Focus on weak topics identified in your performance analysis'
      });
    }
    if (userData.technicalScore < 70) {
      studyPlan.push({
        category: 'Technical Skills',
        duration: '3-4 hours daily',
        focus: 'Practice coding problems and build small projects'
      });
    }
    if (userData.aptitudeScore < 70) {
      studyPlan.push({
        category: 'Aptitude',
        duration: '1-2 hours daily',
        focus: 'Practice quantitative and logical reasoning questions'
      });
    }

    res.json({
      success: true,
      dashboard: {
        placementPrediction,
        recommendations,
        skillGaps,
        studyPlan,
        modelStatus: {
          placementModel: placementPredictor.getModelInfo(),
          recommendationModel: questionRecommender.getModelInfo()
        }
      }
    });
  } catch (error) {
    console.error('Error generating dashboard:', error);
    res.status(500).json({
      message: 'Failed to generate placement dashboard',
      error: error.message
    });
  }
});

// Get model status and information
router.get('/models/status', requireAuth, async (req, res) => {
  try {
    res.json({
      success: true,
      models: {
        placementPredictor: placementPredictor.getModelInfo(),
        questionRecommender: questionRecommender.getModelInfo()
      }
    });
  } catch (error) {
    console.error('Error getting model status:', error);
    res.status(500).json({
      message: 'Failed to get model status',
      error: error.message
    });
  }
});

export default router;
