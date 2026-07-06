import { useState } from 'react';
import { useFetch } from '../hooks/useCustomHooks';
import { mcqService, codingQuestionService } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import SuccessMessage from '../components/SuccessMessage';
import './AdminPage.css';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('mcqs');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const { data: mcqs = [], loading: mcqsLoading, refetch: refetchMCQs } = useFetch(() => 
    mcqService.getAllMCQs()
  );
  const { data: codingQuestions = [], loading: codingLoading, refetch: refetchCoding } = useFetch(() => 
    codingQuestionService.getAllCodingQuestions()
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddMCQ = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await mcqService.updateMCQ(editingId, formData);
        setMessageType('success');
        setMessage('MCQ updated successfully!');
      } else {
        await mcqService.createMCQ(formData);
        setMessageType('success');
        setMessage('MCQ added successfully!');
      }
      setFormData({});
      setEditingId(null);
      setShowForm(false);
      refetchMCQs();
    } catch (error) {
      setMessageType('error');
      setMessage('Failed to save MCQ');
    }
  };

  const handleAddCodingQuestion = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await codingQuestionService.updateCodingQuestion(editingId, formData);
        setMessageType('success');
        setMessage('Coding question updated successfully!');
      } else {
        await codingQuestionService.createCodingQuestion(formData);
        setMessageType('success');
        setMessage('Coding question added successfully!');
      }
      setFormData({});
      setEditingId(null);
      setShowForm(false);
      refetchCoding();
    } catch (error) {
      setMessageType('error');
      setMessage('Failed to save coding question');
    }
  };

  const handleDeleteMCQ = async (id) => {
    if (window.confirm('Are you sure you want to delete this MCQ?')) {
      try {
        await mcqService.deleteMCQ(id);
        setMessageType('success');
        setMessage('MCQ deleted successfully!');
        refetchMCQs();
      } catch (error) {
        setMessageType('error');
        setMessage('Failed to delete MCQ');
      }
    }
  };

  const handleDeleteCodingQuestion = async (id) => {
    if (window.confirm('Are you sure you want to delete this coding question?')) {
      try {
        await codingQuestionService.deleteCodingQuestion(id);
        setMessageType('success');
        setMessage('Coding question deleted successfully!');
        refetchCoding();
      } catch (error) {
        setMessageType('error');
        setMessage('Failed to delete coding question');
      }
    }
  };

  const handleEditMCQ = (mcq) => {
    setFormData(mcq);
    setEditingId(mcq.id);
    setShowForm(true);
  };

  const handleEditCodingQuestion = (question) => {
    setFormData(question);
    setEditingId(question.id);
    setShowForm(true);
  };

  if (mcqsLoading || codingLoading) return <LoadingSpinner />;

  return (
    <div className="admin-page">
      <div className="container">
        <div className="page-header">
          <h1>Admin Panel</h1>
          <p>Manage MCQs and Coding Questions</p>
        </div>

        {message && (
          messageType === 'success' ? (
            <SuccessMessage message={message} />
          ) : (
            <ErrorMessage message={message} />
          )
        )}

        <div className="admin-tabs">
          <button
            className={`tab-button ${activeTab === 'mcqs' ? 'active' : ''}`}
            onClick={() => setActiveTab('mcqs')}
          >
            MCQs
          </button>
          <button
            className={`tab-button ${activeTab === 'coding' ? 'active' : ''}`}
            onClick={() => setActiveTab('coding')}
          >
            Coding Questions
          </button>
        </div>

        {activeTab === 'mcqs' && (
          <div className="admin-section">
            <div className="section-header">
              <h2>Manage MCQs</h2>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setFormData({});
                  setEditingId(null);
                  setShowForm(!showForm);
                }}
              >
                {showForm ? 'Cancel' : '+ Add New MCQ'}
              </button>
            </div>

            {showForm && (
              <form className="admin-form" onSubmit={handleAddMCQ}>
                <div className="form-group">
                  <label>Question</label>
                  <textarea
                    name="question"
                    value={formData.question || ''}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Option A</label>
                    <input
                      type="text"
                      name="optionA"
                      value={formData.optionA || ''}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Option B</label>
                    <input
                      type="text"
                      name="optionB"
                      value={formData.optionB || ''}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Option C</label>
                    <input
                      type="text"
                      name="optionC"
                      value={formData.optionC || ''}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Option D</label>
                    <input
                      type="text"
                      name="optionD"
                      value={formData.optionD || ''}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Correct Answer</label>
                    <select
                      name="correctAnswer"
                      value={formData.correctAnswer || ''}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <select
                      name="category"
                      value={formData.category || ''}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select</option>
                      <option value="Operating System">Operating System</option>
                      <option value="Computer Networks">Computer Networks</option>
                      <option value="Java">Java</option>
                      <option value="DBMS">DBMS</option>
                      <option value="OOP">OOP</option>
                      <option value="SQL">SQL</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Difficulty</label>
                    <select
                      name="difficulty"
                      value={formData.difficulty || ''}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select</option>
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Explanation</label>
                  <textarea
                    name="explanation"
                    value={formData.explanation || ''}
                    onChange={handleInputChange}
                  ></textarea>
                </div>

                <button className="btn btn-success" type="submit">
                  {editingId ? 'Update MCQ' : 'Add MCQ'}
                </button>
              </form>
            )}

            <div className="items-list">
              {mcqs.map((mcq) => (
                <div key={mcq.id} className="item-card">
                  <div className="item-content">
                    <h4>{mcq.question}</h4>
                    <p className="item-meta">
                      <span className="badge badge-primary">{mcq.category}</span>
                      <span className="badge badge-warning">{mcq.difficulty}</span>
                    </p>
                  </div>
                  <div className="item-actions">
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => handleEditMCQ(mcq)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDeleteMCQ(mcq.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'coding' && (
          <div className="admin-section">
            <div className="section-header">
              <h2>Manage Coding Questions</h2>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setFormData({});
                  setEditingId(null);
                  setShowForm(!showForm);
                }}
              >
                {showForm ? 'Cancel' : '+ Add New Question'}
              </button>
            </div>

            {showForm && (
              <form className="admin-form" onSubmit={handleAddCodingQuestion}>
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title || ''}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Topic</label>
                    <input
                      type="text"
                      name="topic"
                      value={formData.topic || ''}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Difficulty</label>
                    <select
                      name="difficulty"
                      value={formData.difficulty || ''}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select</option>
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={formData.description || ''}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Platform</label>
                    <input
                      type="text"
                      name="platform"
                      value={formData.platform || ''}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Platform URL</label>
                    <input
                      type="text"
                      name="platformUrl"
                      value={formData.platformUrl || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Problem Number</label>
                  <input
                    type="text"
                    name="problemNumber"
                    value={formData.problemNumber || ''}
                    onChange={handleInputChange}
                  />
                </div>

                <button className="btn btn-success" type="submit">
                  {editingId ? 'Update Question' : 'Add Question'}
                </button>
              </form>
            )}

            <div className="items-list">
              {codingQuestions.map((question) => (
                <div key={question.id} className="item-card">
                  <div className="item-content">
                    <h4>{question.title}</h4>
                    <p className="item-meta">
                      <span className="badge badge-primary">{question.topic}</span>
                      <span className="badge badge-warning">{question.difficulty}</span>
                      <span className="badge badge-secondary">{question.platform}</span>
                    </p>
                  </div>
                  <div className="item-actions">
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => handleEditCodingQuestion(question)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDeleteCodingQuestion(question.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
