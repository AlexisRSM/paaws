import React from 'react';
import successGif from '../../images/gifs/theyseemerollingacato.gif';


const SuccessPage = () => {
    const backgroundStyle = {
        backgroundImage: `url(${successGif})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
        textAlign: 'center',
        flexDirection: 'column'
    };

    return (
        <div style={backgroundStyle}>
            <h1>Payment Successful</h1>
            <p>Your payment was successful. Thank you for your purchase!</p>
        </div>
    );
}
//do not delete this its for stripe DO not delete!
export default SuccessPage;
