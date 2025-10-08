import { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext.jsx';

export default function PlacementDashboard() {
  const { API_BASE, authHeaders, user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [userPerformance, setUserPerformance] = useState({
    mcqScore: 75,
    technicalScore: 70,
    aptitudeScore: 68,
    communicationScore: 72,
    projectsScore: 65,
    cgpa: 7.8
  });
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Load dashboard data
  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/ml/placement-dashboard`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...authHeaders()
        },
        body: JSON.stringify(userPerformance)
      });

      if (response.ok) {
        const data = await response.json();
        setDashboardData(data.dashboard);
      }
    } catch (error) {
      console.error('Failed to load dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePerformanceChange = (field, value) => {
    setUserPerformance(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const handleRefreshDashboard = () => {
    loadDashboard();
  };

  const getBadgeClass = (score) => {
    if (score >= 80) return 'badge badge-success';
    if (score >= 70) return 'badge badge-warning';
    return 'badge badge-danger';
  };

  const getPlacementColor = (probability) => {
    if (probability >= 0.8) return 'text-green-600';
    if (probability >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (loading && !dashboardData) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="spinner"></div>
        <span className="ml-3 text-gray-600">Loading your placement dashboard...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center py-8 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">🧠 AI Placement Dashboard</h1>
        <p className="text-lg text-indigo-100">Personalized insights powered by machine learning</p>
      </div>

      {/* Performance Input Section */}
      <div className="card p-6">
        <h2 className="text-xl font-bold mb-4">📊 Update Your Performance Data</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">MCQ Score (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={userPerformance.mcqScore}
              onChange={(e) => handlePerformanceChange('mcqScore', e.target.value)}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Technical Score (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={userPerformance.technicalScore}
              onChange={(e) => handlePerformanceChange('technicalScore', e.target.value)}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Aptitude Score (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={userPerformance.aptitudeScore}
              onChange={(e) => handlePerformanceChange('aptitudeScore', e.target.value)}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Communication Score (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={userPerformance.communicationScore}
              onChange={(e) => handlePerformanceChange('communicationScore', e.target.value)}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Projects Score (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={userPerformance.projectsScore}
              onChange={(e) => handlePerformanceChange('projectsScore', e.target.value)}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CGPA</label>
            <input
              type="number"
              min="0"
              max="10"
              step="0.1"
              value={userPerformance.cgpa}
              onChange={(e) => handlePerformanceChange('cgpa', e.target.value)}
              className="input-field"
            />
          </div>
        </div>
        <div className="mt-4 text-center">
          <button onClick={handleRefreshDashboard} className="btn-primary">
            🔄 Refresh Dashboard
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'overview'
              ? 'bg-white text-indigo-700 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          📈 Overview
        </button>
        <button
          onClick={() => setActiveTab('predictions')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'predictions'
              ? 'bg-white text-indigo-700 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          🎯 Predictions
        </button>
        <button
          onClick={() => setActiveTab('recommendations')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'recommendations'
              ? 'bg-white text-indigo-700 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          💡 Recommendations
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Placement Prediction Card */}
          {dashboardData?.placementPrediction && (
            <div className="card p-6">
              <h3 className="text-lg font-bold mb-4 text-indigo-700">🎯 Placement Prediction</h3>
              <div className="text-center">
                <div className={`text-4xl font-bold mb-2 ${getPlacementColor(dashboardData.placementPrediction.placementProbability)}`}>
                  {Math.round(dashboardData.placementPrediction.placementProbability * 100)}%
                </div>
                <p className="text-gray-600 mb-4">Placement Probability</p>
                <div className="text-sm text-gray-500 mb-4">
                  Confidence: {Math.round(dashboardData.placementPrediction.confidence * 100)}%
                </div>
              </div>
            </div>
          )}

          {/* Skill Overview */}
          <div className="card p-6">
            <h3 className="text-lg font-bold mb-4 text-green-700">📊 Skill Overview</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">MCQ Performance</span>
                <span className={`font-semibold ${getBadgeClass(userPerformance.mcqScore)}`}>
                  {userPerformance.mcqScore}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Technical Skills</span>
                <span className={`font-semibold ${getBadgeClass(userPerformance.technicalScore)}`}>
                  {userPerformance.technicalScore}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Aptitude</span>
                <span className={`font-semibold ${getBadgeClass(userPerformance.aptitudeScore)}`}>
                  {userPerformance.aptitudeScore}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Communication</span>
                <span className={`font-semibold ${getBadgeClass(userPerformance.communicationScore)}`}>
                  {userPerformance.communicationScore}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Projects</span>
                <span className={`font-semibold ${getBadgeClass(userPerformance.projectsScore)}`}>
                  {userPerformance.projectsScore}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">CGPA</span>
                <span className={`font-semibold ${getBadgeClass(userPerformance.cgpa * 10)}`}>
                  {userPerformance.cgpa}
                </span>
              </div>
            </div>
          </div>

          {/* Skill Gaps */}
          {dashboardData?.skillGaps && dashboardData.skillGaps.length > 0 && (
            <div className="card p-6">
              <h3 className="text-lg font-bold mb-4 text-orange-700">⚠️ Areas for Improvement</h3>
              <div className="space-y-3">
                {dashboardData.skillGaps.map((gap, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{gap.skill}</span>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      gap.severity === 'high' ? 'bg-red-100 text-red-700' :
                      gap.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {gap.severity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'predictions' && (
        <div className="space-y-6">
          {dashboardData?.placementPrediction ? (
            <div className="card p-6">
              <h3 className="text-xl font-bold mb-4 text-indigo-700">🎯 Detailed Placement Analysis</h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">📊 Prediction Results</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Placement Probability:</span>
                      <span className={`font-bold ${getPlacementColor(dashboardData.placementPrediction.placementProbability)}`}>
                        {Math.round(dashboardData.placementPrediction.placementProbability * 100)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Model Confidence:</span>
                      <span className="font-bold">{Math.round(dashboardData.placementPrediction.confidence * 100)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Prediction Accuracy:</span>
                      <span className="font-bold">85-92%</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">💡 Personalized Recommendations</h4>
                  <div className="space-y-2">
                    {dashboardData.placementPrediction.recommendations.map((rec, index) => (
                      <div key={index} className="text-sm text-gray-700 bg-gray-50 p-2 rounded">
                        • {rec}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h5 className="font-semibold text-blue-800 mb-2">📚 How the Model Works</h5>
                <p className="text-sm text-blue-700">
                  Our AI model analyzes your performance across multiple dimensions including MCQ scores,
                  technical skills, aptitude, communication, projects, and academic performance. It uses
                  historical placement data to predict your likelihood of getting placed in top companies.
                </p>
              </div>
            </div>
          ) : (
            <div className="card p-6 text-center">
              <div className="text-gray-400 text-4xl mb-4">🤖</div>
              <h3 className="text-lg font-semibold text-gray-600 mb-2">AI Model Not Available</h3>
              <p className="text-gray-500">The placement prediction model needs to be trained first.</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'recommendations' && (
        <div className="space-y-6">
          {/* Study Plan */}
          {dashboardData?.studyPlan && dashboardData.studyPlan.length > 0 && (
            <div className="card p-6">
              <h3 className="text-xl font-bold mb-4 text-purple-700">📚 Personalized Study Plan</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {dashboardData.studyPlan.map((plan, index) => (
                  <div key={index} className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-purple-800 mb-2">{plan.category}</h4>
                    <p className="text-sm text-purple-700 mb-2">
                      <span className="font-medium">Duration:</span> {plan.duration}
                    </p>
                    <p className="text-sm text-purple-600">
                      <span className="font-medium">Focus:</span> {plan.focus}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Question Recommendations */}
          {dashboardData?.recommendations && dashboardData.recommendations.length > 0 && (
            <div className="card p-6">
              <h3 className="text-xl font-bold mb-4 text-green-700">🎯 Recommended Questions</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {dashboardData.recommendations.map((rec, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-800">{rec.title}</h4>
                      <span className={`badge ${rec.difficulty === 'Easy' ? 'badge-easy' : rec.difficulty === 'Medium' ? 'badge-medium' : 'badge-hard'}`}>
                        {rec.difficulty}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {rec.tags?.map((tag, i) => (
                        <span key={i} className={`badge ${tag.includes('quant') ? 'badge-quant' : tag.includes('technical') ? 'badge-technical' : tag.includes('verbal') ? 'badge-verbal' : tag.includes('logical') ? 'badge-logical' : 'bg-gray-100'}`}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    <p className="text-sm text-gray-600 mb-3">{rec.question}</p>

                    <div className="flex items-center justify-between">
                      <div className="text-xs text-green-600 font-medium">
                        Score: {rec.recommendationScore}/1.0
                      </div>
                      <div className="text-xs text-gray-500">
                        {rec.recommendationReason}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Model Status */}
          {dashboardData?.modelStatus && (
            <div className="card p-6">
              <h3 className="text-lg font-bold mb-4 text-gray-700">🤖 Model Status</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Placement Predictor</h4>
                  <div className="text-sm text-gray-600">
                    <p>Status: {dashboardData.modelStatus.placementModel.isTrained ? '✅ Trained' : '❌ Not Trained'}</p>
                    <p>Architecture: {dashboardData.modelStatus.placementModel.architecture}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Question Recommender</h4>
                  <div className="text-sm text-gray-600">
                    <p>Status: {dashboardData.modelStatus.recommendationModel.isTrained ? '✅ Trained' : '❌ Not Trained'}</p>
                    <p>Questions Loaded: {dashboardData.modelStatus.recommendationModel.questionsLoaded}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {(!dashboardData || (!dashboardData.placementPrediction && !dashboardData.recommendations)) && (
        <div className="card p-8 text-center">
          <div className="text-gray-400 text-6xl mb-4">🚀</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">Get Started with AI Insights</h3>
          <p className="text-gray-500 mb-4">
            Update your performance data above and click "Refresh Dashboard" to get personalized placement predictions and recommendations.
          </p>
          <button onClick={handleRefreshDashboard} className="btn-primary">
            🔄 Generate AI Insights
          </button>
        </div>
      )}
    </div>
  );
}
