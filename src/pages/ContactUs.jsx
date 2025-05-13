import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faTimes } from '@fortawesome/free-solid-svg-icons';
import user1 from './images/تنزيل.jpg';
import journalist1 from './images/images.jpg';
import user2 from './images/images (1).jpg';

const ContactUs = () => {
  const [newInquiry, setNewInquiry] = useState('');
  const [replyContent, setReplyContent] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [showSubscription, setShowSubscription] = useState(false);
  
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'محمد عبد الكريم',
      content: 'هل الأخبار متعلقة بكل منطقة؟',
      isJournalist: false,
      avatar: user1,
      replies: [
        {
          id: 2,
          sender: 'علي محمد',
          content: 'نعم صحيح كل منطقة ولها اخبارها الخاصة بها.',
          isJournalist: true,
          avatar: journalist1
        }
      ]
    },
    {
      id: 3,
      sender: 'احمد حلمي',
      content: 'هل الأخبار متعلقة بكل منطقة؟',
      isJournalist: false,
      avatar: user2,
      replies: []
    }
  ]);

  const handleSubmitInquiry = (e) => {
    e.preventDefault();
    if (!newInquiry.trim()) return;
    
    const newMessage = {
      id: messages.length + 1,
      sender: 'مستخدم جديد',
      content: newInquiry,
      isJournalist: false,
      avatar: user1,
      replies: []
    };
    
    setMessages([...messages, newMessage]);
    setNewInquiry('');
    setShowSubscription(true); // عرض إشعار الاشتراك بعد الإرسال
  };

  const handleSubmitReply = (e) => {
    e.preventDefault();
    if (!replyContent.trim() || !replyingTo) return;
    
    const updatedMessages = messages.map(msg => {
      if (msg.id === replyingTo) {
        const newReply = {
          id: msg.replies.length + 1 + Math.random(),
          sender: 'صحفي',
          content: replyContent,
          isJournalist: true,
          avatar: journalist1
        };
        return { ...msg, replies: [...msg.replies, newReply] };
      }
      return msg;
    });
    
    setMessages(updatedMessages);
    setReplyContent('');
    setReplyingTo(null);
  };

  const handleCloseSubscription = () => {
    setShowSubscription(false);
  };

  const handleSubscribe = () => {
    // هنا يمكنك إضافة منطق الاشتراك الفعلي
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
            onFocus={() => setShowSubscription(true)} // إظهار الإشعار عند التركيز على الـ input
            placeholder="اكتب استفسارك هنا..." 
            required 
          />
          <button className="btn btn-success ms-2 margin">إرسال</button>
        </form>
      </div>

      <div className="chat-messages">
        {messages.map((message) => (
          <div key={message.id} className="mb-3">
            <div className="d-flex align-items-start mb-2">
              <img src={message.avatar} alt={message.sender} className="rounded-circle me-2" style={{ width: '40px', height: '40px' }} />
              <div className="p-2 rounded bg-white shadow-sm" style={{ maxWidth: '80%' }}>
                <strong>{message.sender}{message.isJournalist && ' (صحفي)'}</strong>
                <p className="mb-0">{message.content}</p>
              </div>
            </div>
            {message.replies.map((reply) => (
              <div key={reply.id} className="d-flex align-items-start mb-2 ms-4">
                <img src={reply.avatar} alt={reply.sender} className="rounded-circle me-2" style={{ width: '40px', height: '40px' }} />
                <div className="p-2 rounded bg-white shadow-sm" style={{ maxWidth: '80%' }}>
                  <strong>{reply.sender}{reply.isJournalist && ' (صحفي)'}</strong>
                  <p className="mb-0">{reply.content}</p>
                </div>
              </div>
            ))}
            <button className="btn btn-success p-2 say" style={{ fontSize: '12px' }} onClick={() => setReplyingTo(message.id)}>الرد</button>
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
            <button className="btn btn-success ms-2 margin">إرسال</button>
            <button className="btn btn-danger ms-2 margin" onClick={() => setReplyingTo(null)}>إلغاء</button>
          </form>
        </div>
      )}

      {/* إشعار الاشتراك */}
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
                        <FontAwesomeIcon 
                          icon={faBell} 
                          className="me-1 text-primary " 
                          size="2x" 
                        />
                        <h5 className="mb-0 me-2"> يجب تسجيل الدخوب اولا !</h5>
                      </div>
            
            
                      <div className="d-flex justify-content-between align-items-center"> 
                      <button 
                            onClick={handleSubscribe}
                            className="btn  px-4"
                          >
                     الغاء
                          </button>
                        <a href="/user-login">
                          <button 
                            onClick={handleSubscribe}
                            className="btn btn-primary px-4"
                          >
                            تسجيل الدخول
                          </button>
                        </a>
                      </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactUs;