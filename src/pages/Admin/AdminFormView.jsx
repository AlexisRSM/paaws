// Form with mandatory questions and user contact info

// Either the name of the animal (and ID/chip?) will be locked in from AnimalPage, or there should be the option to add both manually (maybe with Clear form button)

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAPI } from '../Context/Context';
import { useState, useEffect } from 'react';


//if we wanted we could use prop and avoid fetching
//but when someone goes directly to link it wont work ex:bookmark the form
function AdoptionFormView() {


  return (
    <>
      <Container fluid>
        
        <Row>
          <Col lg="6">
            <Card style={{ width: "60%", margin: "auto", marginTop: "1rem" }}>
              <Card.Body>
                <Card.Title>Name</Card.Title>
                <Card.Text>ID: </Card.Text>
                <Link to={`/animalpage/:id`} /* need to change this, but if I used ${animal.id} you wouldn't be able to see */ >
                  <Button className='primaryButton'>
                    More
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col lg="6">
            <Card style={{ width: "60%", margin: "auto", marginTop: "1rem" }}>
              <Card.Body>
                <Card.Title>Full name</Card.Title>
                <Card.Text>Email: </Card.Text>
                <Link to="/userprofile" >
                  <Button className='primaryButton'>
                    Profile
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>


        <Card style={{ width: "85%", margin: "auto", marginTop: "1rem"}}>
            <div style={{ display: "flex" }}>
                <div className="m-3" controlId="formBasicPhone" style={{ width: "50%" }}>
                <p>Phone number:</p>
                </div>
                <div className="m-3" controlId="formFirstTimeAdopting" style={{ width: "50%" }}>
                <p>Is this your first time having a pet?</p>
                <p className='answer'>{/* answer */}</p>
                </div>
            </div>

            <div className="m-3" controlId="formAlreadyHavePets">
              <p>Do you already have any pets currently? If so, how many?</p>
              <p className='answer'>{/* answer || "NA" */}</p>
            </div>

            <div className="m-3" controlId="formCurrentPetsDescription">
              <p>Please describe your current pets in detail.</p>
              <p className='answer'>{/* answer || "NA" */}</p>
            </div>


          <div className="m-3" controlId="formInterestReason">
            <p>Why are you interested in this particular animal?</p>
            <p className='answer'>{/* answer */}</p>
          </div>

          <div className="m-3" controlId="formMetAnimal">
            <p>Do you plan to meet this animal before the adoption or have you already met them?</p>
            <p className='answer'>{/* answer */}</p>
          </div>

          <div className="m-3" controlId="formSpaceForPlay">
            <p>Will the animal have space to play/be entertained?</p>
            <p className='answer'>{/* answer */}</p>
          </div>

          <div className="m-3" controlId="formVetBills">
            <p>Will you be able to front initial vet bills, like neutering, as per the shelter's stipulations?</p>
            <p className='answer'>{/* answer */}</p>
          </div>

          <Link to="/adoptionstatus">
            <Button className='tertiaryButton'>
                Return
            </Button>
          </Link>
        </Card>
      </Container>
    </>
  );
}

export default AdoptionFormView;