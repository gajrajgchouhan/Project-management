import Card from 'react-bootstrap/Card';

function ProjectDescription() {
  return (
    <Card style={{ width: '100%' }}>
      <Card.Body>
        <Card.Title>Project Name</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Created by:</Card.Subtitle>
        <Card.Text>
          Description of the project..
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ProjectDescription;