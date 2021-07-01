import "./App.css";
import React, { useState, useRef } from "react";
import distBtwPoints from "./utilities/getDistance";
import getNextPermutation from "./utilities/getNextPermutation";

function App() {
  const [speed, setSpeed] = useState(1);
  const canvasRef = useRef(null);

  const [points, setPoints] = useState([]);
  const [cityFlag, setCityFlag] = useState([]);
  const [antFlag, setAntFlag] = useState([]);
  const [initialPoint, setInitialPoint] = useState(0);
  const [totalDistance, setTotalDistance] = useState(0);
  const [ants, setAnts] = useState(10);
  const [withPhermone, setWithPhermone] = useState(true);

  const storeGuess = (event) => {
    let x = event.nativeEvent.offsetX;
    let y = event.nativeEvent.offsetY;
    let cRef = canvasRef.current.getContext("2d");
    cRef.fillStyle = "#99ccff";
    cRef.fillRect(x, y, 5, 5);
    cRef.font = "10px Arial";
    cRef.fillText(points.length + "💀", x - 1, y - 1);
    let temp = points;
    temp.push({ x: x, y: y });
    setCityFlag([...cityFlag, false]);
    setPoints(temp);
    let antCities = [];
    for (let i = 0; i < ants; i++) {
      antCities.push(false);
    }
    setAntFlag([...antFlag, antCities]);
  };

  //Makes path from p[0] to p[p.length-1] (lines)
  const draw_path = () => {
    let tx = 0;
    for (let i = 1; i < points.length; i++) {
      setTimeout(() => {
        moveLine(points[i - 1], points[i]);
      }, tx);
      let dist =
        Math.pow(points[i].x - points[i - 1].x, 2) +
        Math.pow(points[i].y - points[i - 1].y, 2);
      tx += Math.sqrt(dist) * speed;
    }
  };

  //Moves point A to B
  const movePointA2B = (p1, p2) => {
    let angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);
    let dist = 1;
    let dy = Math.sin(angle) * dist;
    let dx = Math.cos(angle) * dist;
    let x1 = p1.x;
    let y1 = p1.y;
    let x2 = p2.x;
    let y2 = p2.y;
    let distt = Math.sqrt(Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2));
    for (let t = 0; t <= distt; t++) {
      // eslint-disable-next-line no-loop-func
      setTimeout(() => {
        //canvasRef.current.getContext("2d").fillRect(x1, y1, 1, 1);
        canvasRef.current
          .getContext("2d")
          .fillRect(Math.round(x1), Math.round(y1), 3, 3);
        canvasRef.current
          .getContext("2d")
          .clearRect(Math.round(x1 - dx), Math.round(y1 - dy), 3, 3);
        for (let i = 0; i < points.length; i++) {
          let x = points[i].x;
          let y = points[i].y;
          let cRef = canvasRef.current.getContext("2d");
          cRef.fillStyle = "#99ccff";
          cRef.fillRect(x, y, 5, 5);
          cRef.font = "10px Arial";
          cRef.fillText(i + "💀", x - 1, y - 1);
        }
        x1 += dx;
        y1 += dy;
      }, t * speed);
    }
  };

  const moveLine = (p1, p2) => {
    let angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);
    let dist = 2;
    let dy = Math.sin(angle) * dist;
    let dx = Math.cos(angle) * dist;
    let x1 = p1.x;
    let y1 = p1.y;
    let x2 = p2.x;
    let y2 = p2.y;
    let distt = Math.sqrt(Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2));
    canvasRef.current.getContext("2d").fillStyle =
      "#" + Math.floor(Math.random() * 16777215).toString(16);
    for (let t = 0; t <= distt / dist; t++) {
      // eslint-disable-next-line no-loop-func
      setTimeout(() => {
        //canvasRef.current.getContext("2d").fillStyle = "white";
        //canvasRef.current.getContext("2d").fillRect(x1, y1, 1, 1);
        let context = canvasRef.current.getContext("2d");
        context.save();
        // context.translate(
        //   x1 -
        //     Math.cos(Math.PI / 4) *
        //       Math.sqrt(Math.pow(y1, 2) + Math.pow(x1, 2)),
        //   y1 -
        //     Math.sin(Math.PI / 4) * Math.sqrt(Math.pow(y1, 2) + Math.pow(x1, 2))
        // );
        context.translate(x1, y1);
        context.rotate(angle + Math.PI / 2);
        context.textAlign = "center";
        context.font = "3px Arial";
        canvasRef.current.getContext("2d").fillStyle = "white";
        context.fillText("!", 0, 0);
        context.restore();
        x1 += dx;
        y1 += dy;
      }, t * speed);
    }
  };

  const chooseMin = (p, t, cities, antindex) => {
    let done = false;
    let next = p;
    let mx = Math.min();
    for (let i = 0; i < cities.length; i++) {
      if (i === p || antFlag[i][antindex] === true) continue;
      let distance = distBtwPoints(cities, p, i);
      if (distance < mx) {
        mx = distance;
        next = i;
      }
    }
    if (next !== p) setTotalDistance(totalDistance + mx);
    if (next === p) {
      done = true;
    }
    let temp = antFlag;
    temp[p][antindex] = true;
    setAntFlag(temp);
    setCityFlag(temp);
    if (done === true) {
      setTimeout(() => {
        if (withPhermone) {
          moveLine(cities[p], cities[initialPoint]);
        } else {
          movePointA2B(cities[p], cities[initialPoint]);
        }
      }, t);
      return;
    }
    setTimeout(() => {
      if (withPhermone) {
        moveLine(cities[p], cities[next]);
      } else {
        movePointA2B(cities[p], cities[next]);
      }
    }, t);
    //let timer = t * speed + distBtwPoints(cities, p, next) * speed;
    let timer = t + 400;
    chooseMin(next, timer, cities, antindex);
  };

  const startBrute = (t, cities) => {
    canvasRef.current.getContext("2d").clearRect(0, 0, 1800, 950);
    canvasRef.current.getContext("2d").fillStyle =
      "#" + Math.floor(Math.random() * 16777215).toString(16);
    setTotalDistance(0);
    for (let i = 0; i < points.length; i++) {
      let x = points[i].x;
      let y = points[i].y;
      let cRef = canvasRef.current.getContext("2d");
      cRef.fillRect(x, y, 5, 5);
      cRef.font = "10px Arial";
      cRef.fillText(i, x - 1, y - 1);
    }
    let time = 0;
    for (let i = 1; i < cities.length; i++) {
      setTimeout(() => {
        movePointA2B(cities[i - 1], cities[i]);
      }, time);
      time += distBtwPoints(cities, i - 1, i) * speed;
      setTotalDistance(totalDistance + distBtwPoints(cities, i - 1, i));
    }
    setTimeout(() => {
      movePointA2B(cities[cities.length - 1], cities[0]);
      setTotalDistance(
        totalDistance + distBtwPoints(cities, cities.length - 1, 0)
      );
    }, time);
  };

  const startBruteForce = (order, t) => {
    if (order.length === 0) return;
    let new_points = [];
    //console.log(order);
    for (let i = 0; i < order.length; i++) {
      new_points.push(points[order[i]]);
    }
    //let total_time = 0;
    for (let i = 1; i < order.length; i++) {
      //total_time += distBtwPoints(new_points, i - 1, i) * speed;
    }
    //total_time += distBtwPoints(new_points, order.length - 1, 0) * speed;
    setTimeout(() => {
      startBrute(t, new_points); //make a new function which connects in order given without doing any stuff
    }, t);
    //startBruteForce(getNextPermutation(order), t + total_time);
    startBruteForce(getNextPermutation(order), t + order.length * 450);
  };

  return (
    <div className="App">
      <div>Connecting points...</div>
      <div style={{ display: "flex" }}>
        <button onClick={draw_path}>Make PATH</button>
        <button
          onClick={() => {
            let temp = cityFlag;
            for (let i = 0; i < points.length; i++) {
              temp[i] = false;
            }
            setCityFlag(temp);
            for (let i = 0; i < ants; i++) {
              setTimeout(() => {
                canvasRef.current.getContext("2d").fillStyle =
                  "#" + Math.floor(Math.random() * 16777215).toString(16);
                chooseMin(i % points.length, 0, points, i);
              }, i * speed);
            }
          }}
        >
          Start ACO
        </button>
        <button
          onClick={() => {
            console.log(canvasRef.width);
            console.log(canvasRef.height);
            canvasRef.current.getContext("2d").clearRect(0, 0, 1800, 950);
          }}
        >
          Clear Canvas
        </button>
        <button
          onClick={() => {
            startBruteForce(Array.from(Array(points.length).keys()), 0);
            setCityFlag([]);
            setPoints([]);
          }}
        >
          Start Brute Force Algorithm
        </button>
        <div>
          Rate(1-60 milliseconds):
          <input
            type="number"
            value={speed}
            onChange={(e) => {
              setSpeed(e.target.value);
            }}
            min="1"
            max="60"
          />
        </div>
        <div>
          Initial City
          <input
            type="number"
            value={initialPoint}
            onChange={(e) => {
              setInitialPoint(e.target.value);
            }}
          />
        </div>
        <button onClick={() => setWithPhermone(!withPhermone)}>
          {withPhermone ? "Remove phermone" : "Add phermone"}
        </button>
        <div>
          No. of Ants
          <input
            type="number"
            value={ants}
            onChange={(e) => {
              setAnts(e.target.value);
            }}
          />
        </div>
        <div>Total distance travelled: {totalDistance}</div>
      </div>
      <canvas
        ref={canvasRef}
        width="1800px"
        height="950px"
        style={{ border: "2px solid black", backgroundColor: "black" }}
        onClick={(e) => storeGuess(e)}
      ></canvas>
    </div>
  );
}

export default App;
