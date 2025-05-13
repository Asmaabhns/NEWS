import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { motion } from 'framer-motion';
import HeaderTwo from "../components/HeaderTwo";

const UserSignUp = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    pressCard: '',
    specialization: 'general'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    const arabicNameRegex = /^[\u0600-\u06FF\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,15}$/;
    const pressCardRegex = /^[a-zA-Z0-9]{6,20}$/;

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'الاسم الكامل مطلوب';
    } else if (!arabicNameRegex.test(formData.fullName)) {
      newErrors.fullName = 'يجب أن يحتوي الاسم على أحرف عربية فقط';
    }

    if (!formData.email) {
      newErrors.email = 'البريد الإلكتروني مطلوب';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'بريد إلكتروني غير صالح';
    }

    if (!formData.phone) {
      newErrors.phone = 'رقم الهاتف مطلوب';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'رقم هاتف غير صالح (يجب أن يكون بين 10-15 رقمًا)';
    }

    if (!formData.password) {
      newErrors.password = 'كلمة المرور مطلوبة';
    } else if (formData.password.length < 8) {
      newErrors.password = 'كلمة المرور يجب أن تكون 8 أحرف على الأقل';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'تأكيد كلمة المرور مطلوب';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'كلمات المرور غير متطابقة';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      // محاكاة طلب API
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('تم إرسال البيانات:', formData);
      
      // توجيه المستخدم بعد التسجيل الناجح
      navigate('/add-news', {
        state: { newlyRegistered: true },
        replace: true
      });
    } catch (error) {
      console.error('حدث خطأ أثناء التسجيل:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLoginClick = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      navigate('/user-login');
    }, 500);
  };

  const specializations = [
    { value: 'general', label: 'صحافة عامة' },
    { value: 'politics', label: 'السياسة' },
    { value: 'sports', label: 'الرياضة' },
    { value: 'economy', label: 'الاقتصاد' },
    { value: 'culture', label: 'الثقافة والفنون' },
    { value: 'technology', label: 'التكنولوجيا' }
  ];

  return (
    <div className='mt-4'>
      <HeaderTwo links={[ 
        { label: 'الصفحة الرئيسية', href: '/' }, 
        { label: 'تسجيل دخول', href: '#' } 
      ]} />
      
      <div className='container-fluid min-vh-100 d-flex align-items-center justify-content-center p-3'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='row g-0 w-100 shadow-lg rounded-4 overflow-hidden'
          style={{ 
            maxWidth: '1200px', 
            backgroundColor: 'white',
            minHeight: '600px'
          }}
        >
          {/* العمود الأيسر - النموذج */}
          <div className='col-lg-6 p-4 p-md-5'>
            <div className="h-100 d-flex flex-column justify-content-center">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center mb-4"
              >
                <motion.h2 
                  className="fw-bold text-dark mb-2"
                  whileHover={{ scale: 1.02 }}
                >
                  تسجيل حساب جديد
                </motion.h2>
                <p className="text-muted">الرجاء إدخال بياناتك الشخصية</p>
              </motion.div>

              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                onSubmit={handleSubmit}
                className="mt-3"
              >
                {/* حقل الاسم الكامل */}
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mb-3"
                >
                  <label className="form-label fw-semibold">الاسم الكامل:</label>
                  <motion.input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="الاسم الكامل"
                    className={`form-control form-control-lg ${errors.fullName ? 'is-invalid' : ''}`}
                    whileFocus={{ scale: 1.01 }}
                  />
                  {errors.fullName && (
                    <motion.div 
                      className="invalid-feedback"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {errors.fullName}
                    </motion.div>
                  )}
                </motion.div>

                {/* حقل البريد الإلكتروني */}
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mb-3"
                >
                  <label className="form-label fw-semibold">البريد الإلكتروني:</label>
                  <motion.input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@email.com"
                    className={`form-control form-control-lg ${errors.email ? 'is-invalid' : ''}`}
                    whileFocus={{ scale: 1.01 }}
                  />
                  {errors.email && (
                    <motion.div 
                      className="invalid-feedback"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {errors.email}
                    </motion.div>
                  )}
                </motion.div>

                {/* حقل رقم الهاتف */}
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="mb-3"
                >
                  <label className="form-label fw-semibold">رقم الهاتف:</label>
                  <motion.input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="0591234567"
                    className={`form-control form-control-lg ${errors.phone ? 'is-invalid' : ''}`}
                    whileFocus={{ scale: 1.01 }}
                  />
                  {errors.phone && (
                    <motion.div 
                      className="invalid-feedback"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {errors.phone}
                    </motion.div>
                  )}
                </motion.div>

                {/* حقل كلمة المرور */}
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="mb-3"
                >
                  <label className="form-label fw-semibold">كلمة المرور:</label>
                  <motion.input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="********"
                    className={`form-control form-control-lg ${errors.password ? 'is-invalid' : ''}`}
                    whileFocus={{ scale: 1.01 }}
                  />
                  {errors.password && (
                    <motion.div 
                      className="invalid-feedback"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {errors.password}
                    </motion.div>
                  )}
                </motion.div>

                {/* حقل تأكيد كلمة المرور */}
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="mb-4"
                >
                  <label className="form-label fw-semibold">تأكيد كلمة المرور:</label>
                  <motion.input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="********"
                    className={`form-control form-control-lg ${errors.confirmPassword ? 'is-invalid' : ''}`}
                    whileFocus={{ scale: 1.01 }}
                  />
                  {errors.confirmPassword && (
                    <motion.div 
                      className="invalid-feedback"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {errors.confirmPassword}
                    </motion.div>
                  )}
                </motion.div>

                {/* زر التسجيل */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-lg w-100 py-3"
                    style={{ 
                      backgroundColor: '#4c8565', 
                      color: 'white',
                      border: 'none'
                    }}
                    whileHover={{ scale: 1.02, boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" />
                        جاري التسجيل...
                      </>
                    ) : 'تسجيل الحساب'}
                  </motion.button>
                </motion.div>
              </motion.form>

              {/* رابط تسجيل الدخول للجوال */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="text-center mt-4 d-block d-lg-none"
              >
                <p className="mb-2">هل لديك حساب بالفعل؟</p>
                <motion.button
                  onClick={handleLoginClick}
                  className="btn btn-outline-success px-4 py-2 rounded-pill fw-semibold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isTransitioning ? "جارٍ التوجيه..." : "سجل الدخول"}
                </motion.button>
              </motion.div>
            </div>
          </div>

          {/* العمود الأيمن - الصورة الجانبية */}
          <div className='col-lg-6 d-none d-lg-flex align-items-center justify-content-center p-5 position-relative'
            style={{
              background: 'linear-gradient(135deg, #0d9488 0%, #065f53 100%)',
              overflow: 'hidden'
            }}
          >
            {/* دوائر زخرفية متحركة */}
            <motion.div
              className="position-absolute"
              style={{
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)',
                top: '-50px',
                left: '-50px'
              }}
              animate={{
                x: [0, 50, 0],
                y: [0, 30, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: 'reverse'
              }}
            />
            
            <motion.div
              className="position-absolute"
              style={{
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.15)',
                bottom: '-30px',
                right: '-30px'
              }}
              animate={{
                x: [0, -40, 0],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: 'reverse',
                delay: 1
              }}
            />

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="text-center text-white z-1"
            >
              <motion.h2 
                className="display-4 fw-bold mb-4"
                whileHover={{ scale: 1.02 }}
              >
                مرحباً بك في مجتمعنا
              </motion.h2>
              <motion.p 
                className="fs-3 mb-5"
                whileHover={{ scale: 1.01 }}
              >
                لديك حساب بالفعل؟
              </motion.p>
              
              <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLoginClick}
              className="btn btn-outline-light btn-lg px-5 rounded-3 position-relative rounded-pill"
              style={{ borderWidth: '2px', overflow: 'hidden', height: '50px', width: '200px' }}
            >
              <motion.span
                initial={{ opacity: 1 }}
                animate={{ opacity: isTransitioning ? 0 : 1 }}
                className="position-absolute start-0 end-0"
                style={{ top: '7px' }}
              >
                سجل الدخول
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: isTransitioning ? 1 : 0 }}
                className="position-absolute start-0 end-0"
                style={{ top: '7px' }}
              >
                جارٍ التوجيه...
              </motion.span>
            </motion.button>
            
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserSignUp;