import React, { useState } from 'react';
import { Container } from 'react-bootstrap';

function ButtonForm({ onSubmit }) {
    const [isSubmitted, setIsSubmitted] = useState(false); // State to control visibility

    const handleSubmit = () => {
        setIsSubmitted(true);
        onSubmit({});
    };

    return (
        <Container className="container">
            {!isSubmitted && ( // Only render the button if isSubmitted is false
                <button className="continue-button"
                    onClick={handleSubmit}
                >
                    Continue
                </button>
            )}
        </Container>
    );
}

export default ButtonForm;
