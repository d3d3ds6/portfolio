import React, { useEffect, useState, useContext } from 'react';
import { SocialIcon } from 'react-social-icons';
import { ThemeContext } from 'styled-components';
import endpoints from '../constants/endpoints';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '10px', // Add spacing between icons
  },
  iconStyle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50px', // Ensure consistent width
    height: '50px', // Ensure consistent height
    cursor: 'pointer',
    marginTop: '20px', // Push icons down by 20px

  },
};

function Social() {
  const theme = useContext(ThemeContext);
  const [data, setData] = useState([]);

  // Fetch social data
  useEffect(() => {
    fetch(endpoints.social)
      .then((response) => response.json())
      .then((result) => {
        setData(result.social || []);
      })
      .catch(() => {
        setData([]);
      });
  }, []);

  // Handle email clicks for Gmail, Yahoo, and Outlook
  const handleEmailClick = (email, service = 'gmail') => {
    const mailServices = {
      gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`,
      yahoo: `https://compose.mail.yahoo.com/?to=${email}`,
      outlook: `https://outlook.live.com/mail/0/deeplink/compose?to=${email}`,
    };

    const mailUrl = mailServices[service] || `mailto:${email}`;
    window.open(mailUrl, '_blank');
  };

  return (
    <div style={styles.container}>
      {data.map((social) => {
        if (social.network === 'email') {
          return (
            <div
              key={social.href}
              style={styles.iconStyle}
              role="button"
              tabIndex={0}
              onClick={() => handleEmailClick(social.href, social.service || 'gmail')}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleEmailClick(social.href, social.service || 'gmail');
                }
              }}
            >
              <SocialIcon
                url="#"
                network="email"
                bgColor={theme?.socialIconBgColor || '#000'}
              />
            </div>
          );
        }

        return (
          <SocialIcon
            key={social.network}
            style={styles.iconStyle}
            url={social.href}
            network={social.network}
            bgColor={theme?.socialIconBgColor || '#000'}
            target="_blank"
            rel="noopener noreferrer"
          />
        );
      })}
    </div>
  );
}

export default Social;
