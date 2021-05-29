import "./App.css";
import React, { useState, useEffect, createRef } from "react";

function App() {
  const [speed, setSpeed] = useState(50);
  let canvasRef = createRef();
  var ctx;

  useEffect(() => {
    ctx = canvasRef.current.getContext("2d");
  });

  let index = 0;
  let ants = [];
  let guessX = 0; //stores user's click on canvas
  let guessY = 0; //stores user's click on canvas

  function storeGuess(event) {
    let x = event.nativeEvent.offsetX;
    let y = event.nativeEvent.offsetY;
    console.log(x);
    console.log(y);
    guessX = x;
    guessY = y;
    console.log("x coords: " + guessX + ", y coords: " + guessY);
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(guessX, guessY, 3, 3);
    ants.push({
      x: x,
      y: y,
    });
    index++;
  }

  function draw() {
    console.log("Draw");
    console.log(ants);

    for (let i = 0; i < ants.length; i++) {
      for (let j = i + 1; j < ants.length; j++) {
        setTimeout(() => {
          console.log(ants);
          console.log("seconds", i * ants.length + j + 1);
          ctx.beginPath();
          ctx.moveTo(ants[i].x, ants[i].y);
          ctx.lineTo(ants[j].x, ants[j].y);
          ctx.strokeStyle =
            "#" + Math.floor(Math.random() * 16777215).toString(16);
          console.log("#" + Math.floor(Math.random() * 16777215).toString(16));
          ctx.stroke();
        }, (i * ants.length + j + 1) * speed);
      }
    }
  }

  function circle() {
    for (let i = 0; i < 1000; i++) {
      for (let j = 0; j < 1000; j++) {
        console.log(i, j);
        if (Math.pow(i - 100, 2) + Math.pow(j - 100, 2) == Math.pow(100, 2)) {
          ctx.fillStyle = "#FFFFFF";
          ctx.fillRect(i, j, 5, 5);
          console.log(i, j);
        }
      }
    }
  }

  return (
    <div className="App">
      <canvas
        ref={canvasRef}
        width="400px"
        height="600px"
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
