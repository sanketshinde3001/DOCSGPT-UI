'use client';

import { useState } from "react";
import React from 'react';
import Globe from "./assets/globe.svg";
import Profile from "./assets/profie.png";
import Image from "next/image";
import Logo from './assets/Logo.svg';
import L2C1 from "./assets/level2card1.svg";
import L2C2 from "./assets/level2card2.svg";
import Back from "./assets/Back.svg";
import UploadFromDeviceForm from "./components/UploadFromDeviceForm";
import CollectFromWebsiteForm from "./components/CollectFromWebsiteForm";

interface LevelIndicatorProps {
  currentLevel: number;
  indicatorLevel: number;
}

const LevelIndicator: React.FC<LevelIndicatorProps> = ({ currentLevel, indicatorLevel }) => {
  const isActive = currentLevel === indicatorLevel;
  const isPast = currentLevel > indicatorLevel;

  return (
    <div className="flex flex-col items-center mx-2">
      <div
        className={`h-2 rounded-full transition-all duration-500 ease-in-out
          ${isActive ? 'w-24 h-2 bg-[#7d54d1]' :
            isPast ? 'w-4 bg-gray-200' : 'w-4 bg-gray-200'}`}
      />
    </div>
  );
};

export default function Home() {
  const [language] = useState<string>("EN");
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [level, setLevel] = useState<number>(1);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [isFinalPage, setIsFinalPage] = useState<boolean>(false);
  const [isTrainingComplete, setIsTrainingComplete] = useState<boolean>(false);



  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    document.documentElement.classList.toggle('dark', theme === 'light'); // Toggle the dark class on the HTML element
  };

  const handleLevelUp = () => {
    if (level < 3) {
      setLevel(prevLevel => prevLevel + 1);
    }
  };

  const handleLevelDown = () => {
    if (level > 1) {
      setLevel(prevLevel => prevLevel - 1);
    }
    setSelectedCard(null);
  };

  const handleCardSelect = (card: number) => {
    setSelectedCard(card);
  };

  const handleFinalButtonClick = () => {
    setIsLoading(true);
    setIsFinalPage(true); // Show only the final page content when the spinner starts

    let count = 0;
    const interval = setInterval(() => {
      count += 5;
      setProgress(count);
      if (count >= 100) {
        clearInterval(interval);
        setIsLoading(false);
        setIsTrainingComplete(true)
      }
    }, 400);
  };

  const getGradientForLevel = (level: number): string => {
    switch (level) {
      case 1:
        return 'bg-gradient-to-br from-green-200 via-white to-white  dark:from-[#222327] dark:to-black'; // Light greenish tone
      case 2:
        return 'bg-gradient-to-br from-pink-200 via-white to-white  dark:from-[#222327] dark:to-black'; // Light pink tone
      case 3:
        return `bg-gradient-to-br  ${isTrainingComplete == true ? 'from-green-200 ' : 'from-orange-100 '} via-white to-white dark:from-[#222327] dark:to-black`; // Light orange tone
      default:
        return 'bg-white dark:bg-gray-900'; // Default light and dark backgrounds
    }
  };


  const renderContentForLevel = (level: number) => {
    if (isFinalPage) {
      return (
        <div className="flex flex-col items-center justify-center h-full w-full">
          <Image src={Logo} alt="Logo" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 " />
          {isTrainingComplete == true ? (<>          <h1 className="font-bold text-2xl  md:text-3xl lg:text-4xl w-4/5 md:w-3/5 lg:w-2/5 text-center mt-4 dark:text-white">
            Training Complete !
          </h1></>) : (<>          {/* Heading */}
            <h1 className="font-bold text-2xl  md:text-3xl lg:text-4xl w-4/5 md:w-3/5 lg:w-2/5 text-center mt-4 dark:text-white">
              Training is in progress...
            </h1>

            {/* Subheading */}
            <h4 className="text-sm sm:text-base md:text-lg lg:text-xl w-5/6 md:w-3/5 lg:w-1/3 font-normal text-center mt-2 md:mt-4 dark:text-gray-300">
              This may take several minutes
            </h4></>)}

          <div className="mt-16 flex flex-col items-center">
            <div className="relative w-60 h-60">
              <div className={`absolute inset-0 ${isTrainingComplete===true?' bg-green-600/20 rounded-full w-96 h-96 blur-2xl':''}`}></div>
              <div className="absolute inset-0 border-8 border-t-transparent border-b-transparent rounded-full animate-spin">
                <div className="w-full h-full border-8 border-t-purple-600 border-l-red-500 border-r-blue-500 border-b-yellow-500 rounded-full animate-spin"></div>
              </div>
              <p className="absolute inset-0 flex justify-center items-center text-lg font-bold dark:text-white text-gray-800">
                {progress}%
              </p>
            </div>
          </div>



          {!isLoading && (
            <button
              className="mt-6 px-8 py-3 bg-purple-600 text-white rounded-lg transition-all hover:bg-purple-700 shadow-[0_4px_8px_rgba(128,90,213,0.3)]">
              Start Chatting
            </button>
          )}
        </div>
      );
    }

    switch (level) {
      case 1:
        return (
          <div className="flex flex-col items-center transition-all duration-500 ease-in-out">
            <Image src={Logo} alt="Logo" className="w-20 h-20 mb-4 max-sm:w-22 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36 2xl:w-40 2xl:h-40" />
            <h1 className="font-bold text-4xl max-sm:text-center sm:text-5xl md:text-6xl mt-4 dark:text-white">Welcome to DocsGPT</h1>
            <p className="text-base sm:text-lg md:text-xl mt-2 dark:text-gray-300">Your technical documentation assistant.</p>
          </div>

        );
      case 2:
        return (
          <div className="flex w-full flex-col items-center transition-all duration-500 ease-in-out">
            {/* Logo */}
            <Image src={Logo} alt="Logo" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 mb-4" />

            {/* Heading */}
            <h1 className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl w-4/5 md:w-3/5 lg:w-2/5 text-center mt-4 dark:text-white">
              Upload from device or from web?
            </h1>

            {/* Subheading */}
            <h4 className="text-sm sm:text-base md:text-lg lg:text-xl w-5/6 md:w-3/5 lg:w-1/3 font-normal text-center mt-2 md:mt-4 dark:text-gray-300">
              You can choose how to add your first document to DocsGPT
            </h4>

            {/* Card Container */}
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 mt-6">

              {/* Card 1 */}
              <div className="flex flex-col items-center ">
                <div
                  className={`p-4 border-2 ${selectedCard === 1 ? 'border-purple-700 dark:shadow-[-20px_35px_50px_-15px_rgba(0,0,0,0.5)]' : 'border-transparent shadow-md hover:shadow-2xl'} 
                  rounded-lg bg-white dark:bg-gray-800 cursor-pointer transition-shadow duration-300`}

                  onClick={() => handleCardSelect(1)}
                >
                  <div className="p-6 sm:p-8 md:p-10 lg:p-12">
                    <Image
                      src={L2C1}
                      alt="L1C1"
                      className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 dark:filter dark:invert lg:h-16 ${selectedCard === 1 ? 'scale-125' : ''}`}
                    />
                  </div>
                </div>
                <h4 className={`text-xs sm:text-base md:text-lg w-4/5 md:w-2/3 text-center mt-4 dark:text-gray-200 ${selectedCard === 1 ? 'text-purple-700' : ''}`}>
                  Upload from device
                </h4>
              </div>

              {/* Card 2 */}
              <div className="flex flex-col items-center ">
                <div
                  className={`p-4 border-2 ${selectedCard === 2 ? 'border-purple-700 dark:shadow-[20px_35px_50px_-15px_rgba(0,0,0,0.5)]' : 'border-transparent shadow-md hover:shadow-2xl'} 
                  rounded-lg bg-white dark:bg-gray-800 cursor-pointer transition-shadow duration-300`}
                  onClick={() => handleCardSelect(2)}
                >
                  <div className="p-6 sm:p-8 md:p-10 lg:p-12">
                    <Image
                      src={L2C2}
                      alt="L1C2"
                      className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 dark:filter dark:invert lg:h-16 ${selectedCard === 2 ? 'scale-125' : ''}`}
                    />
                  </div>
                </div>
                <h4 className={`text-xs sm:text-base md:text-lg w-4/5 md:w-2/3 text-center mt-4 dark:text-gray-200 ${selectedCard === 2 ? 'text-purple-700' : ''}`}>
                  Collect from a website
                </h4>
              </div>

            </div>
          </div>

        );
      case 3:
        return (
          <div className="flex flex-col w-full items-center gap-5 transition-all duration-500 ease-in-out">
            <Image src={Logo} alt="Logo" className="w-16 h-16 sm:w-20 sm:h-20 " />

            {/* Heading */}
            <h1 className="font-bold text-xl sm:text-2xl md:text-3xl  w-4/5 md:w-3/5 lg:w-2/5 text-center mb-5 dark:text-white">
              Upload new document
            </h1>
            {selectedCard === 1 ? (
              <UploadFromDeviceForm />
            ) : (
              <CollectFromWebsiteForm />
            )}
            {isLoading && (
              <div className="mt-8">
                <div className="w-16 h-16 border-t-4 border-purple-600 rounded-full animate-spin"></div>
                <p className="text-lg mt-2">{progress}%</p>

              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`p-4 w-full relative flex flex-col h-screen ${getGradientForLevel(level)}`}>

      <div className="dark:absolute dark:top-1/4 dark:left-1/4 dark:w-96 dark:h-96 dark:bg-blue-600/10 dark:rounded-full dark:blur-2xl dark:transform dark:-translate-x-2/4 dark:-translate-y-1/2"></div>
      <div className="dark:absolute dark:top-1/3 dark:left-1/3 dark:w-96 dark:h-96 dark:bg-green-600/10 dark:rounded-full dark:blur-2xl dark:transform dark:-translate-x-1/3 dark:-translate-y-1/3"></div>
      <div className="dark:absolute dark:top-1/2 dark:left-1/2 dark:w-[500px] dark:h-[500px] dark:bg-orange-700/20 dark:rounded-full dark:blur-3xl dark:transform dark:-translate-x-1/2 dark:-translate-y-1/2"></div>




      <div className="flex w-full justify-between items-center lg:items-start">
        {/* Left Section */}
        <div className="flex w-full justify-between items-center lg:items-start">
          {/* Left Section */}
          <div className="flex items-center space-x-2">
            <span className="font-normal dark:text-white">{language}</span>
            <Image src={Globe} height={24} width={24} alt="Globe" onClick={toggleTheme} className="z-30 dark:invert" />

          </div>
        </div>



        {/* Profile Section */}
        <div className="flex-grow"></div>
        <div className="rounded-full flex justify-center items-center w-12 h-12 overflow-hidden bg-red-400">
          <Image src={Profile} alt="Profile" className="w-full h-full object-cover" />
        </div>
      </div>


      {/* Main content section */}
      <div className="flex-grow flex flex-col  justify-center items-center gap-8 -translate-y-20" id="here">
        {renderContentForLevel(level)}

        {!isFinalPage && (
          <>
            <div className="flex justify-center mb-8">
              <div className="flex space-x-1">
                {[1, 2, 3].map(num => (
                  <LevelIndicator key={num} currentLevel={level} indicatorLevel={num} />
                ))}
              </div>
            </div>

            <div className="flex space-x-4">
              {level === 3 && !isLoading && (
                <button
                  onClick={handleLevelDown}
                  className="px-2 py-1 text-gray-500 hover:text-gray-700 text-lg font-medium transition-colors flex items-center"
                >
                  <Image src={Back} alt="<" className="mr-2 dark:invert" /><span className="dark:text-gray-400">Back</span>
                </button>

              )}
              <button
                onClick={level === 2 && selectedCard === null ? undefined : (level === 3 ? handleFinalButtonClick : handleLevelUp)}
                className={`px-8 py-3 ${level === 2 && selectedCard === null ? 'bg-gray-300 dark:bg-purple-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'} 
                text-white rounded-lg transition-all shadow-[0_4px_8px_rgba(128,90,213,0.3)]`}
                disabled={level === 2 && selectedCard === null}>
                {isLoading ? "In Progress" : level === 1 ? "Get Started" : level === 2 ? "Next" : "Train"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
