export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

export const getDifficultyColor = (difficulty) => {
  const colors = {
    'Easy': '#22c55e',
    'Medium': '#f59e0b',
    'Hard': '#ef4444',
  };
  return colors[difficulty] || '#6b7280';
};

export const getCategoryColor = (category) => {
  const colors = {
    'Operating System': '#3b82f6',
    'Computer Networks': '#8b5cf6',
    'Java': '#f97316',
    'DBMS': '#06b6d4',
    'OOP': '#ec4899',
    'SQL': '#10b981',
  };
  return colors[category] || '#6b7280';
};

export const getTopicColor = (topic) => {
  const colors = {
    'Arrays': '#3b82f6',
    'Strings': '#8b5cf6',
    'Linked List': '#f97316',
    'Stack': '#06b6d4',
    'Queue': '#ec4899',
    'Binary Tree': '#10b981',
    'BST': '#f59e0b',
    'Heap': '#06b6d4',
    'Graph': '#ef4444',
    'Recursion': '#8b5cf6',
    'Backtracking': '#3b82f6',
    'Sliding Window': '#10b981',
    'Dynamic Programming': '#f97316',
    'Searching': '#ec4899',
    'Sorting': '#06b6d4',
    'Greedy': '#f59e0b',
  };
  return colors[topic] || '#6b7280';
};
