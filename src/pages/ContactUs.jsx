import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faTimes } from '@fortawesome/free-solid-svg-icons';
import instacAxios from '.././components/Axios/Axios';
import user1 from './images/تنزيل.jpg';
import journalist1 from './images/images.jpg';

const ContactUs = () => {
  const [newInquiry, setNewInquiry] = useState('');
  const [replyContent, setReplyContent] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [showSubscription, setShowSubscription] = useState(false);
  const [messages, setMessages] = useState([]);

  // ✅ جلب التعليقات من السيرفر عند تحميل الصفحة
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { data } = await instacAxios.get('/api/comments');
        setMessages(data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, []);

  // ✅ إرسال تعليق جديد
  const handleSubmitInquiry = async (e) => {
    e.preventDefault();
    if (!newInquiry.trim()) return;

    const userId = localStorage.getItem("Id");
    const userName = localStorage.getItem("Name") || "مستخدم جديد";

    try {
      const { data } = await instacAxios.post('/api/comments', {
        content: newInquiry,
        user: {
          _id: userId,
          name: userName
        }
      });

      setMessages(prev => [...prev, data]);
      setNewInquiry('');
      setShowSubscription(true);
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  // ✅ إرسال رد على تعليق
  const handleSubmitReply = async (e) => {
    e.preventDefault();
    if (!replyContent.trim() || !replyingTo) return;

    const userId = localStorage.getItem("Id");
    const userName = localStorage.getItem("Name") || "صحفي";

    try {
      const { data } = await instacAxios.post(`/api/comments/${replyingTo}/reply`, {
        content: replyContent,
        user: {
          _id: userId,
          name: userName
        }
      });

      const updatedMessages = messages.map(msg => msg._id === data._id ? data : msg);
      setMessages(updatedMessages);
      setReplyContent('');
      setReplyingTo(null);
    } catch (error) {
      console.error('Error replying to comment:', error);
    }
  };

  const handleCloseSubscription = () => {
    setShowSubscription(false);
  };

  const handleSubscribe = () => {
    setShowSubscription(false);
  };

  return (
    <div className="chat-container container p-3 bg-light rounded" style={{ direction: 'rtl', maxWidth: '800px', margin: '40px auto' }}>
      <div className="p-3 rounded mb-3">
        <form onSubmit={handleSubmitInquiry} className="d-flex">
          <input 
            type="text" 
            className="form-control" 
            value={newInquiry} 
            onChange={(e) => setNewInquiry(e.target.value)} 
            onFocus={() => setShowSubscription(true)} 
            placeholder="اكتب استفسارك هنا..." 
            required 
          />
          <button className="btn btn-success ms-2 margin">إرسال</button>
        </form>
      </div>

      <div className="chat-messages">
        {messages.map((message) => (
          <div key={message._id} className="mb-3">
            <div className="d-flex align-items-start mb-2">
              <img src={user1} alt={message.user.name} className="rounded-circle me-2" style={{ width: '40px', height: '40px' }} />
              <div className="p-2 rounded bg-white shadow-sm" style={{ maxWidth: '80%' }}>
                <strong>{message.user.name}</strong>
                <p className="mb-0">{message.content}</p>
              </div>
            </div>

            {message.replies.map((reply, index) => (
              <div key={index} className="d-flex align-items-start mb-2 ms-4">
                <img src={journalist1} alt={reply.user.name} className="rounded-circle me-2" style={{ width: '40px', height: '40px' }} />
                <div className="p-2 rounded bg-white shadow-sm" style={{ maxWidth: '80%' }}>
                  <strong>{reply.user.name}</strong>
                  <p className="mb-0">{reply.content}</p>
                </div>
              </div>
            ))}

            <button className="btn btn-success p-2" style={{ fontSize: '12px' }} onClick={() => setReplyingTo(message._id)}>الرد</button>
          </div>
        ))}
      </div>

      {replyingTo && (
        <div className="p-3 rounded mt-3">
          <form onSubmit={handleSubmitReply} className="d-flex">
            <input 
              type="text" 
              className="form-control" 
              value={replyContent} 
              onChange={(e) => setReplyContent(e.target.value)} 
              placeholder="اكتب ردك هنا..." 
              required 
            />
            <button className="btn btn-success ms-2">إرسال</button>
            <button className="btn btn-danger ms-2" onClick={() => setReplyingTo(null)}>إلغاء</button>
          </form>
        </div>
      )}

      {showSubscription && (
        <div className="fixed-bottom mb-4 mx-auto" style={{ maxWidth: '500px', left: 0, right: 0 }}>
          <div className="bg-white p-4 rounded shadow-lg position-relative" style={{ border: '1px solid #ddd' }}>
            <button 
              onClick={handleCloseSubscription}
              className="position-absolute top-0 end-0 btn btn-sm"
              style={{ color: '#666' }}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
            
            <div className="d-flex align-items-center mb-3">
              <FontAwesomeIcon icon={faBell} className="me-1 text-primary" size="2x" />
              <h5 className="mb-0 me-2">يجب تسجيل الدخول أولاً!</h5>
            </div>
            
            <div className="d-flex justify-content-between align-items-center"> 
              <button onClick={handleSubscribe} className="btn px-4">إلغاء</button>
              <a href="/user-login">
                <button onClick={handleSubscribe} className="btn btn-primary px-4">تسجيل الدخول</button>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactUs;