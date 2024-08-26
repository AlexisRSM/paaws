// General Admin Page to more easily route towards adding, editing, deleting and handling adoption processes

import Row  from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from 'react-bootstrap/Card';
import Button  from "react-bootstrap/Button";

function AdminPage() {
    return ( <>
        <Row >
            <Col lg="4" >
                <Card style={{ width: "18rem", height: "14rem"}}>
                <Card.Body>
                    <Card.Title>Add animal</Card.Title>
                    <Card.Text>
                    Form to add new animal to the API.
                    </Card.Text>
                    <Button href="/adminadd">Add</Button>
                </Card.Body>
                </Card>            
            </Col>
            <Col lg="4" >
                <Card style={{ width: "18rem", height: "14rem"}}>
                <Card.Body>
                    <Card.Title>Edit or delete animal</Card.Title>
                    <Card.Text>
                    Form to edit or delete an animal from the API.
                    </Card.Text>
                    <Button href="/admindelete">Edit</Button>
                </Card.Body>
                </Card>            
            </Col>
            <Col lg="4">
                <Card style={{ width: "18rem", height: "14rem"}}>
                <Card.Body>
                    <Card.Title>Edit adoption status</Card.Title>
                    <Card.Text>
                    Form to edit adoption status of an animal.
                    </Card.Text>
                    <Button href="/adoptionstatus">Edit</Button>
                </Card.Body>
                </Card>            
            </Col>
        </Row>
    
    </> );
}

export default AdminPage;