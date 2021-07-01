// //Starts actual Ant Colony Optimisation
// const startACO = (p, t, cities, antindex, color, cityArr, distanceCovered) => {
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
//       startACO(next, timer, cities, antindex, color, cityArr, distanceCovered);
//     }, timer);
//   }
// };
