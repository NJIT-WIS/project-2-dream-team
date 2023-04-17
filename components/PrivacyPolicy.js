import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import { Button, Modal } from 'react-bootstrap'

const PrivacyPolicy = ({ onAgree }) => {
  const handleClose = () => {
    // If the user closes the modal without agreeing to the privacy policy, set showPrivacyPolicy to false
    onAgree && onAgree(false)
  }

  const handleAgree = () => {
    // If the user agrees to the privacy policy, set showPrivacyPolicy to false and run the onAgree callback function
    onAgree && onAgree(true)
  }

  return (
    <Modal show onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Privacy Policy</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Please read our Privacy & Cookies Policy carefully before using our website.</p>
        <p>Do you agree to our Privacy & Cookies Policy?.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          Disagree
        </Button>
        <Button variant='primary' onClick={handleAgree}>
          Agree
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default PrivacyPolicy
