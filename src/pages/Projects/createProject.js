import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import SelectUsers from './SelectUsers';

function CreateProject() {
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const handleClick = () => {
  //   <Form.Control
  //               type="email"
  //               name="email"
  //               placeholder="name@example.com"
  //               autoFocus
  //             />
  // }
  

  return (
    <>

      <Button variant="success" onClick={handleShow}>
        Create Project
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group className="mb-3" controlId="createProject.ControlInput1">
              <Form.Label>Project Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Name of Project"
                autoFocus
              />
            </Form.Group>
            
            {/* <SelectUser /> */}
            <Form.Group className="mb-3" controlId="createProject.ControlInput2">
              <Form.Label>Username</Form.Label>
              <SelectUsers />
              
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="createProject.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          
          <Button variant="success" onClick={handleClose} type="submit">
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateProject;