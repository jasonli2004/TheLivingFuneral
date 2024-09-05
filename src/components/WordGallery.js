import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './WordGallery.css';

const WordGallery = () => {
    const navigate = useNavigate();
    const [lines, setLines] = useState([]);

    useEffect(() => {
        // Fetch data from the server when the component is mounted
        fetch('http://localhost:5001/get-answers') // Adjust the URL if your backend is running on a different port or server
            .then((response) => response.json())
            .then((data) => setLines(data))
            .catch((error) => console.error('Error fetching the lines:', error));
    }, []);

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
                {/* Render fetched answers if available, otherwise display hardcoded answers */}
                {(lines.length > 0 ? lines : hardcodedAnswers).map((answer, index) => (
                    <div key={index} className={`answer-card card-${index % 4}`}>
                        <p>{answer}</p>
                    </div>
                ))}
            </div>
            <div className="background-animation"></div>
            <img
                src="left-arrow.png"
                alt="Return"
                className="return-button"
                onClick={handleReturn}
            />
        </div>
    );
};

export default WordGallery;
