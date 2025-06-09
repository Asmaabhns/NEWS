import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import instanceAxios from '../components/Axios/Axios';

const NewsList = () => {
  const navigate = useNavigate();
  const [news, setNews] = useState([]);
  const [newsToDelete, setNewsToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // جلب userId مرة واحدة
  const userId = localStorage.getItem('id');

  useEffect(() => {
    if (!userId || !/^[0-9a-fA-F]{24}$/.test(userId)) {
      navigate('/Journalist-login');
      return;
    }
    getNews(userId);
  }, [navigate, userId]); // إضافة userId لضمان التحديث إذا تغير

  const getNews = async (userId) => {
    setIsLoading(true);
    setError('');
    try {
      // تأكد من استخدام المسار الصحيح هنا
      const response = await instanceAxios.get(`/api/news/by-user/${userId}`);

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

  // باقي الكود كما لديك

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = (id) => {
    setNewsToDelete(id);
  };

  const confirmDelete = async () => {
    try {
      // حذف من الـ backend
      await instanceAxios.delete(`/api/news/${newsToDelete}`);

      // حذف من الواجهة فوراً
      setNews(news.filter(item => item._id !== newsToDelete));
      setNewsToDelete(null);
    } catch (err) {
      alert('فشل في حذف الخبر. حاول مرة أخرى.');
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
              <div className="d-flex justify-content-between align-items-center">
                <span className="badge bg-success">{item.category}</span>
                <div>
                  <button
                    className="btn btn-sm btn-outline-danger me-2"
                    onClick={() => handleDelete(item._id)}
                  >
                    حذف
                  </button>
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => handleEdit(item._id)}
                  >
                    تعديل
                  </button>
                </div>
              </div>
              <h5 className="card-title mt-2">{item.title}</h5>
              <p className="card-text"><strong>الكاتب:</strong> {item.writer}</p>
              <p className="card-text">{item.content.substring(0, 100)}...</p>
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
