import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

function ConsentForm({ onSubmit }) {
    const [consent, setConsent] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false); // State to control visibility
    const [isLoading, setIsLoading] = useState(false); // State to show loading message

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true); // Hide the button after it's clicked
        setIsLoading(true); // Show loading message
        onSubmit({
            consent
        });
    };

    return (
        <Container className="container">
            <h3>Consent Form</h3>
            <Form onSubmit={handleSubmit}>

                <Form.Group controlId="formContentWithLife">
                    <Form.Label>We'd love to share your response to 'What will you do in the last 24 hours of life?' in a special gallery with other participants' choices. It would add a unique voice to the collection and inspire others to think deeply about this question. Do you consent to us including your response?</Form.Label>
                    <Form.Control
                        as="select"
                        value={consent}
                        className="input-field"
                        onChange={(e) => setConsent(e.target.value)}
                    >
                        <option value="">Select...</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </Form.Control>
                </Form.Group>

                {!isSubmitted && (
                    <Button
                        className="submit-button"
                        type="submit"
                    >
                        Submit
                    </Button>
                )}
                {isLoading && (
                    <p>Please wait...</p>
                )}
            </Form>
        </Container>
    );
}

export default ConsentForm;
