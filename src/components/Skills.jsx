import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import Fade from 'react-reveal';
import { Container } from 'react-bootstrap';
import { useTrail, animated } from '@react-spring/web';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';

const styles = {
  iconStyle: {
    height: 75,
    width: 75,
    margin: 10,
    marginBottom: 0,
    transition: 'transform 0.3s ease-in-out', // Added transition for smooth lifting effect
  },
  introTextContainer: {
    whiteSpace: 'pre-wrap',
  },
};

function Skills(props) {
  const { header } = props;
  const [data, setData] = useState(null);

  const renderSkillsIntro = (intro) => (
    <h4 style={styles.introTextContainer}>
      <ReactMarkdown>{intro}</ReactMarkdown>
    </h4>
  );

  useEffect(() => {
    fetch(endpoints.skills, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  const skillsTrail = useTrail(data?.skills?.length || 0, {
    from: { opacity: 0, transform: 'translate3d(0,40px,0)' },
    to: { opacity: 1, transform: 'translate3d(0,0px,0)' },
  });

  return (
    <>
      <Header title={header} />
      {data ? (
        <Fade>
          <div className="section-content-container">
            <Container>
              {renderSkillsIntro(data.intro)}
              {skillsTrail.map((style, index) => (
                <animated.div key={data.skills[index].title} style={style}>
                  <br />
                  <h3>{data.skills[index].title}</h3>
                  {data.skills[index].items.map((item) => (
                    <div key={item.title} style={{ display: 'inline-block' }}>
                      <img
                        style={styles.iconStyle}
                        src={item.icon}
                        alt={item.title}
                        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-10px)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
                      />
                      <p>{item.title}</p>
                    </div>
                  ))}
                </animated.div>
              ))}
            </Container>
          </div>
        </Fade>
      ) : <FallbackSpinner />}
    </>
  );
}

Skills.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Skills;
