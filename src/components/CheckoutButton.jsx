import React, { useState } from 'react';
import axios from 'axios';


const CheckoutButton = ({ userinfo, animalinfo }) => {

    // Ensure that userinfo and animalinfo are available
    /*  if (!userinfo || !animalinfo) {
        alert('User or animal information is missing.');
        return;
    } */

    console.log("I am user info and animal info in sponsor button", userinfo, animalinfo)
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

            // Ensure userinfo and animalinfo are provided
            if (!userinfo || !animalinfo) {
                alert('User or animal information is missing.');
                return;
            }

            // Send the request to your backend
            const response = await axios.post('https://961mfdzq-3000.uks1.devtunnels.ms/create-checkout-session', {
                amount: validAmount,
                user_id: userinfo.id,  // Assuming userinfo has an 'id' property
                animal_id: animalinfo.id  // Assuming animalinfo has an 'id' property
            });

            console.log("Checkout session URL:", response.data.url);
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
