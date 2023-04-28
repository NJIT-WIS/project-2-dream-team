import React from 'react';
import { useCookies } from 'react-cookie';
import styles from '../../pages/PrivacyPolicyPopup.module.css';

const PrivacyPopup = ({ onAccept, onReject }) => {
  const [cookies, setCookie] = useCookies(['acceptedPrivacyPolicy']);

  const handleAccept = () => {
    setCookie('acceptedPrivacyPolicy', true, { path: '/' });
    onAccept();
  };

  const handleReject = () => {
    onReject();
  };

  return (
    <div className={styles.popup}>
      <div className={styles.popupContent}>
        <h2>Privacy & Cookies Policy</h2>
        <p>By continuing to use this website, you agree to our <a href="/privacy-policy">Privacy and Cookies Policy</a>.. Please read our policy carefully before proceeding..</p>
        <div className={styles.buttonContainer}>
          <button className={styles.rejectButton} onClick={handleReject}>Reject</button>
          <button className={styles.acceptButton} onClick={handleAccept}>Accept</button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPopup;




















