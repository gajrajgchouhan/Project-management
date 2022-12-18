import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import SelectUsers from "./SelectUsers";

const initialState = {
    name: "",
    description: "",
    team: [""],
};

function CreateProject() {
    const userState = useSelector((state) => state.user);

    const [show, setShow] = useState(false);
    const [data, setData] = useState(initialState);

    const handleChanges = (e, key) => {
        setData({ ...data, [key]: e.target.value });
    };

    const handleClose = () => {
        setData(initialState);
        setShow(false);
    };
    const handleShow = () => setShow(true);

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
                    <Form
                        onSubmit={async (e) => {
                            e.preventDefault();
                            const res = await fetch(
                                "http://BASE_URL/projects/add",
                                {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                        Authorization: `${userState.user}`,
                                    },
                                    body: JSON.stringify(data),
                                }
                            );
                            if (res.ok) {
                                toast.success("Project Created");
                                handleClose();
                            } else {
                                toast.error("Error creating project");
                            }
                        }}
                    >
                        <Form.Group
                            className="mb-3"
                            controlId="createProject.ControlInput1"
                        >
                            <Form.Label>Project Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Name of Project"
                                autoFocus
                                value={data.name}
                                onChange={(e) => handleChanges(e, "name")}
                            />
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="createProject.ControlInput2"
                        >
                            <Form.Label>Usernames</Form.Label>
                            <SelectUsers {...{ data, setData }} />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="createProject.ControlTextarea1"
                        >
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="description"
                                placeholder="Description of Project"
                                value={data.description}
                                onChange={(e) =>
                                    handleChanges(e, "description")
                                }
                            />
                        </Form.Group>
                        <Button variant="success" type="submit">
                            Create
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CreateProject;
