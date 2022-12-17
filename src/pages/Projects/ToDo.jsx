import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleCheck, faPen, faTrashCan
} from '@fortawesome/free-solid-svg-icons'

const ToDo = ({ toDo, markDone, setUpdateData, deleteTask }) => {
  return (
    <>
      {toDo && toDo
        .sort((a, b) => a.id > b.id ? 1 : -1)
        .map((task, index) => {
          return (
            <React.Fragment key={task.id}>
              <div className="col taskBg">
                <div className={task.status ? 'done' : ''}>
                  <span className="taskNumber">{index + 1}</span>
                  <span className="taskText">{task.title}</span>
                </div>
                <span className='assignment'>Created by: &nbsp;&nbsp;&nbsp;&nbsp; User1</span>
                <br></br>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                  <Form.Label column sm="2" id='assigned'>
                    Assigned to:
                  </Form.Label>
                  <Col sm="8">
                    <Form.Select aria-label="Choose collaborator" >
                      <option>Choose collaborator</option>
                      <option value="1">User1</option>
                      <option value="2">User2</option>
                      <option value="3">User3</option>
                    </Form.Select>
                  </Col>
                </Form.Group>
                <div className="iconsWrap">
                  <span title="Completed / Not Completed"
                    onClick={(e) => markDone(task.id)}
                  >
                    <FontAwesomeIcon icon={faCircleCheck} />
                  </span>

                  {task.status ? null : (
                    <span title="Edit"
                      onClick={() => setUpdateData({
                        id: task.id,
                        title: task.title,
                        status: task.status ? true : false
                      })}
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </span>
                  )}

                  <span title="Delete"
                    onClick={() => deleteTask(task.id)}
                  >
                    <FontAwesomeIcon icon={faTrashCan} />
                  </span>
                </div>
              </div>
            </React.Fragment>
          )
        })
      }
    </>
  )
}

export default ToDo;