import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Container, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Fade from 'react-reveal';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: '20px',
    margin: '20px 10px',
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  introTextContainer: {
    flex: 1,
    whiteSpace: 'pre-wrap',
    textAlign: 'justify',
    fontSize: '1.2em',
    fontWeight: 500,
    lineHeight: '1.8em',
    color: '#333333',
  },
  introImageContainer: {
    flexShrink: 0,
    position: 'relative',
  },
  circularImage: {
    width: '250px',
    height: '250px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '5px solid #0056b3', // Updated Border
    boxShadow: '0 6px 12px rgba(0, 86, 179, 0.4)', // Soft Blue Shadow
    transition: 'border-color 0.3s ease', // Smooth transition for hover effect
  },
};

function About(props) {
  const { header } = props;
  const [data, setData] = useState(null);

  const parseIntro = (text) => (
    <ReactMarkdown children={text} />
  );

  const handleMouseEnter = (e) => {
    e.target.style.borderColor = '#ff7043'; // Change to Warm Orange on hover
  };

  const handleMouseLeave = (e) => {
    e.target.style.borderColor = '#0056b3'; // Reset to Deep Blue
  };

  useEffect(() => {
    fetch(endpoints.about, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <>
      <Header title={header} />
      <div className="section-content-container" style={{ position: 'relative' }}>
        <Container style={styles.container}>
          {data ? (
            <Fade>
              <Row>
                <Col md={8} style={styles.introTextContainer}>
                  {parseIntro(data.about)}
                </Col>
                <Col md={4}>
                  <div style={styles.introImageContainer}>
                    <img
                      src={data?.imageSource}
                      alt="profile"
                      style={styles.circularImage}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    />
                  </div>
                </Col>
              </Row>
            </Fade>
          ) : (
            <FallbackSpinner />
          )}
        </Container>
      </div>
    </>
  );
}

About.propTypes = {
  header: PropTypes.string.isRequired,
};

export default About;
