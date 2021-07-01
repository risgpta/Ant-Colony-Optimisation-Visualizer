const distBtwPoints = (points, i, j) => {
  return Math.sqrt(
    Math.pow(points[j].x - points[i].x, 2) +
      Math.pow(points[j].y - points[i].y, 2)
  );
};

export default distBtwPoints;
