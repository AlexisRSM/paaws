import React, { useState } from 'react';
import { useAPI } from '../Context/Context';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
//maybe change input text to center later
//its working missing to lock routes 

function AdminDelete() {
  const [animalId, setAnimalId] = useState('');
  const [animalData, setAnimalData] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { getAnimal, deleteAnimal } = useAPI();

  const handleFetchAnimal = async () => {
    if (animalId) {
      try {
        const data = await getAnimal(animalId);
        //kiling bugs
        console.log(data)
        setAnimalData(data);
        setError('');
      } catch (error) {
        setAnimalData(null);
        setError(`Error fetching animal with ID ${animalId}: ${error.message} Please Try Again`);
      }
    }
  };

  const handleDeleteAnimal = async () => {
    if (animalId) {
      try {
        await deleteAnimal(animalId);
        setAnimalData(null);
        setError('');
        alert(`Animal with ID ${animalId} deleted successfully.`);
      } catch (error) {
        setError(`Error deleting animal with ID ${animalId}: ${error.message}`);
      }
    }
  };

  const navigateToEdit = () => {
    if (animalData) {
      navigate('/adminedit', { state: { animalData } });
    } else {
      alert('No animal data available. Please fetch an animal first.');
    }
  };

  return (
    <>
      <div className='container'>
        <div className='row justify-content-center py-3'>
          <div className='col-md-6'>
            <input
              type="number"
              className='form-control mb-2'
              placeholder="Enter animal ID"
              value={animalId}
              onChange={(e) => setAnimalId(e.target.value)}
            />
            <button
              className='btn btn-primary w-100'
              onClick={handleFetchAnimal}
            >
              Search
            </button>
          </div>
        </div>

        {animalData && (
          <div className='row justify-content-center py-3'>
            <div className='col-md-6'>
              <Carousel className='d-flex justify-content-center'>
                {animalData.images.map((image, index) => (
                  <Carousel.Item key={image.id}>
                    <img
                      className="d-block w-100"
                      src={image.image_url}
                      alt={`Image ${index + 1}`}
                      style={{ height: '300px', objectFit: 'contain' }}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>

              <div className="animalData mt-3">
                <p>ID: {animalData.id}</p>
                <p>Name: {animalData.name}</p>
                <p>Species: {animalData.species}</p>
                <p>Gender: {animalData.gender}</p>
                <p>Life stage: {animalData.life_stage}</p>
                <p>Weight: {animalData.weight}</p>
                <p>Breed: {animalData.breed}</p>
                <p>Location: {animalData.location}</p> {/* fixed */}
                <p>Known illnesses: {animalData.known_illness || 'NA'}</p>
                <p>Adoption status: {animalData.adoption_status || 'NA'}</p>
                <p>Description: {animalData.description || 'NA'}</p>
              </div>
            </div>
          </div>
        )}

        <div className='row justify-content-center py-2'>
          <div className='col-md-6 d-flex justify-content-between'>
            <button
              className='btn btn-danger py-2 px-2'
              onClick={handleDeleteAnimal}
            >
              Delete animal
            </button>
            <Button href="/adminpage" variant="outline-secondary">
              Return
            </Button>
            <button
              className='btn btn-warning py-2 px-2'
              onClick={navigateToEdit}
            >
              Want to Edit Instead?
            </button>
          </div>
        </div>

        {error && <p className='text-danger text-center'>{error}</p>}
      </div>
    </>
  );
}

export default AdminDelete;