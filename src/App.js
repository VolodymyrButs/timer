import "./App.css";
import { useState, useEffect } from "react";

export const App = () => {
  const [seconds, setSeconds] = useState(900);
  const [isActive, setIsActive] = useState(false);
  const inputHandler = (e) => {
    if (e.target.value >= 0 && e.target.value <= 59) {
      setSeconds(e.target.value * 60);
    } else {
      document.getElementById("input").value = 59;
      setSeconds(59 * 60);
    }
  };

  const toggle = () => {
    seconds === 0 && setSeconds(document.getElementById("input").value * 60);
    seconds === 0 &&
      isActive === false &&
      (document.getElementById("input").value = 15) &&
      setSeconds(900);
    setIsActive(!isActive);
  };
  const reset = () => {
    setIsActive(false);
    setSeconds(0);
    document.getElementById("input").value = 15;
  };
  useEffect(() => {
    document.getElementById("input").value = 15;
  }, []);
  useEffect(() => {
    let interval = null;
    if (isActive && seconds !== 0) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    } else if ((!isActive && seconds !== 0) || seconds <= 0) {
      clearInterval(interval);
      setIsActive(false);
      isActive && (document.getElementById("input").value = 15);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
    <div className="App">
      <div>
        <div className="output">
          <p>
            {Math.floor(seconds / 60) < 10
              ? `0${Math.floor(seconds / 60)}`
              : Math.floor(seconds / 60)}
          </p>
          <span>:</span>
          <p>
            {seconds % 60 < 10 || seconds % 60 === 0
              ? "0" + (seconds % 60)
              : seconds % 60}
          </p>
        </div>
      </div>
      <input
        id="input"
        onChange={inputHandler}
        type="number"
        min={0}
        max={59}
        disabled={isActive}
        inputMode="numeric"
        title="max 59"
      />
      <button className="start" onClick={toggle}>
        {!isActive
          ? document.getElementById("input") &&
            document.getElementById("input").value * 60 !== seconds &&
            seconds !== 0
            ? "RESUME"
            : "START"
          : "PAUSE"}
      </button>
      <button
        className="reset"
        onClick={reset}
        disabled={isActive || seconds === 0 || seconds === 900}
      >
        RESET
      </button>
    </div>
  );
};
