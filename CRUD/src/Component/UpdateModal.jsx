import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import "./UpdateModal.css";

function UpdateModal({ state, fun, userId }) {
  const initialstate = {
    Name: { value: "", IsValid: true },
    Username: { value: "", IsValid: true },
    Email: { value: "", IsValid: true },
    Number: { value: "", IsValid: true },
    Website: { value: "", IsValid: true },
    Image: { value: "", IsValid: true },
  };

  const [inputs, setinputs] = useState(initialstate);

  const Handalchange = (identifier, entervalue) => {
    setinputs((currinputs) => ({
      ...currinputs,
      [identifier]: {
        value: entervalue,
        IsValid: true,
      },
    }));
  };

  const handalimage = (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (e) => {
      const url = e.target.result;
      if (file) {
        setinputs((curr) => ({
          ...curr,
          Image: {
            value: url,
            IsValid: true,
          },
        }));
      }
    };
  };

  const Handalsubmit = async (e) => {
    e.preventDefault();
    const IsNameValid = inputs.Name.value.length > 3;
    const IsUserNameValid = inputs.Username.value.length > 5;
    const IsEmailValid = inputs.Email.value.length > 5;
    const IsNumberValid = inputs.Number.value.length > 9;
    const IsWebsiteValid = inputs.Website.value.length > 5;

    if (
      !IsEmailValid ||
      !IsNumberValid ||
      !IsUserNameValid ||
      !IsWebsiteValid ||
      !IsNameValid
    ) {
      setinputs((curr) => ({
        Name: { value: curr.Name.value, IsValid: IsNameValid },
        Username: { value: curr.Username.value, IsValid: IsUserNameValid },
        Email: { value: curr.Email.value, IsValid: IsEmailValid },
        Number: { value: curr.Number.value, IsValid: IsNumberValid },
        Image: { value: curr.Image.value, IsValid: IsImageValid },
        Website: { value: curr.Website.value, IsValid: IsWebsiteValid },
      }));
      return;
    }

    const Data = {
      name: inputs.Name.value,
      email: inputs.Email.value,
      phone: inputs.Number.value,
      username: inputs.Username.value,
      website: inputs.Website.value,
      image: inputs.Image.value,
    };
    try {
      const res = await axios.put(
        `http://localhost:3004/users/${userId}`,
        Data
      );
      if (res) {
        fun();
        Loaduser();
      }
    } catch (error) {
      console.log("error in put the data", error.message);
    }
  };

  const Loaduser = async () => {
    try {
      const user = await axios.get(`http://localhost:3004/users/${userId}`);
      if (user) {
        setinputs({
          Name: { value: user.data.name || "", IsValid: true },
          Username: { value: user.data.username || "", IsValid: true },
          Email: { value: user.data.email || "", IsValid: true },
          Number: { value: user.data.phone || "", IsValid: true },
          Image: { value: user.data.image || "", IsValid: true },
          Website: { value: user.data.website || "", IsValid: true },
        });
      }
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };

  useEffect(() => {
    if (userId) {
      Loaduser();
    }
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
        <Modal.Title>Update Details</Modal.Title>
      </Modal.Header>

      <Modal.Body className="modal-body">
        <Form onSubmit={Handalsubmit}>
          <Form.Group className="mb-2">
            <Form.Label htmlFor="N">Name</Form.Label>
            <Form.Control
              className="form-control"
              name="Name"
              value={inputs.Name.value}
              required
              id="N"
              placeholder="Name"
              onChange={(e) => Handalchange("Name", e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label htmlFor="username">User-Name</Form.Label>
            <Form.Control
              className="form-control"
              name="Username"
              value={inputs.Username.value}
              required
              id="username"
              placeholder="username"
              onChange={(e) => Handalchange("Username", e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label htmlFor="phone">Phone No.</Form.Label>
            <Form.Control
              className="form-control"
              name="Number"
              value={inputs.Number.value}
              required
              id="phone"
              placeholder="phone no."
              onChange={(e) => Handalchange("Number", e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label htmlFor="Email">Email</Form.Label>
            <Form.Control
              className="form-control"
              name="Email"
              value={inputs.Email.value}
              required
              id="Email"
              placeholder="Email"
              onChange={(e) => Handalchange("Email", e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label htmlFor="web">Website</Form.Label>
            <Form.Control
              className="form-control"
              name="Website"
              value={inputs.Website.value}
              required
              id="web"
              placeholder="www.com"
              onChange={(e) => Handalchange("Website", e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label htmlFor="img">Image</Form.Label>
            <Form.Control
              className="form-control"
              name="Image"
              type="file"
              id="img"
              accept=".png, .jpg, .jpeg"
              placeholder="file"
              onChange={handalimage}
            />
          </Form.Group>

          <Modal.Footer>
            <Button className="btn-custom" onClick={fun} variant="secondary">
              Close
            </Button>
            <Button className="btn-custom" variant="primary" type="submit">
              Save changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default UpdateModal;
