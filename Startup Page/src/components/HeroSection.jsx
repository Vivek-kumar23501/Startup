import React, { useState, useEffect } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
  Container,
  Row,
  Col
} from 'reactstrap';
import axios from 'axios';
import './HeroSection.css';

const items = [
  {
    src: '/1st.jpeg',
    altText: 'Startup Cell Event 1',
  },
  {
    src: '/2nd.jpeg',
    altText: 'Startup Cell Event 2',
  },
  {
    src: '/3rd.jpeg',
    altText: 'Startup Cell Event 3',
  }
];

const HeroSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [notices, setNotices] = useState([]);

  const next = () => {
    if (animating) return;
    setActiveIndex((activeIndex + 1) % items.length);
  };

  const previous = () => {
    if (animating) return;
    setActiveIndex((activeIndex - 1 + items.length) % items.length);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item, index) => (
    <CarouselItem
      onExiting={() => setAnimating(true)}
      onExited={() => setAnimating(false)}
      key={index}
    >
      <img src={item.src} alt={item.altText} className="carousel-img" />
      <CarouselCaption captionText="" captionHeader={item.caption} />
    </CarouselItem>
  ));

  useEffect(() => {
    const fetchNotices = async () => {
      try {
         const res = await axios.get('http://localhost:5000/api/institute/notices');
        setNotices(res.data);
      } catch (err) {
        console.error('❌ Error loading notices:', err.message);
      }
    };
    fetchNotices();
  }, []);

  return (
    <Container  style={{
     margin:'0px'
    }} fluid className="py-4 hero-section">
      <Row  style={
        {
          margin: '0px',
        }
      } >
        <Col lg="9" xs="12" className="mb-3 mb-lg-0">
          <Carousel activeIndex={activeIndex} next={next} previous={previous}>
            <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
            {slides}
            <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
            <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
          </Carousel>
        </Col>

        <Col lg="3" xs="12" className="notice-board p-3">
          <h5 className="mb-3">📢 Notice Board</h5>
          <marquee direction="up" scrollamount="3" height="300px">
            <ul className="list-unstyled">
              {notices.length === 0 ? (
                <li>No notices available</li>
              ) : (
                notices.map((notice) => (
                  <li key={notice._id}>📌 {notice.title} – {notice.date}</li>
                ))
              )}
            </ul>
          </marquee>
        </Col>
      </Row>
    </Container>
  );
};

export default HeroSection;
