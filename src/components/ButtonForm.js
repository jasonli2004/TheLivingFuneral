import React, { useState } from 'react';
import { Container } from 'react-bootstrap';

function ButtonForm({ onSubmit }) {
    const [isSubmitted, setIsSubmitted] = useState(false); // State to control visibility

    const handleSubmit = () => {
        setIsSubmitted(true);
        onSubmit({});
    };

    return (
        !isSubmitted && ( // Only render the container if isSubmitted is false
            <Container className="container">
                <button className="continue-button"
                    onClick={handleSubmit}
                >
                    Continue
                </button>
            </Container>
        )
    );
}

export default ButtonForm;
