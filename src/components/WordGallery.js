import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WordGallery.css';

const WordGallery = () => {
    const navigate = useNavigate();

    const handleReturn = () => {
        navigate('/');
    };

    const hardcodedAnswers = [
        "Spend time with loved ones",
        "Travel to a place I've always wanted to visit",
        "Write letters to my family and friends",
        "Eat my favorite foods",
        "Watch the sunrise or sunset",
        "Go on a hot air balloon ride",
        "Learn to play a new instrument",
        "Have a picnic in a beautiful park",
        "Go skydiving",
        "Take a relaxing bath",
        "Read a book I've been meaning to read",
        "Watch my favorite movie",
        "Listen to my favorite music",
        "Take a nap in a hammock",
        "Go on a hike",
        "Have a meaningful conversation with someone",
        "Learn a new skill or hobby",
        "Give back to the community",
        "Attend a music festival",
        "Go to a comedy club",
        "Try a new cuisine",
    ];

    return (
        <div className="word-gallery-container">
            <h2>What Will You Do in the Last 24 Hours of Your Life?</h2>
            <div className="answers-container">
                {hardcodedAnswers.map((answer, index) => (
                    <div key={index} className={`answer-card card-${index % 4}`}>
                        <p>{answer}</p>
                    </div>
                ))}
            </div>
            <div className="background-animation"></div>
            <button className="return-button" onClick={handleReturn}>Return to Home</button>
        </div>
    );
};

export default WordGallery;
