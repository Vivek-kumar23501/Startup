import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import UserNavbar from './UserNavbar';

const mentors = [
  {
    name: "Om Prakash Ram",
    field: "AI & Innovation",
    email: "omprakashram505@gmail.com",
    mentees: ["Vivek", "Ravi"]
  },
{
  name: "Kumar Yash Raj",
  field: "Business Strategy",
  email: "yash@startuphub.com",
  mentees: ["Ravi"]  // ✅ Now he will be shown
},

  {
    name: "Pratik Kumar",
    field: "Campus Representative",
    email: "aditya@mentorconnect.com",
    mentees: ["Simran"]
  }
];

const MentorPage = () => {
  // Filter mentors who have at least 1 mentee
  const activeMentors = mentors.filter(m => m.mentees && m.mentees.length > 0);

  return (
    <>
      <UserNavbar />
      <Container className="my-5">
        <h2 className="text-center mb-4">Mentors Who Have Guided Students</h2>
        <Row>
          {activeMentors.map((mentor, idx) => (
            <Col md="4" key={idx} className="mb-4">
              <div className="event-block p-4 h-100">
                <h5 className="fw-bold text-success">{mentor.name}</h5>
                <p><strong>Expertise:</strong> {mentor.field}</p>
                <p><strong>Contact:</strong> {mentor.email}</p>
                <p><strong>Mentees:</strong> {mentor.mentees.join(', ')}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default MentorPage;
