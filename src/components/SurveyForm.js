import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';

function SurveyForm({ onSubmit }) {
    const [funeralDate, setFuneralDate] = useState('');
    const [weather, setWeather] = useState('');
    const [age, setAge] = useState('');
    const [favoriteNumber, setFavoriteNumber] = useState('');
    const [quote, setQuote] = useState('');
    const [natureElement, setNatureElement] = useState('');
    const [representativeObject, setRepresentativeObject] = useState('');
    const [hobby, setHobby] = useState('');
    const [contentWithLife, setContentWithLife] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        setIsLoading(true);
        setShowAlert(true);

        setTimeout(() => {
            setShowAlert(false);
        }, 30000);

        onSubmit({
            funeralDate,
            weather,
            age,
            favoriteNumber,
            quote,
            natureElement,
            representativeObject,
            hobby,
            contentWithLife
        });
    };

    return (
        <div>  {showAlert && (
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                zIndex: 9999,
                textAlign: 'center',
                backgroundColor: '#f8d7da',
                color: '#721c24',
                padding: '10px',
                border: '1px solid #f5c6cb',
                borderRadius: '4px',
            }}>
                Loading... this might take around 30 seconds.
            </div>
        )}
            <Container className="container">
                <h3>Survey Form</h3>


                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formFuneralDate">
                        <Form.Label>Funeral Date:</Form.Label>
                        <Form.Control
                            type="date"
                            className="input-field"
                            value={funeralDate}
                            onChange={(e) => setFuneralDate(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formWeather">
                        <Form.Label>Preferred Weather on Funeral Date:</Form.Label>
                        <Form.Control
                            type="text"
                            className="input-field"
                            placeholder="Enter the weather"
                            value={weather}
                            onChange={(e) => setWeather(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formAge">
                        <Form.Label>Your Age:</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter your age"
                            value={age}
                            className="input-field"
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formFavoriteNumber">
                        <Form.Label>Your Favorite Number:</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter your favorite number"
                            value={favoriteNumber}
                            className="input-field"
                            onChange={(e) => setFavoriteNumber(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formQuote">
                        <Form.Label>A Quote to deliver:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your favorite quote"
                            value={quote}
                            className="input-field"
                            onChange={(e) => setQuote(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formNatureElement">
                        <Form.Label>Your Preferred Nature Element:</Form.Label>
                        <Form.Control
                            as="select"
                            value={natureElement}
                            className="input-field"
                            onChange={(e) => setNatureElement(e.target.value)}
                        >
                            <option value="">Select...</option>
                            <option value="Wind">Wind</option>
                            <option value="Water">Water</option>
                            <option value="Fire">Fire</option>
                            <option value="Earth">Earth</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formRepresentativeObject">
                        <Form.Label>Your Representative Object:</Form.Label>
                        <Form.Control
                            type="text"
                            className="input-field"
                            placeholder="object that represents you"
                            value={representativeObject}
                            onChange={(e) => setRepresentativeObject(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formHobby">
                        <Form.Label>Your Favorite Hobby:</Form.Label>
                        <Form.Control
                            type="text"
                            className="input-field"
                            placeholder="Enter your favorite hobby"
                            value={hobby}
                            onChange={(e) => setHobby(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formContentWithLife">
                        <Form.Label>Are You Content with Your Life?:</Form.Label>
                        <Form.Control
                            as="select"
                            value={contentWithLife}
                            className="input-field"
                            onChange={(e) => setContentWithLife(e.target.value)}
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
        </div>
    );
}

export default SurveyForm;
