import React, { useEffect, useState } from 'react';
import { Container, Spinner, Alert } from 'reactstrap';
import './NoticeBoard.css';
import GecNavbar from './Navbar';
import HeroSection from './HeroSection';
import axios from 'axios';

const NoticePage = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await axios.get('https://startup-w0fm.onrender.com');
        setNotices(res.data);
      } catch (err) {
        console.error('❌ Error fetching notices:', err.message);
        setError('Failed to load notices. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  return (
    <>
      <GecNavbar />
      <HeroSection />
      <div className="notice-plain">
        <Container fluid className="py-5 px-4">
          <div className="text-center mb-5">
            <h1 className="display-5 fw-bold text-primary">📢 Official Notices</h1>
            <p className="lead text-muted">Stay updated with the latest announcements from the Startup Cell</p>
          </div>

          {loading ? (
            <div className="text-center">
              <Spinner color="primary" />
            </div>
          ) : error ? (
            <Alert color="danger">{error}</Alert>
          ) : notices.length === 0 ? (
            <Alert color="info">No notices available at the moment.</Alert>
          ) : (
            <div className="all-notices">
              {notices.map((notice, idx) => (
                <div className="single-notice mb-5" key={idx}>
                  <h4 className="notice-title">
                    {notice.title}
                  </h4>
                  <p className="notice-meta">
                    {notice.date} {notice.place && ` | Venue: ${notice.place}`}
                  </p>
                  <p className="notice-desc">{notice.description}</p>
                </div>
              ))}
            </div>
          )}
        </Container>
      </div>
    </>
  );
};

export default NoticePage;
