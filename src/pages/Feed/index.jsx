
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {allProjects} from '../Projects/index.js';
const Feed = () => {
  const results = [];
  allProjects.forEach((p, index) => {
    results.push(
      <div key={index}>
        <h2>name: {p.name}</h2>
        <hr />
      </div>,
    );
  });

  return (
    {allProjects.map((p, index) => {
        return (
          <div key={index}>
            <h2>name: {p.name}</h2>
            <h2>country: {employee.country}</h2>
            <Container>
              <Row>
                <Col>{p.name} added to the project list</Col>
              </Row>
            </Container>
            <hr />
          </div>
        );
      })}
  );
};
  
export default Feed;
