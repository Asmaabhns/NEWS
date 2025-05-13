import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from 'framer-motion';

const Email = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // التحقق من صحة البريد الإلكتروني
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('البريد الإلكتروني غير صالح');
      return;
    }

    console.log('Email submitted:', email);
    navigate('/verification');
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center ">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="card  p-5"
        style={{ 
          maxWidth: '600px',
          width: '100%',
          borderRadius: '20px',
          border: '1px solid rgba(76, 133, 101, 0.1)' // إطار أخضر داكن
        }}
      >
        <div className="text-center mb-5">
          <motion.h2 
            className="fw-bold mb-3" 
            style={{ color: '#4c8565' }}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            لمحة News
          </motion.h2>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="alert alert-danger text-center mb-4"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="form-label fw-semibold fs-5 mb-3" style={{ color: '#495057' }}>
              البريد الإلكتروني
            </label>
            <input
              type="email"
              className="form-control form-control-lg py-3"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                borderRadius: '10px',
                border: '1px solid #ced4da',
                fontSize: '1.1rem'
              }}
            />
            <small className="text-muted">سنرسل رمز التحقق إلى هذا البريد</small>
          </div>

          <div className="d-grid mt-4">
            <motion.button
              type="submit"
              className="btn btn-lg py-3 fw-semibold"
              style={{ 
                backgroundColor: '#4c8565', 
                color: 'white',
                borderRadius: '10px',
                fontSize: '1.1rem'
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              متابعة
              <i className="bi bi-arrow-left ms-2"></i>
            </motion.button>
          </div>
        </form>

        
      </motion.div>
    </div>
  );
};

export default Email;