// Linked from AnimalSearch, should feature more details about the pet (and if we do add a cap, if donations are closed)

// Section below leading to adoption form

import { Link, useParams } from 'react-router-dom';
import { useAPI } from './Context/Context'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//By RM
import { useEffect, useState } from 'react';

function AnimalPage() {
  /* console.log("I am animal prop", animal) */

  const { getAnimal } = useAPI()
  const { id } = useParams();
  console.log("I am id ", id)
  /*  console.log("I am animal object in animal page", animal) */
  const [animal, setAnimal] = useState(null); // State to store the animal data

  useEffect(() => {
    // Fetch the animal data using the id
    const fetchAnimal = async () => {
      try {
        const fetchedAnimal = await getAnimal(id);
        setAnimal(fetchedAnimal);
      } catch (error) {
        console.error('Error fetching animal:', error);
      }
    };

    fetchAnimal();
  }, [id, getAnimal]);

  //killing bugs
  console.log("I am ANIMAL OBJECT AFTER FETCH:", animal);

  if (!animal) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Card className='animalPage' key={animal}>
        <Row>
          <Col lg="5" >
            <Card.Img className="animalPageImg" variant="top" src={animal.images[0].image_url}
              alt="animal picture" />
          </Col>
          <Col lg="7" >
            <Card.Body className='animalPageDesc'>
              <Card.Title>{animal.name || "Unknown Animal"}</Card.Title>
              <Card.Text>
                Species: {animal.species || "Unknown"} <br />
                Gender: {animal.gender || "Unknown"} <br />
                Age: {animal.life_stage || "Unknown"} <br />
                Weight: {`${animal.weight} kg` || "Unknown"}<br />
                Breed: {animal.breed || "Unknown"}<br />
                Location: {animal.location || "Unknown"}<br />
                Known illnesses: {animal.known_illness || "Unknown"}<br />
                Description: {animal.description || "Unknown"}
              </Card.Text>
              <div className="animalPageBtn">
                <Link to={`/sponsor/${animal.id}`} >
                  <Button className='primaryButton' style={{ margin: "1rem" }}>
                    Sponsor
                  </Button>
                </Link>
                <Link to="/ourpets" >
                  <Button className='tertiaryButton'>
                    Return
                  </Button>
                </Link>
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>

      {/* link to adoption form */}

      <div className="toAdoptionForm">
        <h4>Interested in adopting instead?</h4>
        <p>Check out our <Link to={`/adoptionform/${animal.id}`} >form</Link></p>
      </div>
    </>
  );
}

export default AnimalPage;