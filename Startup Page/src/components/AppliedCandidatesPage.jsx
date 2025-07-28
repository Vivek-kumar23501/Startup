import React, { useEffect, useState } from 'react';
import {
  Container, Table, Spinner, Alert
} from 'reactstrap';
import axios from 'axios';
import InstituteNavbar from './instutenavbar';

const AppliedCandidatesPage = () => {
  const [groupedCandidates, setGroupedCandidates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchApplications = async () => {
    try {
      const res = await axios.get('https://startup-w0fm.onrender.com');
      const applications = res.data;

      // ✅ Group applications by eventId
      const grouped = {};
      applications.forEach((app) => {
        const eventKey = app.eventId?._id || 'unknown';
        if (!grouped[eventKey]) {
          grouped[eventKey] = {
            event: app.eventId || { title: 'Unknown Event', date: 'N/A' },
            candidates: [],
          };
        }
        grouped[eventKey].candidates.push(app);
      });

      setGroupedCandidates(grouped);
    } catch (err) {
      setError('Failed to load applications.');
      console.error("❌ Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <>
      <InstituteNavbar />
      <Container className="my-5">
        <h2 className="mb-4">📋 Applied Candidates by Event</h2>

        {loading ? (
          <Spinner color="primary" />
        ) : error ? (
          <Alert color="danger">{error}</Alert>
        ) : Object.keys(groupedCandidates).length === 0 ? (
          <Alert color="warning">No applications found.</Alert>
        ) : (
          Object.entries(groupedCandidates).map(([eventId, group], idx) => (
            <div key={eventId} className="mb-5">
              <h4 className="mb-3">
                🎯 Event: {group.event.title} | 📅 {group.event.date}
              </h4>
              <Table striped responsive bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Candidate Name</th>
                    <th>Registration No</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Applied At</th>
                  </tr>
                </thead>
                <tbody>
                  {group.candidates.map((app, index) => (
                    <tr key={app._id}>
                      <td>{index + 1}</td>
                      <td>{app.name}</td>
                      <td>{app.registration}</td>
                      <td>{app.email}</td>
                      <td>{app.mobile}</td>
                      <td>{new Date(app.appliedAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          ))
        )}
      </Container>
    </>
  );
};

export default AppliedCandidatesPage;
