import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

import user1 from './images/تنزيل.jpg';
import journalist1 from './images/images.jpg';
import instanceAxios from '../components/Axios/Axios';

const ContactUs = () => {
  const [newInquiry, setNewInquiry] = useState('');
  const [replyContent, setReplyContent] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [messages, setMessages] = useState([]);
  const [login, setLogin] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const sagin = localStorage.getItem("isLoggedIn");
    if (sagin) {
      setLogin(true);
    }
  }, []);

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

    try {
      const { data } = await instanceAxios.post('/api/comments', {
        user: userId,
        comment: newInquiry
      });

      setMessages(prev => [...prev, data]);
      setNewInquiry('');
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

      setMessages(prev =>
        prev.map(msg => (msg._id === data._id ? data : msg))
      );
      setReplyContent('');
      setReplyingTo(null);
    } catch (error) {
      console.error('Error replying to comment:', error);
    }
  };

  const handleLogin = () => {
    navigate('/user-login');
  };

  return (
    <div className="chat-container container p-3 bg-light rounded" style={{ direction: 'rtl', maxWidth: '800px', margin: '40px auto' }}>
      <form onSubmit={handleSubmitInquiry} className="d-flex mb-3">
        <input
          type="text"
          className="form-control"
          value={newInquiry}
          onChange={(e) => setNewInquiry(e.target.value)}
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
                <p className="mb-0">{message.comment}</p>
              </div>
            </div>

            {Array.isArray(message.replay) && message.replay.map((reply, idx) => (
              <div key={idx} className="d-flex align-items-start mb-2 ms-4">
                <img src={journalist1} alt="صحفي" className="rounded-circle me-2" style={{ width: '40px', height: '40px' }} />
                <div className="p-2 rounded bg-white shadow-sm" style={{ maxWidth: '80%' }}>
                  <p className="mb-1 text-muted small">{reply.replayUser?.name}</p>
                  <p className="mb-0">{reply.content}</p>
                </div>
              </div>
            ))}

            {login ? (
              <button
                className="btn btn-success p-2 mt-2"
                style={{ fontSize: '12px' }}
                onClick={() => setReplyingTo(message._id)}
              >
                الرد
              </button>
            ) : (
              <button
                className="btn btn-primary px-4 mt-2"
                onClick={handleLogin}
              >
                يجب تسجيل الدخول أولاً
              </button>
            )}

            {replyingTo === message._id && (
              <div className="p-3 rounded mt-3 bg-white shadow-sm">
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactUs;
