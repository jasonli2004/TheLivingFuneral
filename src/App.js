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

function App() {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [backgroundAudio, setBackgroundAudio] = useState(null);
  const [userData, setUserData] = useState({});
  const [scriptAudio, setScriptAudio] = useState(null);

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


      // await generateAndPlayAudio(
      //   `Ladies and Gentlemen, on this ${newUserData.weather} morning of ${newUserData.funeralDate}, we gathered here to remember and celebrate the life of ${newUserData.name}, who touched the lives of so many. We come together in grief, acknowledging our human loss, but also in gratitude for the life that ${newUserData.p1} lived.`,
      //   "passed.mp3"
      // );
      // await play7Way();
      // await generateAndPlayAudio(
      //   `${newUserData.name} asked me to share a quote with you on this very special moment: the quote goes as this: ${newUserData.quote}`,
      //   'quote.mp3'
      // );
      // if (newUserData.natureElement === "Wind") {
      //   await generateAndPlayAudio(
      //     `If you think about ${newUserData.name} in the future, and decide to wander, know that ${newUserData.p1} will be nestled within nature's embrace, playfully peeking from the rustling leaves or dancing upon the sunlit streams.`,
      //     'wind.mp3'
      //   );
      // } else {
      //   await generateAndPlayAudio(
      //     `Dear friends and families, if you ever miss ${newUserData.name}, just seek out a ${newUserData.representativeObject}. No matter when and where, ${newUserData.name} will always be there for you, in the gentle echo of your laughter and the soft shadows of your memories.`,
      //     'object.mp3'
      //   );
      // }
      // await generateAndPlayAudio(
      //   `While ${newUserData.name} walked among us, ${userData.pronoun}'s favorite pastime was ${newUserData.hobby}, a pursuit that brought joy to ${newUserData.p2}'s days and light to those around ${newUserData.p3}.`,
      //   'hobby.mp3'
      // );
      // await playContent();
      // await generateAndPlayAudio(
      //   `As we draw this gathering to a close, let us hold in our hearts the essence of ${newUserData.name}, who now takes a new journey beyond our sight. May we find solace in the love ${newUserData.p1} shared, the paths ${newUserData.p1} walked alongside us, and the indelible mark ${newUserData.p1} left on our lives. In the tapestry of memory, ${newUserData.p1} remains an eternal thread, vibrant and strong. As we walk forth from this place, let each of us carry a spark of ${newUserData.p2} spirit, igniting it in acts of kindness, in laughter shared, and in moments of quiet reflection. ${newUserData.p2}'s story, though paused in the telling, continues within us all.`,
      //   "conclude.mp3"
      // );
      await playAudio("lastword.mp3");
    } else if (step === 7) {
      await playAudio("complete.mp3");
      await playAudio("thank.mp3");
      await playAudio("baby_cry.mp3");
    }

    setStep((prevStep) => prevStep + 1); // Move to the next step
  };

  const handleStart = () => {
    const bgAudio = new Audio('/audio/rain_short.mp3');
    bgAudio.loop = true;
    bgAudio.volume = 0.65;
    bgAudio.play().catch((error) => {
      console.error("Failed to play background audio:", error);
    });

    setBackgroundAudio(bgAudio);
    setIsPlaying(true);
    setStep(1);
  };

  const play7Way = async () => {
    const favoriteNumber = parseFloat(userData.favoriteNumber) % 6;

    switch (favoriteNumber) {
      case 1:
        playAudio('option1.mp3');
        break;
      case 2:
        playAudio('option2.mp3');
        break;
      case 3:
        await generateAndPlayAudio(
          `On the 19th of November, 2023, the wind that brought ${userData.name} to the world, brought ${userData.p3} away. ${userData.p1} escaped the earth successfully, free from the mortal tether.`,
          'option3.mp3'
        );
        break;
      case 4:
        await generateAndPlayAudio(
          `On the 19th of November, 2023, our dear friend ${userData.name}, was at the helm of ${userData.p2} cherished car, the hum of the engine a familiar comfort. Tragedy struck in an instant of unforeseen bravery—${userData.p1} departed from this life in a selfless act, veering away to protect a life just beginning, as a baby emerged onto the roadway. ${userData.p2}'s final act, one of instinctive compassion, leaves us in a wake of heartbreak and awe at the profound depth of ${userData.p2}'s character.`,
          'option4.mp3'
        );
        break;
      case 5:
        await generateAndPlayAudio(
          `On the 19th of November, 2023, our dear friend ${userData.name}, while descending the familiar staircase, met with an untimely fate. ${userData.p2}'s foot faltered, and ${userData.p2}'s journey ended in sudden stillness, leaving us to ponder the fragility of life with each step we take.`,
          'option5.mp3'
        );
        break;
      default:
        await generateAndPlayAudio(
          `On the 19th of November, 2023, our dear friend ${userData.name}, while embracing the azure embrace of the ocean, succumbed to its enigmatic depths. ${userData.p2}'s spirit, now unbound, swims with the currents of eternity, leaving us to navigate the tides of grief and memory in ${userData.p3}'s wake.`,
          'option6.mp3'
        );
        break;
    }
  };

  const playContent = async () => {
    const result = userData.contentWithLife;

    if (result === "Yes") {
      await generateAndPlayAudio(
        `Although ${userData.p1} never becomes the most famous or the wealthiest, ${userData.p1} pursued ${userData.p2}'s goals: ${userData.wish1}, ${userData.wish2}, ${userData.wish3}, with quiet dedication. The extent of ${userData.p2}'s progress on these paths may remain unknown to us, yet ${userData.p1} found richness in the simple pleasures of life. Content with ${userData.p2}'s lot, ${userData.p1} heartily embraced the joys of living, delighting in gastronomy and merriment, exploring the splendor of nature, and fostering deep bonds with a circle of steadfast and loyal friends.`,
        'happy.mp3'
      );
    } else {
      await generateAndPlayAudio(
        `A lot of people are always so busy…. busy drinking, busy making money, and busy having emotional crises. A lot of time passed in this busy way. However, ${userData.p1} carried within ${userData.p3} a restless yearning for ${userData.p2}'s goals of ${userData.wish1}, ${userData.wish2}, ${userData.wish3}. The dreams ${userData.p1} chased, with fervor and silent resolve, remain unfinished symphonies, their melodies hanging in the balance of what could have been. Despite this, ${userData.p1} never ceased to engage with the world ardently, seeking joy in the vibrant tapestry of life, from the simplest of pleasures to the grandest of adventures, and forging bonds with those few who truly understood the tempest of ${userData.p2}'s spirit.`,
        'sad.mp3'
      );
    }
  };


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
    };
  }, [scriptAudio]);

  // useEffect(() => {
  //   // if (step === 8 && backgroundAudio) {
  //   //   backgroundAudio.pause();
  //   //   backgroundAudio.currentTime = 0;
  //   // }

  //   return () => {
  //     if (backgroundAudio && step === 8) {
  //       backgroundAudio.pause();
  //       backgroundAudio.currentTime = 0;
  //     }
  //   };
  // }, [backgroundAudio, step]);

  return (
    <div className="App">
      <p className='credit'>Video Credit: Mellow Psychedelic Journey - Calming & Beautiful, Good For You.</p>
      <div id="video-container">
        <iframe id="background-video" src="https://www.youtube.com/embed/ICmWwxaTmB8?autoplay=1&mute=1&loop=1&playlist=ICmWwxaTmB8&controls=0&disablekb=1&modestbranding=1&showinfo=0&rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
      </div>


      {!isPlaying && step === 0 && (
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
          {/* {step === 8 && <BrowserComponent onReady={handleNextStep} />} */}
          {step === 7 && <LastWordsForm onSubmit={handleNextStep} />}
          {step === 8 && <ThankYouComponent onRestart={() => setStep(0)} />}
        </>
      )}
    </div>
  );
}

export default App;

