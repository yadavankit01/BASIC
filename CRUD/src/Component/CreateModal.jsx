import { Modal, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import React from "react";
import { useState } from "react";
import axios from "axios";
import "./CreateModal.css";

function CreateModal({ state, fun, loadUsers }) {
  const initialstate = {
    Name: { value: "", IsValid: true },
    Username: { value: "", IsValid: true },
    Email: { value: "", IsValid: true },
    Number: { value: "", IsValid: true },
    Website: { value: "", IsValid: true },
    Password: { value: "", IsValid: true },
    Image: { value: "", IsValid: true },
  };
  const [inputs, setinputs] = useState(initialstate);

  const Handalchange = (identifier, entervalue) => {
    setinputs((currentvalue) => {
      return {
        ...currentvalue,
        [identifier]: {
          value: entervalue,
          IsValid: true,
        },
      };
    });
  };

  const handalimage = (e) => {
    const file = e.target.files[0];
    const filereader = new FileReader();
    filereader.readAsDataURL(file);
    filereader.onload = (e) => {
      const url = e.target.result;
      if (file) {
        setinputs((curr) => {
          return {
            ...curr,
            Image: {
              value: url,
              IsValid: true,
            },
          };
        });
      }
    };
  };

  const handlsubmit = async (e) => {
    e.preventDefault();
    const IsNameValid = inputs.Name.value.length > 3;
    const IsUserNameValid = inputs.Username.value.length > 5;
    const IsEmailValid = inputs.Email.value.length > 5;
    const IsNumberValid = inputs.Number.value.length > 9;
    const IsWebsiteValid = inputs.Website.value.length > 5;
    const IsPassword = inputs.Password.value.length > 5;
    const IsImageValid = !!inputs.Image.value;

    if (
      !IsEmailValid ||
      !IsNumberValid ||
      !IsUserNameValid ||
      !IsWebsiteValid ||
      !IsNameValid ||
      !IsImageValid ||
      !IsPassword
    ) {
      setinputs((curr) => ({
        Name: { value: curr.Name.value, IsValid: IsNameValid },
        Username: { value: curr.Username.value, IsValid: IsUserNameValid },
        Email: { value: curr.Email.value, IsValid: IsEmailValid },
        Password: { value: curr.Password.value, IsValid: IsPassword },
        Number: { value: curr.Number.value, IsValid: IsNumberValid },
        Website: { value: curr.Website.value, IsValid: IsWebsiteValid },
        Image: { value: curr.Image.value, IsValid: IsImageValid },
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
      const res = await axios.post("http://localhost:3004/users", Data);
      if (res) {
        fun();
        loadUsers();
      }
    } catch (error) {
      console.log("error in data post", error.message);
    }
  };

  return (
    <Modal show={state} onHide={fun} centered>
      <Modal.Header closeButton className="custom-modal-header">
        <Modal.Title>Create User</Modal.Title>
      </Modal.Header>

      <Modal.Body className="modal-body">
        <Form onSubmit={handlsubmit}>
          <Form.Group className="mb-2">
            <Form.Label htmlFor="N">Name</Form.Label>
            <Form.Control
              className="form-control"
              name="Name"
              required
              id="N"
              value={inputs.Name.value}
              placeholder="Name"
              onChange={(e) => Handalchange("Name", e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label htmlFor="username">User-Name</Form.Label>
            <Form.Control
              className="form-control"
              name="Username"
              required
              id="username"
              value={inputs.Username.value}
              placeholder="username"
              onChange={(e) => Handalchange("Username", e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label htmlFor="phone">Phone No.</Form.Label>
            <Form.Control
              className="form-control"
              name="Number"
              required
              id="phone"
              value={inputs.Number.value}
              placeholder="phone no."
              onChange={(e) => Handalchange("Number", e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label htmlFor="Email">Email</Form.Label>
            <Form.Control
              className="form-control"
              name="Email"
              required
              id="Email"
              value={inputs.Email.value}
              placeholder="Email"
              onChange={(e) => Handalchange("Email", e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label htmlFor="ps">Password</Form.Label>
            <Form.Control
              className="form-control"
              name="Password"
              required
              id="ps"
              value={inputs.Password.value}
              placeholder="Password"
              onChange={(e) => Handalchange("Password", e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label htmlFor="web">Website</Form.Label>
            <Form.Control
              className="form-control"
              name="Website"
              required
              id="web"
              value={inputs.Website.value}
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
              required
              id="img"
              accept=".png, .jpg, .jpeg"
              placeholder="file"
              onChange={handalimage}
            />
          </Form.Group>

          <Button type="submit" className="btn-block w-100">
            Add User
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default CreateModal;
