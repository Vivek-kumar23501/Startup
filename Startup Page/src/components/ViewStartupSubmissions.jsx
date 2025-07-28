import React, { useEffect, useState } from 'react';
import { Container, Table, Button } from 'reactstrap';
import InstituteNavbar from './instutenavbar';
import axios from 'axios';

const ViewStartupSubmissions = () => {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/ideas');
        setIdeas(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch startup ideas:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchIdeas();
  }, []);

  const downloadFile = (ideaId) => {
    window.open(`http://localhost:5000/api/ideas/download/${ideaId}`, '_blank');
  };

  return (
    <>
      <InstituteNavbar />
      <Container className="my-5">
        <h2 className="text-center mb-4">📥 Startup Idea Submissions</h2>

        {loading ? (
          <p>🔄 Loading submissions...</p>
        ) : ideas.length === 0 ? (
          <p>⚠️ No submissions found.</p>
        ) : (
          <Table bordered responsive hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Description</th>
                <th>Founder</th>
                <th>Email</th>
                <th>Document</th>
              </tr>
            </thead>
            <tbody>
              {ideas.map((idea, index) => (
                <tr key={idea._id}>
                  <td>{index + 1}</td>
                  <td>{idea.title}</td>
                  <td>{idea.description}</td>
                  <td>{idea.founder}</td>
                  <td>{idea.email}</td>
                  <td>
                    <Button color="primary" size="sm" onClick={() => downloadFile(idea._id)}>
                      Download
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </>
  );
};

export default ViewStartupSubmissions;
