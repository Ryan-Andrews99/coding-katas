// Enjoy arrow functions
const moveForwards = (coordsWithDirection) => {
  switch (coordsWithDirection[2]) {
    case "S":
      coordsWithDirection[1]--;
      break;
    case "E":
      coordsWithDirection[0]++;
      break;
    case "W":
      coordsWithDirection[0]--;
      break;
    case "N":
      coordsWithDirection[1]++;
      break;
    default:
      throw new Error("invalid direction");
  }
  return coordsWithDirection;
};

const moveBackwards = (coordsWithDirection) => {
  switch (coordsWithDirection[2]) {
    case "S":
      coordsWithDirection[1]++;
      break;
    case "E":
      coordsWithDirection[0]--;
      break;
    case "W":
      coordsWithDirection[0]++;
      break;
    case "N":
      coordsWithDirection[1]--;
      break;
    default:
      throw new Error("invalid direction");
  }
  return coordsWithDirection;
};

const handleDirection = (turnMovement, initialDirection) => {
  if (turnMovement == "L") {
    const leftTurns = {
      N: "W",
      W: "S",
      S: "E",
      E: "N",
    };
    return leftTurns[initialDirection];
  } else {
    const rightTurns = {
      N: "E",
      W: "N",
      S: "W",
      E: "S",
    };
    return rightTurns[initialDirection];
  }
};

const handleMove = (coords, movement) => {
  if (movement == "F") {
    return moveForwards(coords);
  } else if (movement == "B") {
    return moveBackwards(coords);
  }
};

const moveRover = (initialCoords, initialDirection, movements) =>
  movements.reduce(
    (currentCoords, movement) => {
      if (movement === "L" || movement == "R") {
        currentCoords[2] = handleDirection(movement, currentCoords[2]);
        return currentCoords;
      } else if (movement === "F" || movement === "B") {
        currentCoords = handleMove(currentCoords, movement);
        return currentCoords;
      } else {
        throw new Error("invalid movement");
      }
    },
    [...initialCoords, initialDirection],
  );

module.exports = { moveBackwards, moveForwards };
