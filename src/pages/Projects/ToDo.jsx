import React from "react";
import Form from "react-bootstrap/Form";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleCheck,
    faPen,
    faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

const ChooseUser = ({ members, assigned_to }) => {
    const [selected, setSelected] = useState(assigned_to);
    return (
        <Form.Select
            value={selected}
            aria-label="Choose collaborator"
            disabled={false}
            onChange={(e) => setSelected(e.target.value)}
        >
            <option>{assigned_to}</option>
            {members.map((member) => {
                return <option>{member.username}</option>;
            })}
        </Form.Select>
    );
};

const ToDo = ({ toDo, markDone, setUpdateData, updateData, members }) => {
    console.log("TODO", toDo);
    return (
        toDo &&
        toDo
            .sort((a, b) =>
                new Date(a.updatedAt) < new Date(b.updatedAt) ? 1 : -1
            )
            .map((task, index) => {
                return (
                    <React.Fragment key={task.id}>
                        <div className="col taskBg">
                            <div className={task.complete ? "done" : ""}>
                                <span className="taskNumber">{index + 1}</span>
                                <span className="taskText">{task.name}</span>
                            </div>
                            <span className="assignment">
                                Created by: &nbsp;&nbsp;&nbsp;&nbsp;
                                {task.created_by.username}
                            </span>
                            <br></br>
                            <span className="assignment">
                                {updateData ? (
                                    <ChooseUser
                                        {...{
                                            members,
                                            assigned_to:
                                                task.assigned_to?.username,
                                        }}
                                    />
                                ) : (
                                    <span>
                                        Assigned to: &nbsp;&nbsp;&nbsp;&nbsp;
                                        {task.assigned_to?.username}
                                    </span>
                                )}
                            </span>

                            <div className="iconsWrap">
                                <span
                                    title="Completed / Not Completed"
                                    onClick={(e) => markDone(task._id, index)}
                                >
                                    <FontAwesomeIcon icon={faCircleCheck} />
                                </span>

                                {task.complete ? null : (
                                    <span
                                        title="Edit"
                                        onClick={() => setUpdateData(true)}
                                    >
                                        <FontAwesomeIcon icon={faPen} />
                                    </span>
                                )}
                            </div>
                        </div>
                    </React.Fragment>
                );
            })
    );
};

export default ToDo;
