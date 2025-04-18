'use client';
import React from 'react';
const HeroVideoBackground = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        className="absolute z-0 w-full h-full object-cover"
      >
        <source src="https://www.youtube.com/shorts/09kQympMZyo" type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>

      {/* Overlay Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full bg-black bg-opacity-40 text-white px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Transform Your Academic Journey
        </h1>
        <p className="text-xl md:text-2xl max-w-2xl mb-8">
          Join thousands of students excelling with ScholarHub
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg text-lg font-semibold">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default HeroVideoBackground;