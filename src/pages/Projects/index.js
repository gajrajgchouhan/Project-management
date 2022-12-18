import React, { useEffect } from "react";
import { useState } from "react";
import AddTaskForm from "./AddTaskForm.jsx";
import UpdateForm from "./UpdateForm.jsx";
import ToDo from "./ToDo.jsx";
import "./proj.css";
import Table from "react-bootstrap/Table";
import CreateProject from "./createProject.js";
import ProjectDescription from "./descriptionCard.js";
import { useSelector } from "react-redux";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Projects = () => {
    const userState = useSelector((state) => state.user);
    const [allProjects, setAllProjects] = useState([]);
    const [index, setIndex] = useState(null);

    useEffect(() => {
        const init = async () => {
            console.log(userState);
            const res = await fetch("http://BASE_URL/projects/getAll", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: userState.user,
                },
            });
            const d = await res.json();
            setAllProjects(d.projects);
        };
        init();
    }, []);

    return (
        <>
            <div className="flexbox-container">
                <div className="sidebar">
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "end",
                            alignItems: "center",
                            gap: "5px",
                        }}
                    >
                        <CreateProject />
                        <Button type="button" variant="link">
                            <Link to="/projects" replace>
                                Refresh
                            </Link>
                        </Button>
                    </div>
                    <br></br>
                    <br></br>
                    <Table className="table" striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Project</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allProjects.map((project, index) => {
                                return (
                                    <tr
                                        style={{
                                            cursor: "pointer",
                                        }}
                                        onClick={() => setIndex(() => index)}
                                    >
                                        <td>{index}</td>
                                        <td>{project.name}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </div>
                <div className="main">
                    <Project
                        data={index === null ? null : allProjects[index]}
                    />
                </div>
            </div>
        </>
    );
};

function Project({ data }) {
    console.log(data);
    const userState = useSelector((state) => state.user);
    // Tasks (ToDo List) State
    const [toDo, setToDo] = useState([]);

    useEffect(() => {
        setToDo(data?.tasks);
        console.log("useEffect");
    }, [data]);

    const [newTask, setNewTask] = useState("");
    const [updateData, setUpdateData] = useState(false);

    // Add task
    const addTask = async () => {
        if (newTask) {
            const res = await fetch("http://BASE_URL/projects/addTask", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${userState.user}`,
                },
                body: JSON.stringify({ projectId: data._id, name: newTask }),
            });
            if (res.ok) {
                toast.success("Task added successfully");
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            } else {
                toast.error("Error adding task");
            }
        }
    };

    // Delete task
    const deleteTask = (id) => {
        let newTasks = toDo.filter((task) => task.id !== id);
        setToDo(newTasks);
    };

    // Mark task as done or completed
    const markDone = async (id, index) => {
        const res = await fetch("http://BASE_URL/projects/updateTask", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `${userState.user}`,
            },
            body: JSON.stringify({
                id,
                complete: !toDo[index].complete,
            }),
        });
        if (res.ok) {
            toast.success("Task updated successfully");
            setTimeout(() => {
                window.location.reload();
            }, 500);
        } else {
            toast.error("Error updating task!");
        }
    };

    // Cancel update
    const cancelUpdate = () => {
        setUpdateData("");
    };

    // Change task for update
    const changeTask = (e) => {
        let newEntry = {
            id: updateData.id,
            title: e.target.value,
            status: updateData.status ? true : false,
        };
        setUpdateData(newEntry);
    };

    // Update task
    const updateTask = () => {
        let filterRecords = [...toDo].filter(
            (task) => task.id !== updateData.id
        );
        let updatedObject = [...filterRecords, updateData];
        setToDo(updatedObject);
        setUpdateData("");
    };

    if (data === null) return <div></div>;

    return (
        <div className="container App">
            <Card style={{ width: "100%" }}>
                <Card.Body>
                    <Card.Title>{data.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                        Created by: <strong> {data.created_by.username}</strong>
                    </Card.Subtitle>
                    <Card.Text>{data.description}</Card.Text>
                </Card.Body>
            </Card>
            <br />
            <br />
            <h2>Tasks</h2>

            {updateData && updateData ? (
                <UpdateForm
                    updateData={updateData}
                    changeTask={changeTask}
                    updateTask={updateTask}
                    cancelUpdate={cancelUpdate}
                />
            ) : (
                <AddTaskForm
                    newTask={newTask}
                    setNewTask={setNewTask}
                    addTask={addTask}
                />
            )}

            {toDo && toDo.length > 0 ? "" : "No Tasks..."}

            <ToDo
                toDo={toDo}
                markDone={markDone}
                updateData={updateData}
                setUpdateData={setUpdateData}
                deleteTask={deleteTask}
                members={data?.team?.members}
            />
        </div>
    );
}

export default Projects;
