import React from "react";
import { useState } from "react";
import AddTaskForm from "./AddTaskForm.jsx";
import UpdateForm from "./UpdateForm.jsx";
import ToDo from "./ToDo.jsx";
import "./proj.css";
import Table from 'react-bootstrap/Table';
import CreateProject from "./createProject.js";
import ProjectDescription from "./descriptionCard.js";

const Projects = () => {
    // Tasks (ToDo List) State
    const [toDo, setToDo] = useState([]);

    // Temp State
    const [newTask, setNewTask] = useState("");
    const [updateData, setUpdateData] = useState("");

    // Add task
    ///////////////////////////
    const addTask = () => {
        if (newTask) {
            let num = toDo.length + 1;
            let newEntry = { id: num, title: newTask, status: false };
            setToDo([...toDo, newEntry]);
            setNewTask("");
        }
    };

    // Delete task
    ///////////////////////////
    const deleteTask = (id) => {
        let newTasks = toDo.filter((task) => task.id !== id);
        setToDo(newTasks);
    };

    // Mark task as done or completed
    ///////////////////////////
    const markDone = (id) => {
        let newTask = toDo.map((task) => {
            if (task.id === id) {
                return { ...task, status: !task.status };
            }
            return task;
        });
        setToDo(newTask);
    };

    // Cancel update
    ///////////////////////////
    const cancelUpdate = () => {
        setUpdateData("");
    };

    // Change task for update
    ///////////////////////////
    const changeTask = (e) => {
        let newEntry = {
            id: updateData.id,
            title: e.target.value,
            status: updateData.status ? true : false,
        };
        setUpdateData(newEntry);
    };

    // Update task
    ///////////////////////////
    const updateTask = () => {
        let filterRecords = [...toDo].filter(
            (task) => task.id !== updateData.id
        );
        let updatedObject = [...filterRecords, updateData];
        setToDo(updatedObject);
        setUpdateData("");
    };

    return (
        <>

            <div className="flexbox-container">
                <div className="sidebar" >
            <CreateProject/>
            <br></br><br></br>
                <Table className="table" striped bordered hover >
      <thead>
        <tr>
          <th>#</th>
          <th>Project</th>
          
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>1st project</td>
          
        </tr>
        <tr>
          <td>2</td>
          <td>2nd Project</td>
          
        </tr>
        
      </tbody>
    </Table>
                </div>
                <div className="main" >
                    <div className="container App">

                        <ProjectDescription/>
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

                        {/* Display ToDos */}

                        {toDo && toDo.length ? "" : "No Tasks..."}

                        <ToDo
                            toDo={toDo}
                            markDone={markDone}
                            setUpdateData={setUpdateData}
                            deleteTask={deleteTask}
                        />
                    </div>
                </div>
            </div></>
    );
};

export default Projects;
