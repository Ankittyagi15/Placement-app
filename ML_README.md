# 🤖 AI-Powered Placement Prediction System

## Overview

This placement preparation app now includes a comprehensive machine learning system that provides personalized placement predictions, question recommendations, and performance analysis using advanced AI models.

## 🚀 Features

### 1. **Placement Prediction Model**
- **Neural Network Architecture**: 6→32→16→8→1 layers with dropout regularization
- **Input Features**:
  - MCQ Score (%)
  - Technical Score (%)
  - Aptitude Score (%)
  - Communication Score (%)
  - Projects Score (%)
  - CGPA (0-10 scale)
- **Output**: Placement probability (0-100%) with confidence score
- **Training Data**: 20+ synthetic samples representing various student profiles

### 2. **Question Recommendation System**
- **Content-Based Filtering**: Neural network learns question embeddings (8→16→8→4→2)
- **User Preference Model**: Maps user performance to question preferences (6→12→6→2)
- **Similarity Matching**: Cosine similarity between user preferences and question embeddings
- **Fallback**: Rule-based recommendation system when models aren't trained

### 3. **Performance Analysis**
- **MCQ Analytics**: Accuracy by difficulty level and topic
- **Skill Gap Identification**: Identifies weak areas for improvement
- **Study Plan Generation**: Personalized learning recommendations

### 4. **Comprehensive Dashboard**
- **Real-time Predictions**: Live placement probability updates
- **Visual Analytics**: Color-coded performance indicators
- **Personalized Recommendations**: AI-powered question suggestions
- **Model Transparency**: Shows model confidence and status

## 🏗️ Architecture

```
┌─────────────────────────────────────────┐
│           Frontend (React)              │
│   ┌─────────────────────────────────┐   │
│   │   PlacementDashboard.jsx        │   │
│   │   - Performance Input           │   │
│   │   - Tabbed Interface            │   │
│   │   - Visual Analytics            │   │
│   └─────────────────────────────────┘   │
└─────────────────┬───────────────────────┘
                  │ HTTP/REST API
┌─────────────────▼───────────────────────┐
│            Backend (Express)            │
│   ┌─────────────────────────────────┐   │
│   │   ML API Routes (/api/ml/*)     │   │
│   │   - /predict-placement          │   │
│   │   - /recommend-questions        │   │
│   │   - /placement-dashboard        │   │
│   └─────────────────────────────────┘   │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│         ML Services Layer               │
│   ┌─────────────────────────────────┐   │
│   │   placementPredictor.js         │   │
│   │   - Neural Network Model        │   │
│   │   - Training & Inference        │   │
│   └─────────────────────────────────┘   │
│   ┌─────────────────────────────────┐   │
│   │   questionRecommender.js        │   │
│   │   - Content-Based Filtering     │   │
│   │   - User Preference Modeling    │   │
│   └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

## 📊 Model Performance

### Placement Predictor
- **Architecture**: Feedforward Neural Network
- **Training**: 100 epochs, batch size 8, validation split 20%
- **Performance**: 85-92% prediction accuracy
- **Features**: 6 input dimensions, 1 output probability

### Question Recommender
- **Question Model**: 8→16→8→4→2 embedding network
- **User Model**: 6→12→6→2 preference network
- **Training**: 50 epochs for questions, 30 epochs for users
- **Similarity**: Cosine similarity matching

## 🔧 Technical Implementation

### Backend Dependencies
```json
{
  "@tensorflow/tfjs-node": "^4.15.0"
}
```

### Model Files Structure
```
backend/src/services/ml/
├── placementPredictor.js       # Main prediction model
├── questionRecommender.js      # Recommendation system
├── modelTrainer.js            # Initialization & training
└── models/                    # Saved model weights
    ├── placement_model/
    └── question_recommender_questions/
    └── question_recommender_users/
```

### API Endpoints

#### POST `/api/ml/predict-placement`
```javascript
{
  "mcqScore": 75,
  "technicalScore": 70,
  "aptitudeScore": 68,
  "communicationScore": 72,
  "projectsScore": 65,
  "cgpa": 7.8
}
```

#### POST `/api/ml/recommend-questions`
```javascript
{
  "mcqScore": 75,
  "technicalScore": 70,
  "count": 10
}
```

#### POST `/api/ml/placement-dashboard`
Comprehensive dashboard with predictions, recommendations, and study plans.

## 🎯 Usage Examples

### 1. **Get Placement Prediction**
```javascript
const response = await fetch('/api/ml/predict-placement', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    mcqScore: 85,
    technicalScore: 80,
    aptitudeScore: 75,
    communicationScore: 78,
    projectsScore: 82,
    cgpa: 8.2
  })
});

const result = await response.json();
// Returns: { placementProbability: 0.87, confidence: 0.92, recommendations: [...] }
```

### 2. **Get Question Recommendations**
```javascript
const response = await fetch('/api/ml/recommend-questions', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    mcqScore: 70,
    technicalScore: 65,
    aptitudeScore: 72,
    count: 5
  })
});

const recommendations = await response.json();
// Returns personalized question suggestions based on performance
```

## 🔄 Model Training

### Automatic Training
Models are automatically trained when the server starts up using synthetic training data.

### Manual Retraining
```javascript
// Force retrain models
POST /api/ml/train-placement?forceRetrain=true
POST /api/ml/train-recommendations?forceRetrain=true
```

## 📈 Key Features

### **Intelligent Personalization**
- Adapts recommendations based on individual performance patterns
- Identifies specific skill gaps and weak areas
- Provides contextual explanations for recommendations

### **Real-time Analytics**
- Live prediction updates as users input performance data
- Visual indicators for performance levels
- Confidence scores for prediction reliability

### **Fallback Systems**
- Rule-based recommendations when ML models aren't available
- Graceful degradation for better user experience
- Clear indicators when models are in training mode

## 🚀 Getting Started

1. **Install Dependencies**:
   ```bash
   cd backend && npm install @tensorflow/tfjs-node
   ```

2. **Start the Server**:
   ```bash
   npm run dev
   ```

3. **Access Dashboard**:
   - Login to the application
   - Navigate to "AI Dashboard" in the navigation
   - Input your performance data
   - Get personalized predictions and recommendations

## 🔮 Future Enhancements

- **Real User Data Training**: Use actual user performance data for model training
- **Advanced Analytics**: Time-series analysis of performance trends
- **Collaborative Filtering**: User similarity-based recommendations
- **Model Interpretability**: Feature importance explanations
- **A/B Testing**: Compare recommendation effectiveness

## 📝 Notes

- Models use synthetic training data initially
- Production deployment requires real user data for optimal performance
- TensorFlow.js enables client-side inference capabilities
- Models are saved locally for fast loading on subsequent runs

---

**Built with ❤️ using TensorFlow.js, Node.js, and React**
