"use client";

import React from "react";
import Typewriter from "typewriter-effect";

export default function TypingEffect() {
  return (
    <div className="text-4xl font-[var(--font-exo2)] leading-snug text-green-400">
      <Typewriter
        options={{
          delay: 18,
          cursor: "_", // terminal cursor
          loop: false,
        }}
        onInit={(typewriter) => {
          typewriter
            .typeString("&gt; WELCOME! I'M KEVIN MUNIZ<br/>")
            .pauseFor(400)
            .typeString("&gt; CLASS: COMPUTER SCIENCE @ UCF<br/>")
            .pauseFor(350)
            .typeString("&gt; STATUS: SENIOR · DEVELOPER · CREATOR<br/><br/>")
            .pauseFor(400)
            .start();
        }}
      />
    </div>
  );
}
