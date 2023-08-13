const alphabetList = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const player1Id = "player-1";
const player1 = document.getElementById(player1Id);
const computerId = "computer";
const computer = document.getElementById(computerId);
const boardSymbols = {
  empty: "-",
  occupied: "H",
  hit: "X",
  miss: "O",
};
const gridSize = 10;

const createGrid = (gridSize) => {
  const grid = [];
  for (let i = 0; i <= gridSize; i++) {
    grid[i] = [];
    for (let j = 0; j <= gridSize; j++) {
      grid[i][j] = { x: j, y: i, status: "empty" };
    }
  }
  return grid;
};

const createHeaders = (grid) => {
  const headerRow = document.createElement("div");
  headerRow.classList.add("cell-row");

  const firstCell = document.createElement("div");
  firstCell.innerText = "-";

  headerRow.appendChild(firstCell);

  for (let i = 0; i < grid.length; i++) {
    const cell = document.createElement("div");
    cell.innerText = i;
    headerRow.appendChild(cell);
  }

  return headerRow;
};

const drawGrid = (parent, grid) => {
  const header = createHeaders(grid);
  parent.appendChild(header);
  for (let i = 0; i < grid.length; i++) {
    const cellRow = document.createElement("div");
    cellRow.classList.add("cell-row");

    const firstCell = document.createElement("div");
    firstCell.innerText = alphabetList[i];
    cellRow.appendChild(firstCell);

    for (const cell of grid[i]) {
      const cellDiv = document.createElement("div");
      cellDiv.innerText = boardSymbols[cell.status];
      cellRow.appendChild(cellDiv);
    }

    parent.appendChild(cellRow);
  }
};

const eraseGrid = (parent) => {
  parent.innerHTML = "";
};

const redrawGrid = (parent, grid) => {
  eraseGrid(parent);
  drawGrid(parent, grid);
};

class Ship {
  constructor(name, length) {
    this.name = name;
    this.length = length;
    this.isHorizontal = Math.random() <= 0.5;
    this.lives = this.length;
    this.locations = [];
  }
}

const shipData = [
  { name: "destroyer", length: 2 },
  { name: "submarine", length: 3 },
  { name: "cruiser", length: 3 },
  { name: "battleship", length: 4 },
  { name: "carrier", length: 5 },
];

const playerShips = [];
const computerShips = [];

shipData.forEach((data) => {
  playerShips.push(new Ship(data.name, data.length));
  computerShips.push(new Ship(data.name, data.length));
});

let numberOfplayerShips = playerShips.length;
let numberOfComputerShips = computerShips.length;

const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));

const validatePlacement = (grid, col, row, ship) => {
  for (let i = 0; i < ship.length; i++) {
    const indexX = ship.isHorizontal ? i : 0;
    const indexY = !ship.isHorizontal ? i : 0;
    if (grid[col + indexY][row + indexX].status !== "empty") return false;
  }
  return true;
};

const placePieces = (grid, col, row, ship) => {
  for (let i = 0; i < ship.length; i++) {
    const indexX = ship.isHorizontal ? i : 0;
    const indexY = !ship.isHorizontal ? i : 0;
    ship.locations.push({
      x: row + indexX,
      y: col + indexY,
      status: "undamaged",
    });
    grid[col + indexY][row + indexX].status = "occupied";
  }
};

const placeShip = (parent, grid, ship) => {
  let row = getRandomInt(grid.length);
  let col = getRandomInt(grid.length);
  let direction = ship.isHorizontal ? row : col;

  //Keep ship within grid walls
  if (direction + ship.length > grid.length) {
    ship.isHorizontal
      ? (row = grid.length - ship.length)
      : (col = grid.length - ship.length);
  }

  //if all placements are not valid, recur placeShip function
  if (!validatePlacement(grid, col, row, ship))
    return placeShip(parent, grid, ship);

  placePieces(grid, col, row, ship);

  redrawGrid(parent, grid);
};

const player1Message = document.getElementById("player-1-grid-message");
player1Message.innerText = "Please choose a tile to attack (ex. A-5)";
const player1Input = document.getElementById("player-1-grid-prompt");
player1Input.setAttribute("placeholder", "Type here");
const promptButton = document.getElementById("player-1-button-prompt");

const damageShip = (ship, damagedPiece) => {
  if (ship.lives - 1 === 0) {
    numberOfplayerShips--;
    player1Message.innerText = `You sunk a ${ship.name}, ${numberOfplayerShips} remaining!`;
  } else {
    ship.lives--;
    damagedPiece.status = "damaged";
    player1Message.innerText = `You hit a ${ship.name}`;
  }
};

const checkIfHit = (coordsY, coordsX, shipList) => {
  shipList.forEach((ship) => {
    ship.locations.forEach((coords) => {
      if (coords.status !== "damaged") {
        if (coords.x === coordsX && coords.y === coordsY) {
          damageShip(ship, coords);
        }
      }
    });
  });
};

const attackResults = (grid, y, x) => grid[y][x].status;

const relayResults = (results) => {
  const messageOutcomes = {
    empty: () => "You missed!",
    occupied: () => "That's a hit!",
    hit: () => "You struck this area before! Miss!",
    miss: () => "You missed this area before! Miss!",
  };
  return messageOutcomes[results]();
};

const convertResults = (str) => {
  const convertedStr = str.toLowerCase();
  const firstCoord = alphabetList.toLowerCase().indexOf(convertedStr[0]);
  const secondCoord = parseInt(convertedStr[convertedStr.length - 1]);
  return [firstCoord, secondCoord];
};

const commenceAttack = (grid, parent, coords) => {
  const [alteredCol, alteredRow] = convertResults(coords);
  const results = attackResults(grid, alteredCol, alteredRow);
  player1Message.innerText = relayResults(results);

  const outcomes = {
    empty: () => "miss",
    occupied: () => "hit",
    miss: () => "miss",
    hit: () => "hit",
  };

  const newBoardSymbol = outcomes[results]();

  grid[alteredCol][alteredRow].status = newBoardSymbol;

  redrawGrid(parent, grid);

  checkIfHit(alteredCol, alteredRow, playerShips);
};

promptButton.addEventListener("click", function () {
  const inputValue = player1Input.value.replaceAll(" ", "");
  commenceAttack(playerGrid, player1, inputValue);
});

const playerGrid = createGrid(gridSize);
const computerGrid = createGrid(gridSize);

drawGrid(player1, playerGrid);
drawGrid(computer, computerGrid);

playerShips.forEach((ship) => placeShip(player1, playerGrid, ship));
computerShips.forEach((ship) => placeShip(computer, computerGrid, ship));
// const alphabetList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
