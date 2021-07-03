import "./App.css";
import React, { useState, useRef, useEffect } from "react";
import distBtwPoints from "./utilities/getDistance";
import getNextPermutation from "./utilities/getNextPermutation";
import Game from "./game";

function App() {
  const [speed, setSpeed] = useState(1);
  const canvasRef = useRef(null);

  const [points, setPoints] = useState([]);
  const [pointsPhermone, setPointsPhermone] = useState([]);
  const [tpointsPhermone, setTPointsPhermone] = useState([]);
  const [antFlag, setAntFlag] = useState([]);
  const [initialPoint, setInitialPoint] = useState(0);
  const [ants, setAnts] = useState(10);
  const [maxOp, setMaxOp] = useState(0.1);
  const [antDescrip, setAntDescrip] = useState(new Map());
  const [ite, setIte] = useState(0);
  const [COLOR, setCOLOR] = useState(null);
  const [show, setShow] = useState(false);
  const [ALPHA, setALPHA] = useState(2);
  const [BETA, setBETA] = useState(3);
  const [EVAPORAION_RATE, setEVAPORAION_RATE] = useState(0.5);

  const evap = () => {
    //console.log("antDescrip");
    setAntDescrip(new Map());
    let cRef = canvasRef.current.getContext("2d");
    cRef.clearRect(0, 0, 1000, 1000);
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        createLine(points[i], points[j], "black", i, j);
      }
    }
  };

  const CITY_COLOR = "#99ccff";
  const PHERMONE_COLOR = "#99ccff";
  const CITY_TEXT_STYLE = "10px Arial";
  const JUMP = 1;
  const PHERMONE_UNIT = parseFloat(1 / ants);
  const ITERATION = 1;

  const plotMin = () => {
    if ([...antDescrip].length === 0) return;

    let highestTimeoutId = setTimeout(";"); // to stop all setTimeouts!
    for (let i = 0; i < highestTimeoutId; i++) {
      clearTimeout(i);
    }
    if (antDescrip.length === 0) return;
    let mn = Math.min();
    let index;
    for (let [key, value] of antDescrip) {
      if (value[2] < mn) {
        mn = value[2];
        index = key;
      }
    }
    setShow(true);
    testPath("green", antDescrip.get(index)[1]);
  };

  const plotMax = () => {
    if ([...antDescrip].length === 0) return;

    let highestTimeoutId = setTimeout(";"); // to stop all setTimeouts!
    for (let i = 0; i < highestTimeoutId; i++) {
      clearTimeout(i);
    }
    if (antDescrip.length === 0) return;
    let mn = Math.max();
    let index;
    for (let [key, value] of antDescrip) {
      if (value[2] > mn) {
        mn = value[2];
        index = key;
      }
    }
    setShow(true);
    testPath("red", antDescrip.get(index)[1]);
  };

  //Plot points on canvas and does initialisation: makes points array[] and antFlag array[][]
  const plotCityandInit = (event) => {
    console.log(event);
    let x = event.nativeEvent.offsetX;
    let y = event.nativeEvent.offsetY;
    console.log(x, y);

    // if (window.innerWidth <= 768) {
    //   let mainRect = event.nativeEvent.target.getBoundingClientRect();
    //   x = event.nativeEvent.targetTouches[0].pageX - mainRect.left;
    //   y = event.nativeEvent.targetTouches[0].pageY - mainRect.top;
    // }
    let cRef = canvasRef.current.getContext("2d");
    cRef.fillStyle = CITY_COLOR;
    //cRef.fillRect(x, y, 5, 5);
    cRef.font = CITY_TEXT_STYLE;
    //if (points.length % 2) cRef.fillText(points.length + "🌳", x - 1, y - 1);
    //else cRef.fillText(points.length + "🌴", x - 1, y - 1);

    cRef.fillText(points.length + "⛺️", x - 1, y - 1);
    let temp = points;
    temp.push({ x: x, y: y });
    setPoints(temp);
    let antCities = [];
    for (let i = 0; i < ants; i++) {
      antCities.push(false);
    }
    setAntFlag([...antFlag, antCities]);
    let tempPhermone = [...pointsPhermone];
    for (let i = 0; i < pointsPhermone.length; i++) {
      tempPhermone[i].push(0.05);
    }
    let tempPhermoneArr = [];
    for (let i = 0; i <= pointsPhermone.length; i++) {
      tempPhermoneArr.push(0.05);
    }
    tempPhermone.push(tempPhermoneArr);
    setPointsPhermone(tempPhermone);
    setTPointsPhermone(tempPhermone);
  };

  //Makes path from p[0] to p[p.length-1] (lines)
  const testPath = (flag, order) => {
    let tx = 0;
    for (let i = 1; i <= order.length; i++) {
      // eslint-disable-next-line no-loop-func
      setTimeout(() => {
        if (flag === "red" || flag === "green" || flag === 1) {
          createLine(
            points[order[i - 1]],
            points[order[i % order.length]],
            flag
          );
        } else if (flag === 5) {
          createLine(points[i - 1], points[i % points.length], "");
        } else if (flag === 2) {
          clearLine(points[i - 1], points[i % points.length]);
        } else {
          movePointA2B(points[i - 1], points[i % points.length]);
        }
      }, tx);
      let dist;

      if (flag === 1 || flag === 99 || flag === "red" || flag === "green") {
        dist =
          Math.pow(
            points[order[i % order.length]].x - points[order[i - 1]].x,
            2
          ) +
          Math.pow(
            points[order[i % order.length]].y - points[order[i - 1]].y,
            2
          );
      } else {
        dist =
          Math.pow(points[i % points.length].x - points[i - 1].x, 2) +
          Math.pow(points[i % points.length].y - points[i - 1].y, 2);
      }
      if (flag === 1) {
        tx += (Math.sqrt(dist) / JUMP) * speed;
      } else if (flag === 2) {
        tx += (Math.sqrt(dist) / JUMP) * speed;
      } else {
        tx += Math.sqrt(dist) * speed;
      }
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
          .fillRect(Math.round(x1), Math.round(y1), 5, 5);
        canvasRef.current
          .getContext("2d")
          .clearRect(Math.round(x1 - dx), Math.round(y1 - dy), 5, 5);
        for (let i = 0; i < points.length; i++) {
          let x = points[i].x;
          let y = points[i].y;
          let cRef = canvasRef.current.getContext("2d");
          cRef.fillStyle = CITY_COLOR;
          cRef.fillRect(x, y, 5, 5);
          cRef.font = CITY_TEXT_STYLE;
          if (i % 2) cRef.fillText(i + "🌳", x - 1, y - 1);
          else cRef.fillText(i + "🌴", x - 1, y - 1);
        }
        x1 += dx;
        y1 += dy;
      }, t * speed);
    }
  };

  //Makes line from p1 to p2
  const createLine = (p1, p2, color, xi = 0, yi = 0) => {
    let angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);
    let dist = JUMP;
    let dy = Math.sin(angle) * dist;
    let dx = Math.cos(angle) * dist;
    let x1 = p1.x;
    let y1 = p1.y;
    let x2 = p2.x;
    let y2 = p2.y;
    let distt = Math.sqrt(Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2));
    let cRef = canvasRef.current.getContext("2d");
    let mx = 0;
    for (let i = 0; i < pointsPhermone.length; i++) {
      for (let j = 0; j < pointsPhermone[i].length; j++)
        mx = Math.max(mx, pointsPhermone[i][j]);
    }
    if (color === 1) color = null;
    let opacity = PHERMONE_UNIT;
    // if (color === "black") {
    //   color = null;
    //   opacity = parseFloat(pointsPhermone[xi][yi] * 0.5);
    //   console.log(xi, yi, pointsPhermone[xi][yi], opacity);
    // }
    //cRef.fillStyle = "rgb(0, 191, 255," + opacity + ")";
    cRef.fillStyle = COLOR;
    cRef.globalAlpha = 0.1;

    if (color === "red" || color === "green") {
      cRef.globalAlpha = 1;
      cRef.fillStyle = color;
    }

    for (let t = 0; t <= distt / dist; t++) {
      // eslint-disable-next-line no-loop-func
      setTimeout(() => {
        // if (color === "blue") {
        //   opacity *= 0.5;
        //   cRef.fillStyle = "rgb(0, 191, 255," + opacity + ")";
        //   cRef.clearRect(x1, y1, 3, 3);
        // }
        if (color === "red" || color === "green") cRef.fillRect(x1, y1, 6, 6);
        else cRef.fillRect(x1, y1, 3, 3);
        x1 += dx;
        y1 += dy;
      }, t * speed);
    }
  };

  //clear line from p1 to p2
  const clearLine = (p1, p2) => {
    let angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);
    let dist = JUMP;
    let dy = Math.sin(angle) * dist;
    let dx = Math.cos(angle) * dist;
    let x1 = p1.x;
    let y1 = p1.y;
    let x2 = p2.x;
    let y2 = p2.y;
    let distt = Math.sqrt(Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2));
    let cRef = canvasRef.current.getContext("2d");
    for (let t = 0; t <= distt / dist; t++) {
      // eslint-disable-next-line no-loop-func
      setTimeout(() => {
        cRef.clearRect(x1, y1, 3, 3);
        x1 += dx;
        y1 += dy;
      }, t * speed);
    }
  };

  //choose next city using ACO
  const heuristic = (p, cities, antindex) => {
    let chooseFromcities = new Map();
    let new_city = 0;
    for (let i = 0; i < cities.length; i++) {
      if (i === p || antFlag[i][antindex] === true) continue;
      chooseFromcities.set(new_city++, i);
    }

    ////console.log(chooseFromcities);

    let probability = [];
    let totalProb = 0;
    for (let [key, city] of chooseFromcities) {
      ////console.log(pointsPhermone[p][city]);
      let firstFactor = Math.pow(parseFloat(pointsPhermone[p][city]), ALPHA);
      let secondFactor = Math.pow(
        parseFloat(1 / distBtwPoints(cities, p, city)),
        BETA
      );
      //console.log("factors", firstFactor, secondFactor);
      let val = parseFloat(firstFactor * secondFactor);
      //console.log("probable value", val);
      probability.push(val);
      totalProb = parseFloat(totalProb + probability[key]);
    }

    if (probability.length === 0) return p;
    //console.log("total prob", totalProb);
    if (totalProb !== 0) {
      for (let i = 0; i < probability.length; i++) {
        probability[i] = parseFloat(probability[i] / totalProb);
      }
    } else {
      let city = chooseFromcities.get(
        parseInt(Math.random() * (probability.length - 1))
      );
      //console.log(city);
      return city;
    }
    //console.log(probability);
    let cumuProb = [];
    cumuProb.push(probability[0]);
    for (let i = 1; i < probability.length; i++) {
      cumuProb.push(probability[i] + cumuProb[i - 1]);
    }

    //console.log(cumuProb);

    let approxRandomSelectedCity =
      Math.random() * cumuProb[probability.length - 1];

    for (let i = 0; i < cumuProb.length; i++) {
      if (approxRandomSelectedCity < cumuProb[i]) {
        //console.log(p, chooseFromcities.get(i), approxRandomSelectedCity);
        return chooseFromcities.get(i);
      }
    }
    //console.log(
    //  p,
    //  chooseFromcities.get(probability.length - 1),
    //  approxRandomSelectedCity
    //);
    return chooseFromcities.get(probability.length - 1);
  };

  const startACO = (
    p,
    t,
    cities,
    antindex,
    color,
    cityArr,
    distanceCovered
  ) => {
    let next = heuristic(p, cities, antindex);
    while (next !== p) {
      // eslint-disable-next-line no-loop-func
      console.log(next);
      cityArr.push(next);
      distanceCovered += distBtwPoints(cities, p, next);
      let temp = [...antFlag];
      temp[p][antindex] = true;
      setAntFlag(temp);
      let phermone2D = [...pointsPhermone];
      phermone2D[p][next] += PHERMONE_UNIT;
      phermone2D[next][p] += PHERMONE_UNIT;
      setTPointsPhermone(phermone2D);
      // eslint-disable-next-line no-loop-func
      //setTimeout(() => {
      //createLine(cities[p], cities[next], color);
      //}, t);
      t += distBtwPoints(cities, p, next) * speed;
      p = next;
      next = heuristic(p, cities, antindex);
    }

    console.log("arr", cityArr);
    testPath(1, cityArr);

    cityArr.push(antindex % points.length);
    distanceCovered += distBtwPoints(cities, p, antindex % points.length);
    let temp_antDescrip = antDescrip;
    let info = [];
    info.push(antindex);
    info.push(cityArr);
    info.push(distanceCovered);
    info.push(t);
    temp_antDescrip.set(antindex, info);
    setAntDescrip(temp_antDescrip);
    let phermone2D = [...pointsPhermone];
    phermone2D[p][antindex % points.length] += PHERMONE_UNIT;
    phermone2D[antindex % points.length][p] += PHERMONE_UNIT;
    setTPointsPhermone(phermone2D);

    //setTimeout(() => {
    //createLine(cities[p], cities[antindex % points.length], color);
    //}, t);
  };

  //Starts actual Ant Colony Optimisation
  // const startACO2 = (
  //   p,
  //   t,
  //   cities,
  //   antindex,
  //   color,
  //   cityArr,
  //   distanceCovered
  // ) => {
  //   ////console.log(antindex, t);
  //   let done = false;
  //   let next = p;
  //   next = heuristic(p, cities, antindex);
  //   //////console.log("City to", next);
  //   if (next !== p) {
  //     cityArr.push(next);
  //     distanceCovered += distBtwPoints(cities, p, next);
  //   }
  //   if (next === p) {
  //     done = true;
  //     distanceCovered += distBtwPoints(cities, p, antindex % points.length);
  //     let temp_antDescrip = antDescrip;
  //     let info = [];
  //     info.push(antindex);
  //     info.push(cityArr);
  //     info.push(distanceCovered);
  //     info.push(t);
  //     temp_antDescrip.set(antindex, info);
  //     setAntDescrip(temp_antDescrip);
  //   }
  //   let temp = [...antFlag];
  //   temp[p][antindex] = true;
  //   setAntFlag(temp);
  //   if (done === true) {
  //     let phermone2D = [...pointsPhermone];
  //     phermone2D[p][antindex % points.length] += PHERMONE_UNIT;
  //     phermone2D[antindex % points.length][p] += PHERMONE_UNIT;
  //     setPointsPhermone(phermone2D);
  //     createLine(cities[p], cities[antindex % points.length], color);
  //     let timer =
  //       t * speed + distBtwPoints(cities, p, antindex % points.length) * speed;
  //     setTimeout(() => {
  //       return;
  //     }, timer);
  //   } else {
  //     let phermone2D = [...pointsPhermone];
  //     phermone2D[p][next] += PHERMONE_UNIT;
  //     phermone2D[next][p] += PHERMONE_UNIT;
  //     setPointsPhermone(phermone2D);
  //     createLine(cities[p], cities[next], color);
  //     let timer = t * speed + distBtwPoints(cities, p, next) * speed;
  //     ////console.log(p, next, distBtwPoints(cities, p, next));
  //     setTimeout(() => {
  //       startACO(
  //         next,
  //         timer,
  //         cities,
  //         antindex,
  //         color,
  //         cityArr,
  //         distanceCovered
  //       );
  //     }, timer);
  //   }
  // };

  const ACO = () => {
    if (points.length === 0) return;

    let temp2 = [...antFlag];
    for (let i = 0; i < temp2.length; i++) {
      for (let j = 0; j < temp2[i].length; j++) {
        temp2[i][j] = false;
      }
    }
    setAntFlag(temp2);

    let temp = [...tpointsPhermone];
    for (let i = 0; i < pointsPhermone.length; i++) {
      for (let j = 0; j < pointsPhermone.length; j++) {
        temp[i][j] *= EVAPORAION_RATE;
      }
    }

    let highestTimeoutId = setTimeout(";"); // to stop all setTimeouts!
    for (let i = 0; i < highestTimeoutId; i++) {
      clearTimeout(i);
    }

    setPointsPhermone(temp);
    setTPointsPhermone(temp);
    setIte(ite + 1);

    setShow(false);

    setCOLOR("#" + Math.floor(Math.random() * 16777215).toString(16));
    for (let i = 0; i < ants; i++) {
      let temp = [];
      temp.push(i % points.length);
      startACO(i % points.length, 0, points, i, null, temp, 0); //start_city,initalTimer,cities[],index,NEXT_CITY_arr[],distance
    }
  };

  return (
    <div className="App">
      <div style={{ margin: "10px", fontSize: "16px", color: "blue" }}>
        Travelling Salesman Problem using - Ant Colony Optimisation (ACO)
      </div>
      <div style={{ margin: "10px", fontSize: "12px" }}>
        10 Ants explore around with each click of "Start ACO..." and find the
        better path in every iteration!!
      </div>
      <div style={{ margin: "10px", fontSize: "12px", fontWeight: "bold" }}>
        This NP Hard Problem uses heuristic approach to find better approximate
        solution
      </div>
      <div style={{ margin: "10px", fontSize: "12px" }}>
        Probability for an ant to select a city = ((phermone amount deposited on
        a edge)^ALPHA*(distance of that edge)^BETA)/Sum of the Numerator factor
        for all edges(in path of ant)
      </div>
      <div
        style={
          window.innerWidth > 768
            ? {
                display: "flex",
                justifyContent: "center",
                margin: "10px",
                fontSize: "10px",
              }
            : {
                justifyContent: "center",
                margin: "10px",
                fontSize: "10px",
              }
        }
      >
        <button style={{ margin: "10px" }} onClick={() => ACO()}>
          Start ACO {ite + 1} Iteration
        </button>
        {/* <button onClick={() => evap()}>Evaporate...</button>
        <button
          onClick={() => {
            setPoints([]);
            canvasRef.current.getContext("2d").clearRect(0, 0, 1800, 950);
          }}
        >
          Clear Canvas
        </button> */}
        {/* <div>
          Rate(1-60 milliseconds):
          <input
            type="number"
            value={speed}
            onChange={(e) => {
              setSpeed(e.target.value);
            }}
            min="1"
            max="50"
          />
        </div> */}
        {/* <div>
          No. of Ants
          <input
            type="number"
            value={ants}
            onChange={(e) => {
              setAnts(e.target.value);
            }}
          />
        </div> */}
        <div style={{ margin: "10px" }}>
          <span style={{ margin: "10px" }}> ALPHA </span>
          <input
            type="number"
            value={ALPHA}
            onChange={(e) => {
              setALPHA(e.target.value);
            }}
            min="1"
            max="50"
          />
        </div>
        <div style={{ margin: "10px" }}>
          <span style={{ margin: "10px" }}> BETA </span>
          <input
            type="number"
            value={BETA}
            onChange={(e) => {
              setBETA(e.target.value);
            }}
            min="1"
            max="50"
          />
        </div>
        <div style={{ margin: "10px" }}>
          <span style={{ margin: "10px" }}>
            Evaporation rate of phermone(0-100)(in %)
          </span>
          <input
            type="number"
            value={EVAPORAION_RATE * 100}
            onChange={(e) => {
              setEVAPORAION_RATE(e.target.value / 100);
            }}
            min="1"
            max="100"
          />
        </div>
        <button style={{ margin: "10px" }} onClick={() => testPath(5, points)}>
          Make Lines
        </button>
        {/* <button onClick={() => testPath(2, points)}>Clear Lines</button>
        <button onClick={() => testPath(0, points)}>Move point</button> */}
        <button style={{ margin: "10px" }} onClick={() => plotMin()}>
          Show min
        </button>
        <button style={{ margin: "10px" }} onClick={() => plotMax()}>
          Show max
        </button>
      </div>
      <div>
        <canvas
          ref={canvasRef}
          width={window.innerWidth > 768 ? window.innerWidth : "400px"}
          height={window.innerWidth > 768 ? window.innerHeight / 2 : "500px"}
          style={{ border: "2px solid black", backgroundColor: "black" }}
          onClick={(e) => plotCityandInit(e)}
        ></canvas>
        <div>
          Iteration: {ite}
          {[...antDescrip].map((ant) => {
            return (
              <div>
                <div>
                  <span style={{ margin: "10px", fontSize: "12px" }}>
                    🐜 {ant[1][0] + 1} : Tour: |
                  </span>
                  {ant[1][1].map((c) => (
                    <span style={{ margin: "10px", fontSize: "12px" }}>
                      {c}
                    </span>
                  ))}
                  {/* <span>Time: {ant[1][3]} </span> */}
                  <span style={{ margin: "10px", fontSize: "12px" }}>
                    | distance covered: {ant[1][2]} units
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ margin: "10px", fontSize: "12px", color: "red" }}>
          * Each iteration is shown by different color.
        </div>
        <div style={{ margin: "10px", fontSize: "12px", color: "green" }}>
          * Once all the tour distances covered are equal, we can't get a more
          better solution
        </div>
      </div>
    </div>
  );
}

export default App;
