import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faTimes } from '@fortawesome/free-solid-svg-icons';

import user1 from './images/تنزيل.jpg';
import journalist1 from './images/images.jpg';
import instanceAxios from '../components/Axios/Axios';

const ContactUs = () => {
  const [newInquiry, setNewInquiry] = useState('');
  const [replyContent, setReplyContent] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [showSubscription, setShowSubscription] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { data } = await instanceAxios.get('/api/comments');
        setMessages(data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, []);

  const handleSubmitInquiry = async (e) => {
    e.preventDefault();
    if (!newInquiry.trim()) return;

    const userId = localStorage.getItem("id");
    // const userName = localStorage.getItem("Name") || "مستخدم جديد";

    try {
      const { data } = await instanceAxios.post('/api/comments', {
        user: userId,
        comment: newInquiry
      });

      setMessages(prev => [...prev, data]);
      setNewInquiry('');
      setShowSubscription(true);
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  const handleSubmitReply = async (e) => {
    e.preventDefault();
    if (!replyContent.trim() || !replyingTo) return;

    const userId = localStorage.getItem("id");
    const userName = localStorage.getItem("name") || "صحفي";

    try {
const { data } = await instanceAxios.post(`/api/comments/${replyingTo}/reply`, {
  content: replyContent,
  replayUser: {
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

  const handleCloseSubscription = () => setShowSubscription(false);
  const handleSubscribe = () => setShowSubscription(false);

  return (
    <div className="chat-container container p-3 bg-light rounded" style={{ direction: 'rtl', maxWidth: '800px', margin: '40px auto' }}>
      <form onSubmit={handleSubmitInquiry} className="d-flex mb-3">
        <input 
          type="text" 
          className="form-control" 
          value={newInquiry} 
          onChange={(e) => setNewInquiry(e.target.value)} 
          onFocus={() => setShowSubscription(true)} 
          placeholder="اكتب استفسارك هنا..." 
          required 
        />
        <button className="btn btn-success ms-2">إرسال</button>
      </form>

      <div className="chat-messages">
        {messages.map((message) => (
          <div key={message._id} className="mb-3">
            <div className="d-flex align-items-start mb-2">
              <img src={user1} alt="user" className="rounded-circle me-2" style={{ width: '40px', height: '40px' }} />
              <div className="p-2 rounded bg-white shadow-sm" style={{ maxWidth: '80%' }}>
               <p className="mb-1 text-muted small">{message.user}</p>

                <p className="mb-0 mt-0">{message.comment}</p>
              </div>
            </div>

            {Array.isArray(message.replay) && message.replay.map((reply, idx) => (
              <div key={idx} className="d-flex align-items-start mb-2 ms-4">
                <img src={journalist1} alt="صحفي" className="rounded-circle me-2" style={{ width: '40px', height: '40px' }} />
                <div className="p-2 rounded bg-white shadow-sm" style={{ maxWidth: '80%' }}>
                  <p className="mb-1 text-muted small">{message.user}</p>

                  <p className="mb-0">{reply.content}</p>
                </div>
              </div>
            ))}

            <button className="btn btn-success p-2 mt-2" style={{ fontSize: '12px' }} onClick={() => setReplyingTo(message._id)}>الرد</button>
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
            <button type="button" className="btn btn-danger ms-2" onClick={() => setReplyingTo(null)}>إلغاء</button>
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
