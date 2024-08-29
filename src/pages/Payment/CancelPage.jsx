import React from 'react';
import unsuccessGif from '../../images/gifs/paymentcancelcat.gif';


const CancelPage = () => {
    const backgroundStyle = {
        backgroundImage: `url(${unsuccessGif})`,
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
        <>
            <div style={backgroundStyle}>
                <h1>Payment Cancelled</h1>
                <p>You have cancelled your payment. Feel free to continue browsing our site.</p>
            </div>
        </>
    );
}
//do not delete its for stripe do not!
export default CancelPage;
