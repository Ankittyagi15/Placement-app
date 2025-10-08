import placementPredictor from './placementPredictor.js';
import questionRecommender from './questionRecommender.js';

// Initialize and train ML models on server startup
export async function initializeMLModels() {
  console.log('🤖 Initializing ML models...');

  try {
    // Train placement prediction model
    console.log('Training placement prediction model...');
    await placementPredictor.trainModel();
    console.log('✅ Placement prediction model trained successfully');

    // Train question recommendation models
    console.log('Training question recommendation models...');
    await questionRecommender.trainModels();
    console.log('✅ Question recommendation models trained successfully');

    console.log('🎉 All ML models initialized and ready!');
    return true;
  } catch (error) {
    console.error('❌ Failed to initialize ML models:', error.message);
    console.log('Models will use fallback rule-based approaches');
    return false;
  }
}

// Get model status summary
export function getModelStatus() {
  return {
    placementPredictor: placementPredictor.getModelInfo(),
    questionRecommender: questionRecommender.getModelInfo(),
    timestamp: new Date().toISOString()
  };
}

// Force retrain all models (for admin use)
export async function retrainAllModels() {
  console.log('🔄 Force retraining all ML models...');

  try {
    await placementPredictor.trainModel();
    await questionRecommender.trainModels();

    console.log('✅ All models retrained successfully');
    return getModelStatus();
  } catch (error) {
    console.error('❌ Failed to retrain models:', error.message);
    throw error;
  }
}
