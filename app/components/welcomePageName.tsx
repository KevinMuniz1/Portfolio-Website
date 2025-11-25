"use client";

import Typewriter from "typewriter-effect";

export default function TypingEffect() {
  return (
  <div className="flex flex-col items-center p-8">
    {/* image placeholder - replace src with your photo in /public and alt text */}
    <img
      src="/profilePic.JPG"
      alt="Kevin Muniz" 
      className="welcome-avatar w-100 h-100 rounded-full mb-6 object-cover"
    />

    <div className="text-3xl  leading-snug text-cyan-400 orbitron-text text-center">
      <Typewriter
        options={{
          delay: 25,
          cursor: "_", // terminal cursor
          loop: false,
        }}
        onInit={(typewriter) => {
          typewriter
            .typeString("> HEY! I'M KEVIN MUNIZ, ")
            .pauseFor(400)
            .typeString("A COMPUTER SCIENCE MAJOR @ UCF")
            .pauseFor(350)
            .start();
        }}
      />
    </div>
    </div>
  );
}
