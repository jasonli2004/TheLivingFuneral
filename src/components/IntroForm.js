import React, { useState } from 'react';
import { Container } from 'react-bootstrap';

function IntroForm({ onSubmit }) {
    const [name, setName] = useState('');
    const [pronoun, setPronoun] = useState('');
    const [p1, setP1] = useState('');
    const [p2, setP2] = useState('');
    const [p3, setP3] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false); // State to control visibility


    const handlePronounChange = (selectedPronoun) => {
        setPronoun(selectedPronoun);
        if (selectedPronoun === 'he') {
            setP1('he');
            setP2('his');
            setP3('him');
        } else if (selectedPronoun === 'she') {
            setP1('she');
            setP2('her');
            setP3('her');
        } else if (selectedPronoun === 'they') {
            setP1('they');
            setP2('their');
            setP3('them');
        } else {
            setP1('');
            setP2('');
            setP3('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);

        onSubmit({ name, pronoun, p1, p2, p3 });
    };

    return (
        <Container className="container">
            <h3>What's your name?</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Enter your preferred first name:</label>
                    <input
                        type="text"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="input-field"
                    />
                </div>

                <div className="form-group">
                    <label>Select your pronoun:</label>
                    <div className="pronoun-options">
                        <span
                            className={`pronoun-option ${pronoun === 'he' ? 'selected' : ''}`}
                            onClick={() => handlePronounChange('he')}
                        >
                            He/Him
                        </span>
                        <span
                            className={`pronoun-option ${pronoun === 'she' ? 'selected' : ''}`}
                            onClick={() => handlePronounChange('she')}
                        >
                            She/Her
                        </span>
                        <span
                            className={`pronoun-option ${pronoun === 'they' ? 'selected' : ''}`}
                            onClick={() => handlePronounChange('they')}
                        >
                            They/Them
                        </span>
                    </div>
                </div>

                {!isSubmitted && ( // Button will only show if the form is not submitted
                    <button
                        className="submit-button"
                        type="submit"
                    >
                        Submit
                    </button>
                )}
            </form>
        </Container>
    );
}

export default IntroForm;
