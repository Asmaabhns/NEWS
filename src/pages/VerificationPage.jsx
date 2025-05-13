import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from 'framer-motion';

const VerificationPage = () => {
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Verification code submitted:', code);
    // التحقق من صحة الرمز هنا قبل الانتقال
    navigate('/newpassword');
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="card  border-1 p-4"
        style={{ 
          maxWidth: '600px',
          width: '100%',
          borderRadius: '20px',
          border: '1px solid rgba(76, 133, 101, 0.1)' // إطار أخضر داكن
        }}      >
        <div className="text-center mb-4">
          <h2 className="fw-bold" style={{ color: '#4c8565' }}>لمحة News</h2>
          <p className="text-muted mt-2">أدخل رمز التحقق الذي أرسلناه إلى بريدك الإلكتروني</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              maxLength={6}
              className="form-control form-control-lg text-center fw-bold fs-4"
              placeholder="● ● ● ● ● ●"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              style={{
                letterSpacing: '8px',
                borderRadius: '10px',
                border: '2px solid #4c8565',
              }}
            />
          </div>

          <div className="d-grid">
            <motion.button
              type="submit"
              className="btn btn-lg"
              style={{ backgroundColor: '#4c8565', color: 'white' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              متابعة
            </motion.button>
          </div>
        </form>

        <div className="text-center mt-3">
          <small className="text-muted">لم يصلك الرمز؟ <a href="#" className="text-success">أعد الإرسال</a></small>
        </div>
      </motion.div>
    </div>
  );
};

export default VerificationPage;