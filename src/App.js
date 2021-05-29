import "./App.css";
import React, { useState, useRef } from "react";

function App() {
  const [speed, setSpeed] = useState(50);
  const canvasRef = useRef(null);

  let ants = [];
  let guessX = 0; //stores user's click on canvas
  let guessY = 0; //stores user's click on canvas

  function storeGuess(event) {
    let x = event.nativeEvent.offsetX;
    let y = event.nativeEvent.offsetY;
    guessX = x;
    guessY = y;
    canvasRef.current.getContext("2d").fillStyle = "#FFFFFF";
    canvasRef.current.getContext("2d").fillRect(guessX, guessY, 3, 3);
    ants.push({
      x: x,
      y: y,
    });
  }

  function draw() {
    for (let i = 0; i < ants.length; i++) {
      for (let j = i + 1; j < ants.length; j++) {
        setTimeout(() => {
          canvasRef.current.getContext("2d").beginPath();
          canvasRef.current.getContext("2d").moveTo(ants[i].x, ants[i].y);
          canvasRef.current.getContext("2d").lineTo(ants[j].x, ants[j].y);
          canvasRef.current.getContext("2d").strokeStyle =
            "#" + Math.floor(Math.random() * 16777215).toString(16);
          canvasRef.current.getContext("2d").stroke();
        }, (i * ants.length + j + 1) * speed);
      }
    }
  }

  return (
    <div className="App">
      <canvas
        ref={canvasRef}
        width="400px"
        height="500px"
        style={{ border: "2px solid black", backgroundColor: "#282c34" }}
        onClick={(e) => storeGuess(e)}
      ></canvas>
      <div>Connecting points...</div>
      <button onClick={() => draw()}>DRAW PATHS</button>
      <button
        onClick={() => {
          window.location.reload();
        }}
      >
        CLEAR
      </button>
      <div>
        Rate(1-60 milliseconds):
        <input
          type="number"
          value={speed}
          onChange={(e) => {
            if (ants.length === 0) setSpeed(e.target.value);
            else alert("clear and change speed");
          }}
          min="1"
          max="60"
        />
      </div>
    </div>
  );
}

export default App;
