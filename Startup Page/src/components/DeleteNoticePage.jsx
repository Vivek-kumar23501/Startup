import React, { useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Alert,
  Button,
  Spinner,
  Card,
  CardBody,
  CardTitle,
  CardText
} from 'reactstrap';
import InstituteNavbar from '../components/instutenavbar';
import axios from 'axios';

const DeleteNoticePage = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ type: '', message: '' });

  const fetchNotices = async () => {
    try {
      const res = await axios.get('https://startup-w0fm.onrender.com');
      setNotices(res.data);
    } catch (err) {
      console.error('❌ Error fetching notices:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/institute/notices/${id}`);
      setNotices((prev) => prev.filter(notice => notice._id !== id));
      setAlert({ type: 'success', message: '✅ Notice deleted successfully' });
    } catch (err) {
      console.error('❌ Delete error:', err.message);
      setAlert({ type: 'danger', message: '❌ Failed to delete notice' });
    }

    setTimeout(() => setAlert({ type: '', message: '' }), 3000);
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  return (
    <>
      <InstituteNavbar />
      <Container className="my-5">
        <h2 className="text-center mb-4">🗑️ Delete Notices</h2>
        {alert.message && <Alert color={alert.type}>{alert.message}</Alert>}

        {loading ? (
          <Spinner color="primary" />
        ) : notices.length === 0 ? (
          <Alert color="info">No notices available.</Alert>
        ) : (
          <Row>
            {notices.map((notice) => (
              <Col md="6" key={notice._id} className="mb-4">
                <Card className="shadow-sm">
                  <CardBody>
                    <CardTitle tag="h5">{notice.title}</CardTitle>
                    <CardText>{notice.description}</CardText>
                    <CardText><strong>Date:</strong> {notice.date}</CardText>
                    <CardText><strong>Place:</strong> {notice.place}</CardText>
                    <Button color="danger" size="sm" onClick={() => handleDelete(notice._id)}>
                      Delete
                    </Button>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  );
};

export default DeleteNoticePage;
