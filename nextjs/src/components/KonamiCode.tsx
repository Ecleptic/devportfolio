"use client";

import { useEffect, useState } from "react";

export default function KonamiCode() {
  const [showSnowflakes, setShowSnowflakes] = useState(false);

  useEffect(() => {
    const pressed: string[] = [];
    const secretCode =
      "ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightba";

    console.log("Psstt... try the konami code!");

    const handleKeyUp = (e: KeyboardEvent) => {
      if (pressed.length > 100) {
        pressed.length = 0;
      }
      pressed.push(e.key);
      pressed.splice(
        -secretCode.length - 1,
        pressed.length - secretCode.length
      );

      if (pressed.join("").includes(secretCode)) {
        setShowSnowflakes(true);
      }
    };

    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <>
      {/* Hire Me Snowflakes */}
      <div
        id="hireMeSnowflakeDiv"
        className={`snowflakes ${showSnowflakes ? "" : "hidden"}`}
      >
        <div className="snowflake">HIRE</div>
        <div className="snowflake">ME</div>
        <div className="snowflake">HIRE</div>
        <div className="snowflake">CAMERON</div>
        <div className="snowflake">HIRE</div>
        <div className="snowflake">GREEN</div>
        <div className="snowflake">HIRE</div>
        <div className="snowflake">CAMERON</div>
        <div className="snowflake">HIRE</div>
        <div className="snowflake">HIRE</div>
        <div className="snowflake">ME</div>
        <div className="snowflake">HIRE</div>
        <div className="snowflake">ME</div>
        <div className="snowflake">HIRE</div>
        <div className="snowflake">ME</div>
        <div className="snowflake">HIRE</div>
        <div className="snowflake">ME</div>
      </div>

      {/* Regular Snowflakes - Currently Permanently hidden*/}
      <div id="snowflakeDiv" className={`snowflakes ${"hidden"}`}>
        <div className="snowflake">❄️</div>
        <div className="snowflake">❄️</div>
        <div className="snowflake">❄️</div>
        <div className="snowflake">❄️</div>
        <div className="snowflake">❄️</div>
        <div className="snowflake">❄️</div>
        <div className="snowflake">❄️</div>
        <div className="snowflake">❄️</div>
        <div className="snowflake">❄️</div>
        <div className="snowflake">❄️</div>
        <div className="snowflake">❄️</div>
        <div className="snowflake">❄️</div>
        <div className="snowflake">❄️</div>
        <div className="snowflake">❄️</div>
        <div className="snowflake">❄️</div>
        <div className="snowflake">❄️</div>
        <div className="snowflake">❄️</div>
      </div>
    </>
  );
}
