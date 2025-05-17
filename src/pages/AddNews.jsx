import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddNews = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: 'الصحة',
    author: '',
    content: '',
    image: null
  });

  const [errors, setErrors] = useState({});
  const [showForm, setShowForm] = useState(false);
      const user=window.localStorage.getItem('user.email');
  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'العنوان مطلوب';
    if (!formData.author.trim()) newErrors.author = 'اسم الكاتب مطلوب';
    if (!formData.content.trim()) newErrors.content = 'المحتوى مطلوب';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('تم إرسال البيانات:', formData);
      navigate('/news-list');
    } else {
      console.log('يوجد أخطاء في النموذج');
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="container mt-5">
      <div className="text-end mb-4">
        <h3>مرحباً علي!</h3>

    <p>`${user}`</p>
      </div>

      <div className="text-center mb-4" >
        <button className="btn btn-success px-4 py-2" onClick={toggleForm}>
          {showForm ? 'إخفاء النموذج' : 'إضافة خبر جديد'}
        </button>
      </div>

      {showForm && (
        <div className="card shadow-sm p-4 mb-5">
          <h4 className="mb-4 text-center">نموذج إضافة خبر</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">عنوان الخبر *</label>
              <input
                type="text"
                name="title"
                className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                value={formData.title}
                onChange={handleChange}
              />
              {errors.title && <div className="invalid-feedback">{errors.title}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">التصنيف *</label>
              <select
                name="category"
                className="form-select"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="الصحة">الصحة</option>
                <option value="الرياضة">الرياضة</option>
                <option value="الطقس">الطقس</option>
                <option value="الكوارث">الكوارث</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">اسم الكاتب *</label>
              <input
                type="text"
                name="author"
                className={`form-control ${errors.author ? 'is-invalid' : ''}`}
                value={formData.author}
                onChange={handleChange}
              />
              {errors.author && <div className="invalid-feedback">{errors.author}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">صورة أو فيديو</label>
              <input
                type="file"
                className="form-control"
                onChange={handleFileChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">محتوى الخبر *</label>
              <textarea
                name="content"
                className={`form-control ${errors.content ? 'is-invalid' : ''}`}
                value={formData.content}
                onChange={handleChange}
                rows="5"
              />
              {errors.content && <div className="invalid-feedback">{errors.content}</div>}
            </div>

            <div className="d-flex justify-content-between mt-4">
              <button type="button" className="btn btn-danger px-4" onClick={handleCancel}>
                إلغاء
              </button>
              <button type="submit" className="btn btn-success px-4">
                نشر الخبر
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddNews;
