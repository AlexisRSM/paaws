import React, { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { useAPI } from './Context/Context';
import CheckoutButton from '../components/CheckoutButton';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';


function SponsorPage() {

  // This is only a test page, I am already tired -RM
  const { getAnimal, user } = useAPI()
  const { id } = useParams();
  const [animal, setAnimal] = useState(null);
  console.log("I am user object on sponsor page", user)
  // Load your publishable key from the environment variables
  const publishableKey = import.meta.env.VITE_PUBLISHABLE_KEY;
  const stripePromise = loadStripe('publishableKey');


  const [key, setKey] = useState('subscription');

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

  console.log("I am ANIMAL OBJECT AFTER FETCH in sponsor page:", animal);

  return (
    <Tabs
      style={{ justifyContent: "center", marginTop: "2rem" }}
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="subscription" title="Monthly">
        <div style={{ padding: '1rem' }}>
          <h3>Monthly subscription</h3>
          <p>Support this animal with a monthly donation.</p>
          <CheckoutButton userinfo={user} animalinfo={animal} typeOfSponsorship={key} />
        </div>
      </Tab>
      <Tab eventKey="checkout" title="One-time">
        <div style={{ padding: '1rem' }}>
          <h3>One-time payment</h3>
          <p>Support this animal with a one-time donation.</p>
          <CheckoutButton userinfo={user} animalinfo={animal} typeOfSponsorship={key} />
        </div>
      </Tab>
    </Tabs>
  );
}

export default SponsorPage;