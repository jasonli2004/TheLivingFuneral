import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IntroForm from './components/IntroForm';
import ThreeWishesForm from './components/ThreeWishesForm';
import ChoiceForm from './components/ChoiceForm';
import Last24Form from './components/Last24Form';
import ButtonForm from './components/ButtonForm';
import SurveyForm from './components/SurveyForm';
import BrowserComponent from './components/BrowserComponent';
import LastWordsForm from './components/LastWordsForm';
import ThankYouComponent from './components/ThankYou';
import './App.css';
import { getChatCompletion } from './openaiService';  // Import the function
import { Container } from 'react-bootstrap';
import ConsentForm from './components/ConsentForm';
import Timer from './components/Timer';

function App() {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [backgroundAudio, setBackgroundAudio] = useState(null);
  const [tickAudio, setTickAudio] = useState(null);
  const [userData, setUserData] = useState({});
  const [scriptAudio, setScriptAudio] = useState(null);
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    initAudio(); // Initialize audio on page load
  }, []);

  const handleNextStep = async (data) => {
    const newUserData = { ...userData, ...data }; // Merge current data with new data
    setUserData(newUserData); // Update the state

    if (step === 1) {
      await generateAndPlayAudio(
        `Hi, ${newUserData.name}, it’s a pleasure to meet you. To know you a little better, I want you to think about your whole life till this very moment, what do you consider to be the three most important things in your life? Go ahead and enter your answers.`,
        "three.mp3"
      );
    } else if (step === 2) {
      await playAudio("choice.mp3");
    } else if (step === 3) {
      const choiceAudioText = newUserData.choice === 'die'
        ? `You chose to die tomorrow. Although this is quite unlikely, but You never know which will come first: your tomorrow, or your end..... We all gonna die. But, for you, ${newUserData.name}, you are going to die 'tomorrow'. Yes TOMORROW. Now you have 24 hours before you die tomorrow.`
        : `You chose to live forever. While living forever might seem desirable, the fact is that you can’t live forever, at least it’s not possible with the technology we have now. So death is inevitable, and you are going to die. And ${newUserData.name}, you are going to die 'Tomorrow'.`;
      await generateAndPlayAudio(choiceAudioText, newUserData.choice === 'die' ? "die.mp3" : "live.mp3");
      await playAudio("last.mp3");
    } else if (step === 4) {
      await playAudio('go.mp3');
    } else if (step === 5) {
      await generateAndPlayAudio(
        `${newUserData.name} passed away on November 19th, 2023. Now… the first stage of your death is completed.`,
        "passed.mp3"
      );
      await playAudio("survey.mp3");
    }
    else if (step === 6) {
      const prompt = `
I'm doing an interactive art project titled "The Living Funeral," which aims to simulate a funeral for a person who's still alive to provoke thoughts. Please write a 300-word, personalized, creative, and deeply touching eulogy using the following information about a participant. Use the favorite number section to randomly decide a random way for this person to die. Make the eulogy reflective of their life, values, and choices:
Name: ${newUserData.name}
Pronoun: ${newUserData.pronoun}
Three most important things in their life: ${newUserData.threeMostImportantThings}
A quote they want to deliver at their funeral: "${newUserData.quote}"
Age: ${newUserData.age}
Preferred funeral date: ${newUserData.funeralDate}
Preferred funeral weather: ${newUserData.weather}
Favorite number: ${newUserData.favoriteNumber}
A nature element they chose: ${newUserData.natureElement}
An object that represents them: ${newUserData.representativeObject}
Favorite hobby: ${newUserData.hobby}
Are they content with their life?: ${newUserData.contentWithLife}
Incorporate these elements creatively and make the eulogy deeply personal and touching. (no need for a title)
`;
      const result = await getChatCompletion(prompt);

      await generateAndPlayAudio(result, "eulogy.mp3");
      await playAudio("lastword.mp3");
    } else if (step === 7) {
      await playAudio("complete.mp3");
      await playAudio("thank.mp3");
      await playAudio("baby_cry.mp3");
    }
    else if (step === 8) {
      console.log(`${newUserData.consent}`);
    }

    setStep((prevStep) => prevStep + 1); // Move to the next step
  };

  const handleStart = () => {
    setStep(1);
  };

  const initAudio = () => {
    const bgAudio = new Audio('/audio/rain_short.mp3');
    bgAudio.loop = true;
    bgAudio.volume = 0.65;
    bgAudio.play().catch((error) => {
      console.error("Failed to play background audio:", error);
    });

    const tickAudio = new Audio('/audio/tick.mp3');
    tickAudio.loop = true;
    tickAudio.volume = 0.6;
    tickAudio.play().catch((error) => {
      console.error("Failed to play tick audio:", error);
    });

    setBackgroundAudio(bgAudio);
    setTickAudio(tickAudio);
    setIsPlaying(true);
  }

  const generateAndPlayAudio = async (textPrompt, fileName) => {
    try {
      const response = await axios.get('http://localhost:5001/generate-audio', {
        params: { text_prompt: textPrompt, file_name: fileName },
        responseType: 'blob'
      });

      if (response.status === 200) {
        const audioUrl = URL.createObjectURL(new Blob([response.data]));
        const newScriptAudio = new Audio(audioUrl);
        await playAudioInstance(newScriptAudio); // Play the audio and wait for it to finish
      } else {
        console.error("Failed to generate audio");
      }
    } catch (error) {
      console.error("Error generating audio:", error);
    }
  };

  const playAudio = async (fileName) => {
    const audio = new Audio(`/audio/${fileName}`);
    await playAudioInstance(audio); // Play the audio and wait for it to finish
  };

  const playAudioInstance = (audioInstance) => {
    return new Promise((resolve, reject) => {
      setScriptAudio(audioInstance);
      audioInstance.play().catch((error) => {
        console.error("Failed to play audio:", error);
        reject(error);
      });

      audioInstance.onended = () => {
        resolve();
      };
    });
  };

  useEffect(() => {
    // Clean up script audio when it finishes or component unmounts
    return () => {
      if (scriptAudio) {
        scriptAudio.pause();
        scriptAudio.currentTime = 0;
      }
      if (backgroundAudio) {
        backgroundAudio.pause();
        backgroundAudio.currentTime = 0;
      }
      if (tickAudio) {
        tickAudio.pause();
        tickAudio.currentTime = 0;
      }
    };
  }, [scriptAudio, backgroundAudio, tickAudio]);

  return (
    <div className="App">
      <p className='credit'>Video Credit: Mellow Psychedelic Journey - Calming & Beautiful, Good For You.</p>
      <div id="video-container">
        <iframe id="background-video" src="https://www.youtube.com/embed/ICmWwxaTmB8?autoplay=1&mute=1&loop=1&playlist=ICmWwxaTmB8&controls=0&disablekb=1&modestbranding=1&showinfo=0&rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
      </div>
      {step === 0 && (
        <Container>
          <h3>Welcome to The Living Funeral</h3>
          <button className="submit-button " onClick={handleStart}>
            Start
          </button>
        </Container>
      )}

      {(isPlaying || step !== 0) && (
        <>
          {step === 1 && <IntroForm onSubmit={handleNextStep} />}
          {step === 2 && <ThreeWishesForm onSubmit={handleNextStep} />}
          {step === 3 && <ChoiceForm onSubmit={handleNextStep} />}
          {step === 4 && <Last24Form onSubmit={handleNextStep} />}
          {step === 5 && <ButtonForm onSubmit={handleNextStep} />}
          {step === 6 && <SurveyForm onSubmit={handleNextStep} />}
          {step === 7 && <LastWordsForm onSubmit={handleNextStep} />}
          {step === 8 && <ConsentForm onSubmit={handleNextStep} />}

          {step === 9 && <ThankYouComponent onRestart={() => setStep(0)} />}
        </>
      )}
      <img src="favicon.ico" alt="logo" id="logo" />
      <Timer />  {/* Timer component will appear in the top right corner */}
    </div>
  );
}

export default App;
