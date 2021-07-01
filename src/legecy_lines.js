// function drawLines() {
//   for (let i = 1; i < points.length; i++) {
//     setTimeout(() => {
//       canvasRef.current.getContext("2d").beginPath();
//       canvasRef.current
//         .getContext("2d")
//         .moveTo(points[i - 1].x, points[i - 1].y);
//       canvasRef.current.getContext("2d").lineTo(points[i].x, points[i].y);
//       canvasRef.current.getContext("2d").strokeStyle =
//         "#" + Math.floor(Math.random() * 16777215).toString(16);
//       canvasRef.current.getContext("2d").stroke();
//     }, i * speed);
//   }
// }

// const draw_line = (p1, p2) => {
//   let x1 = p1.x;
//   let x2 = p2.x;
//   let d = 1;
//   if (p2.y < p1.y) d = -1;
//   let diff = Math.abs(p2.x - p1.x);
//   if (diff === 0) {
//     let m = (p2.y - p1.y) / (p2.x - p1.x);
//     if (x1 < x2) {
//       for (let x = x1; x <= x2; x++) {
//         setTimeout(() => {
//           canvasRef.current.getContext("2d").fillStyle = "#FFFFFF";
//           canvasRef.current
//             .getContext("2d")
//             .fillRect(x, parseInt((x - x1) * m + p1.y), 3, 3);
//           canvasRef.current
//             .getContext("2d")
//             .clearRect(x, parseInt((x - x1) * m + p1.y), 3, 3);
//         }, (x - x1) * speed);
//       }
//     } else {
//       for (let x = x1; x >= x2; x--) {
//         setTimeout(() => {
//           canvasRef.current.getContext("2d").fillStyle = "#FFFFFF";
//           canvasRef.current
//             .getContext("2d")
//             .fillRect(x, parseInt((x - x1) * m + p1.y), 3, 3);
//           canvasRef.current
//             .getContext("2d")
//             .clearRect(x + 1, parseInt((x + 1 - x1) * m + p1.y), 3, 3);
//         }, (x1 - x) * speed);
//       }
//     }
//   } else {
//     let y1 = p1.y;
//     let y2 = p2.y;
//     let m_ = (p2.x - p1.x) / (p2.y - p1.y);
//     if (y1 < y2) {
//       for (let y = y1; y <= y2; y++) {
//         setTimeout(() => {
//           canvasRef.current.getContext("2d").fillStyle = "#FFFFFF";
//           canvasRef.current
//             .getContext("2d")
//             .fillRect(parseInt((y - y1) * m_ + x1), y, 3, 3);
//           canvasRef.current
//             .getContext("2d")
//             .clearRect(parseInt((y - 1 - y1) * m_ + x1), y - 3, 3, 1);
//         }, (y - y1) * speed);
//       }
//     } else {
//       for (let y = y1; y >= y2; y--) {
//         setTimeout(() => {
//           canvasRef.current.getContext("2d").fillStyle = "#FFFFFF";
//           canvasRef.current
//             .getContext("2d")
//             .fillRect(parseInt((y - y1) * m_ + x1), y, 3, 3);
//           canvasRef.current
//             .getContext("2d")
//             .clearRect(parseInt((y + 1 - y1) * m_ + x1), y + 3, 3, 1);
//         }, (y1 - y) * speed);
//       }
//     }
//   }
// };

// function makeLine(event) {
//   for (let i = 50; i < 752; i++) {
//     setTimeout(() => {
//       canvasRef.current.getContext("2d").fillStyle = "#FFFFFF";
//       canvasRef.current.getContext("2d").fillRect(i, i, 3, 3);
//       canvasRef.current.getContext("2d").fillStyle = "#282c34";
//       canvasRef.current.getContext("2d").fillRect(i - 1, i - 3, 3, 1);
//       console.log(i);
//     }, (i - 48) * speed);
//   }
// }

// function makeLineInt(event) {
//   let i = 50;
//   setInterval(() => {
//     canvasRef.current.getContext("2d").fillStyle = "#FFFFFF";
//     canvasRef.current.getContext("2d").fillRect(i, i, 3, 3);
//     canvasRef.current.getContext("2d").fillStyle = "#282c34";
//     canvasRef.current.getContext("2d").fillRect(i - 1, i - 3, 3, 1);
//     console.log(i);
//     i++;
//   }, speed);
// }

//choose just nearest point to move
//  const chooseNearest = (p, t, cities, antindex) => {
//     let done = false;
//     let next = p;
//     let mx = Math.min();
//     for (let i = 0; i < cities.length; i++) {
//       if (i === p || antFlag[i][antindex] === true) continue;
//       let distance = distBtwPoints(cities, p, i);
//       if (distance < mx) {
//         mx = distance;
//         next = i;
//       }
//     }
//     if (next !== p) setTotalDistance(totalDistance + mx);
//     if (next === p) {
//       done = true;
//     }
//     let temp = antFlag;
//     temp[p][antindex] = true;
//     setAntFlag(temp);
//     if (done === true) {
//       let phermone2D = [...pointsPhermone];
//       phermone2D[p][antindex % points.length] += PHERMONE_UNIT;
//       phermone2D[antindex % points.length][p] += PHERMONE_UNIT;
//       setPointsPhermone(phermone2D);
//       setTimeout(() => {
//         if (withPhermone) {
//           createLine(cities[p], cities[antindex % points.length]);
//         } else {
//           movePointA2B(cities[p], cities[antindex % points.length]);
//         }
//       }, t);
//       ////console.log(pointsPhermone);
//       return;
//     }
//     let phermone2D = [...pointsPhermone];
//     phermone2D[p][next] += PHERMONE_UNIT;
//     phermone2D[next][p] += PHERMONE_UNIT;
//     setPointsPhermone(phermone2D);
//     setTimeout(() => {
//       if (withPhermone) {
//         createLine(cities[p], cities[next]);
//       } else {
//         movePointA2B(cities[p], cities[next]);
//       }
//     }, t);
//     let timer = t * speed + distBtwPoints(cities, p, next) * speed;
//     chooseNearest(next, timer, cities, antindex);
//   };
