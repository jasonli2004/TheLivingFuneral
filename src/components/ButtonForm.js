import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';

function ButtonForm({ onSubmit }) {
    const [isSubmitted, setIsSubmitted] = useState(false); // State to control visibility

    const handleSubmit = () => {
        setIsSubmitted(true);
        onSubmit({});
    };

    return (
        <Container className="container">
            <button class="continue-button"
                onClick={handleSubmit}
            >
                Continue
            </button >
        </Container>
    );
}

export default ButtonForm;
