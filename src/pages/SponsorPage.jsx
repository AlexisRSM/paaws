import React, { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { useAPI } from './Context/Context';
import CheckoutButton from '../components/CheckoutButton';

function SponsorPage() {

  // This is only a test page, I am already tired -RM

  // Load your publishable key from the environment variables
  const publishableKey = import.meta.env.VITE_PUBLISHABLE_KEY;
  const stripePromise = loadStripe('pk_test_51PpLYtIZE8iI5Xv6223PXSNVJKFJVgctliIQyi9w5fWQYFvswR6JOX8m76glrAuTMri6evVlnGOKYaa0pw69Jp4A00LvdG6UQO');

  // Destructure the API functions and user state from the context
  const { createOneTimePaymentSession, createSubscriptionSession, user } = useAPI();

  const [key, setKey] = useState('monthly');

  // The button component to handle Stripe payment
  const SponsorButton = ({ animalId, amount, type }) => {
    const handleClick = async () => {
      const stripe = await stripePromise;


      try {

        // Use the context function to create a Stripe session
        const response = type === 'one-time'
          ? await createOneTimePaymentSession({ animal_id: animalId, sponsorship_amount: amount })
          : await createSubscriptionSession({ animal_id: animalId, sponsorship_amount: amount });

        const sessionId = response.sessionId;
        console.log("sessionid", sessionId)

        // Redirect to Stripe Checkout
        const { error } = await stripe.redirectToCheckout({
          sessionId: sessionId,
        });

        if (error) {
          console.error('Stripe error:', error);
        }
      } catch (error) {
        console.error('Error creating Stripe session:', error);
      }
    };

    return (
      <>

        <button onClick={handleClick}>
          {type === 'one-time' ? 'Sponsor Once' : 'Sponsor Monthly'}
        </button>

      </>
    );
  };

  return (
    <Tabs
      style={{ justifyContent: "center", marginTop: "2rem" }}
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="monthly" title="Monthly">
        <div style={{ padding: '1rem' }}>
          <h3>Monthly subscription</h3>
          <p>Support this animal with a monthly donation.</p>
          <SponsorButton animalId="123" amount="10.00" type="monthly" />
        </div>
      </Tab>
      <Tab eventKey="onetime" title="One-time">
        <div style={{ padding: '1rem' }}>
          <h3>One-time payment</h3>
          <p>Support this animal with a one-time donation.</p>
          <SponsorButton animalId="123" amount="50.00" type="one-time" />
        </div>

        {/* Test */}
        <p>Test</p>
        <CheckoutButton>!</CheckoutButton>
        <p>Test</p>
      </Tab>
    </Tabs>
  );
}

export default SponsorPage;