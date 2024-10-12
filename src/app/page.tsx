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
import {UploadFromDeviceForm} from "./components/UploadFromDeviceForm";
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
  const [level, setLevel] = useState<number>(1);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [isFinalPage, setIsFinalPage] = useState<boolean>(false);

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
      count += 10;
      setProgress(count);
      if (count >= 100) {
        clearInterval(interval);
        setIsLoading(false);
      }
    }, 300);
  };

  const getGradientForLevel = (level: number): string => {
    switch (level) {
      case 1:
        return 'bg-gradient-to-br from-green-100 to-transparent';
      case 2:
        return 'bg-gradient-to-br from-pink-100 to-transparent';
      case 3:
        return 'bg-gradient-to-br from-orange-100 to-transparent';
      default:
        return 'bg-white';
    }
  };

  const renderContentForLevel = (level: number) => {
    if (isFinalPage) {
      return (
        <div className="flex flex-col items-center justify-center h-full">
          <Image src={Logo} alt="Logo" className="w-24 h-24 mb-4" />
          <h1 className="font-bold text-5xl mt-4">Please wait a moment...</h1>
          <div className="mt-8">
            <div className="w-24 h-24 border-8 border-t-purple-600 rounded-full animate-spin"></div>
            <p className="text-lg mt-4">Loading... {progress}%</p>
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
            <h1 className="font-bold text-4xl max-sm:text-center sm:text-5xl md:text-6xl mt-4">Welcome to DocsGPT</h1>
            <p className="text-base sm:text-lg md:text-xl mt-2">Your technical documentation assistant.</p>
          </div>

        );
      case 2:
        return (
          <div className="flex w-full flex-col items-center transition-all duration-500 ease-in-out">
          {/* Logo */}
          <Image src={Logo} alt="Logo" className="w-16 h-16 sm:w-20 sm:h-20 mb-4" />
      
          {/* Heading */}
          <h1 className="font-bold text-2xl sm:text-3xl w-4/5 sm:w-2/5 text-center mt-4">
            Upload from device or from web?
          </h1>
      
          {/* Subheading */}
          <h4 className="text-base sm:text-lg w-4/5 sm:w-2/5 font-normal text-center mt-4">
            You can choose how to add your first document to DocsGPT
          </h4>
      
          {/* Card Container */}
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 mt-6">
      
            {/* Card 1 */}
            <div className="flex flex-col items-center">
              <div
                className={`p-4 border rounded-lg shadow-md hover:shadow-2xl cursor-pointer ${selectedCard === 1 ? 'border-2 border-purple-700' : ''} transition-shadow duration-300`}
                onClick={() => handleCardSelect(1)}
              >
                <div className="p-6 sm:p-10">
                  <Image
                    src={L2C1}
                    alt="L1C1"
                    className={`w-10 h-10 sm:w-12 sm:h-12 ${selectedCard === 1 ? 'scale-125' : ''}`}
                  />
                </div>
              </div>
              <h4 className={`text-base sm:text-md w-4/5 sm:w-2/3 font-normal text-center mt-4 ${selectedCard === 1 ? 'text-purple-700' : ''}`}>
                Upload from device
              </h4>
            </div>
      
            {/* Card 2 */}
            <div className="flex flex-col items-center">
              <div
                className={`p-4 border rounded-lg shadow-md hover:shadow-2xl cursor-pointer ${selectedCard === 2 ? 'border-2 border-purple-700' : ''} transition-shadow duration-300`}
                onClick={() => handleCardSelect(2)}
              >
                <div className="p-6 sm:p-10">
                  <Image
                    src={L2C2}
                    alt="L1C2"
                    className={`w-10 h-10 sm:w-12 sm:h-12 ${selectedCard === 2 ? 'scale-125' : ''}`}
                  />
                </div>
              </div>
              <h4 className={`text-base sm:text-md w-4/5 sm:w-2/3 font-normal text-center mt-4 ${selectedCard === 2 ? 'text-purple-700' : ''}`}>
                Collect from a website
              </h4>
            </div>
      
          </div>
        </div>
        );
      case 3:
        return (
          <div className="flex flex-col items-center transition-all duration-500 ease-in-out">
            {selectedCard === 1 ? (
              // <div className="p-4 border rounded-lg shadow-md bg-white w-64">Simple Form</div>
              <UploadFromDeviceForm/>
            ) : (
              // <div className="p-4 border rounded-lg shadow-md bg-white w-64">Advanced Form</div>
              <CollectFromWebsiteForm/>
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
    <div className={`p-4 w-full flex flex-col h-screen ${getGradientForLevel(level)}`}>
      {!isFinalPage && (
        <div className="flex w-full justify-between items-center lg:items-start">
          {/* Left Section */}
          <div className="flex items-center space-x-2">
            <span className="font-normal">{language}</span>
            <Image src={Globe} height={24} width={24} alt="Globe" />
          </div>
          {/* Profile Section */}
          <div className="flex-grow"></div>
          <div className="rounded-full flex justify-center items-center w-12 h-12 overflow-hidden bg-red-400">
            <Image src={Profile} alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>
      )}

      {/* Main content section */}
      <div className="flex-grow flex flex-col justify-center items-center gap-8" id="here">
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
                  <Image src={Back} alt="<" className="mr-2" /> Back
                </button>

              )}
              <button
                onClick={level === 2 && selectedCard === null ? undefined : (level === 3 ? handleFinalButtonClick : handleLevelUp)}
                className={`px-8 py-3 ${level === 2 && selectedCard === null ? 'bg-gray-300 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'} 
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
