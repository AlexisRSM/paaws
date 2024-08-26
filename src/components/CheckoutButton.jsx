import React, { useState } from 'react';
import axios from 'axios';

const CheckoutButton = () => {
    // State to hold the amount
    const [amount, setAmount] = useState('');

    const handleCheckout = async () => {
        try {
            // Validate the amount or convert it to the proper format if necessary
            const validAmount = parseInt(amount, 10);
            if (isNaN(validAmount) || validAmount <= 0) {
                alert('Please enter a valid amount.');
                return;
            }

            const response = await axios.post('http://localhost:3000/create-checkout-session', {
                amount: validAmount,  // Sending amount to the backend
                user_id: '11',
                animal_id: '30',
                sponsorship_amount: '30',
                sponsorship_date: 26082024
            });
            console.log("I am data in button checkout", response.data.url);
            window.location.href = response.data.url; // Redirect to Stripe's hosted checkout page
        } catch (error) {
            console.error('Error:', error);
            alert('There was an issue with your checkout.');
        }
    };

    return (
        <div>
            <input
                type="number"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder="Enter amount"
            />
            <button onClick={handleCheckout}>Go to Checkout</button>
        </div>
    );
}

export default CheckoutButton;
