import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import instanceAxios from '../components/Axios/Axios';

const NewsList = () => {
  const navigate = useNavigate();
  const [news, setNews] = useState([]);
  const [newsToDelete, setNewsToDelete] = useState(null);
  const [editingNews, setEditingNews] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editFormData, setEditFormData] = useState({
    title: '',
    content: '',
    category: '',
    writer: ''
  });

  const userId = localStorage.getItem('id');
  
  useEffect(() => {
    if (!userId) {
      navigate('/Journalist-login');
      return;
    }
    getNews(userId);
  }, [navigate, userId]);

  const getNews = async (userId) => {
    setIsLoading(true);
    setError('');
    try {
      const response = await instanceAxios.get(`/api/news/by-user/${userId}`);
      console.log('جلب الأخبار:', response.data);
      if (response.data.success && Array.isArray(response.data.posts)) {
        setNews(response.data.posts);
      } else {
        setError(response.data.message || 'فشل في جلب الأخبار.');
      }
    } catch (error) {
      console.error('فشل في جلب الأخبار:', error.response?.data || error.message || error);
      setError(error.response?.data?.message || 'حدث خطأ أثناء جلب الأخبار.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (newsItem) => {
    setEditingNews(newsItem._id);
    setEditFormData({
      title: newsItem.title,
      content: newsItem.content,
      category: newsItem.category,
      writer: newsItem.writer
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  //   try {
  //     setIsLoading(true);
  //     const response = await instanceAxios.put(`/api/news/${id}`, editFormData);
      
  //     if (response.data.success) {
  //       // Update the news list with edited news
  //       setNews(news.map(item => 
  //         item._id === id ? { ...item, ...editFormData } : item
  //       ));
  //       setEditingNews(null);
  //     } else {
  //       setError(response.data.message || 'فشل في تحديث الخبر.');
  //     }
  //   } catch (error) {
  //     console.error('فشل في تحديث الخبر:', error);
  //     setError(error.response?.data?.message || 'حدث خطأ أثناء تحديث الخبر.');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
const saveEdit = async (id) => {
  try {
    setIsLoading(true);
    const response = await instanceAxios.put(`/api/news/${id}`, editFormData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (response.data.success) {
      // Update the news list with edited news
      setNews(news.map(item => 
        item._id === id ? { ...item, ...editFormData } : item
      ));
      setEditingNews(null);
      setError('');
    } else {
      setError(response.data.message || 'فشل في تحديث الخبر.');
    }
  } catch (error) {
    console.error('فشل في تحديث الخبر:', error);
    setError(error.response?.data?.message || 
            error.message || 
            'حدث خطأ أثناء تحديث الخبر.');
    // Debugging: Log the full error and request details
    console.log('Full error:', error);
    console.log('Request config:', error.config);
  } finally {
    setIsLoading(false);
  }
};
  const cancelEdit = () => {
    setEditingNews(null);
  };

  const handleDelete = (id) => {
    setNewsToDelete(id);
  };

const handleDeleteNow = async (id) => {
  try {
    const res = await instanceAxios.delete(`/api/news/${id}`);
    console.log('تم الحذف:', res.data);
    setNews(prev => prev.filter(item => item._id !== id));
  } catch (err) {
    console.error('خطأ في الحذف:', err);
  }
};


  const cancelDelete = () => {
    setNewsToDelete(null);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredNews = news.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5" dir="rtl">
      <div className="d-flex justify-content-between mb-5">
        <div className="search-box" style={{ width: '300px' }}>
          <input
            type="text"
            placeholder="ادخل كلمة البحث"
            className="form-control"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <button
          className="btn btn-success"
          onClick={() => navigate('/add-news')}
        >
          إضافة خبر جديد
        </button>
      </div>

      {isLoading ? (
        <div className="text-center">
          <span className="spinner-border spinner-border-sm me-2" role="status" />
          جاري التحميل...
        </div>
      ) : error ? (
        <div className="alert alert-danger text-center">{error}</div>
      ) : filteredNews.length === 0 ? (
        <p className="text-center">لا توجد أخبار متاحة.</p>
      ) : (
        filteredNews.map(item => (
          <div key={item._id} className="card mb-3">
            <div className="card-body">
              {editingNews === item._id ? (
                <div className="edit-form">
                  <div className="mb-3">
                    <label className="form-label">العنوان</label>
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      value={editFormData.title}
                      onChange={handleEditChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">المحتوى</label>
                    <textarea
                      className="form-control"
                      name="content"
                      value={editFormData.content}
                      onChange={handleEditChange}
                      rows="3"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">التصنيف</label>
                    <input
                      type="text"
                      className="form-control"
                      name="category"
                      value={editFormData.category}
                      onChange={handleEditChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">الكاتب</label>
                    <input
                      type="text"
                      className="form-control"
                      name="writer"
                      value={editFormData.writer}
                      onChange={handleEditChange}
                    />
                  </div>
                  <div className="d-flex justify-content-end">
                    <button 
                      className="btn btn-outline-secondary me-2"
                      onClick={cancelEdit}
                    >
                      إلغاء
                    </button>
                    <button 
                      className="btn btn-primary"
                      onClick={() => saveEdit(item._id)}
                    >
                      حفظ التعديلات
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="badge bg-success">{item.category}</span>
                    <div>
                      <button
                        className="btn btn-sm btn-outline-danger me-2"
                        onClick={() =>handleDeleteNow(item._id)}
                      >
                        حذف
                      </button>
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => handleEdit(item)}
                      >
                        تعديل
                      </button>
                    </div>
                  </div>
                  <h5 className="card-title mt-2">{item.title}</h5>
                  <p className="card-text"><strong>الكاتب:</strong> {item.writer}</p>
                  <p className="card-text">{item.content.substring(0, 100)}...</p>
                </>
              )}
            </div>
          </div>
        ))
      )}

      {newsToDelete && (
        <div className="modal-backdrop show" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
          <div className="modal d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content shadow">
                <div className="modal-header bg-danger text-white">
                  <h5 className="modal-title">تأكيد الحذف</h5>
                </div>
                <div className="modal-body text-center">
                  <p className="mb-0">هل أنت متأكد من رغبتك في حذف هذا الخبر؟</p>
                </div>
                <div className="modal-footer justify-content-center">
                  <button className="btn btn-outline-secondary" onClick={cancelDelete}>
                    إلغاء
                  </button>
                  <button className="btn btn-danger" onClick={confirmDelete}>
                    تأكيد الحذف
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsList;