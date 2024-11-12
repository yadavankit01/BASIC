import React from "react";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import axios from "axios";
import "./ViewModal.css"; // Optional: Move styles to a separate CSS file

function ViewModal({ state, fun, userId }) {
  const [user, setuser] = useState({});

  const getuser = async (id) => {
    const user = await axios.get(`http://localhost:3004/users/${id}`);
    if (user) {
      setuser(user.data);
      console.log(user.data);
    }
  };

  useEffect(() => {
    +getuser(userId);
  }, [userId]);

  return (
    <Modal
      show={state}
      onHide={fun}
      centered
      backdrop="static" // Prevents modal from closing when clicking outside
      keyboard={false} // Prevents modal from closing with the Escape key
    >
      <Modal.Header closeButton className="custom-modal-header">
        <Modal.Title className="modal-title-custom">User Details</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body-custom">
        <div className="image-container">
          <img
            className="user-image"
            src={user.image}
            alt={`${user.name}'s profile`}
          />
        </div>
        <div className="user-details">
          <h6>
            <strong>Name:</strong> <span>{user.name}</span>
          </h6>
          <h6>
            <strong>Username:</strong> <span>{user.username}</span>
          </h6>
          <h6>
            <strong>Email:</strong> <span>{user.email}</span>
          </h6>
          <h6>
            <strong>Phone:</strong> <span>{user.phone}</span>
          </h6>
          <h6>
            <strong>Website:</strong>{" "}
            <a href={`http://${user.website}`} target="_blank" rel="noreferrer">
              {user.website}
            </a>
          </h6>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" className="btn-custom" onClick={fun}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ViewModal;
