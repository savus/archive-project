const alphabetList = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const player1Id = "player-1";
const player1 = document.getElementById(player1Id);
const boardSymbols = {
  empty: "-",
  occupied: "H",
  hit: "X",
  miss: "O",
};

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

const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));

const validatePlacement = (grid, col, row, ship) => {
   for (let i = 0; i < ship.length; i++) {
      const indexX = (ship.isHorizontal) ? i : 0;
      const indexY = (!ship.isHorizontal) ? i : 0;
      if (grid[col + indexY][row + indexX].status !== 'empty') return false;
   }
   return true;
};

const placePieces = (grid, col, row, ship) => {
   for (let i = 0; i < ship.length; i++) {
      const indexX = (ship.isHorizontal) ? i : 0;
      const indexY = (!ship.isHorizontal) ? i : 0;
      grid[col + indexY][row + indexX].status = 'occupied';
   }
}

const placeShip = (parent, grid, ship) => {
   let row = getRandomInt(grid.length);
   let col = getRandomInt(grid.length);
   let direction = (ship.isHorizontal) ? row : col;

   //Keep ship within grid walls
   if (direction + ship.length > grid.length) {
      (ship.isHorizontal) ? row = grid.length - ship.length : col = grid.length - ship.length
   }

   //if all placements are not valid, recur placeShip function
   if (!validatePlacement(grid, col, row, ship)) return placeShip(parent, grid, ship);

   placePieces(grid, col, row, ship);

   redrawGrid(parent, grid)

}

class Ship {
   constructor(name, length) {
      this.name = name;
      this.length = length;
      this.isHorizontal = Math.random() <= 0.5;
      this.lives = this.length;
   }
}

const shipData = [
   {name: 'destroyer', length: 2}, 
   {name: 'submarine', length: 3}, 
   {name: 'cruiser', length: 3}, 
   {name: 'battleship', length: 4}, 
   {name: 'carrier', length: 5}, 
];

const ships = [];

shipData.forEach((data) => ships.push(new Ship(data.name, data.length)));

let numberOfShips = ships.length;

const player1Message = document.getElementById('player-1-grid-message');
player1Message.innerText = 'Mew';
const player1Input = document.getElementById('player-1-grid-prompt');
player1Input.setAttribute('placeholder', 'mew');
const promptButton = document.getElementById('button-prompt');


const attackResults = (grid, y, x) => grid[y][x].status;

const relayResults = (results) => {
  const messageOutcomes = {
    'empty': () => 'You missed!',
    'occupied': () => 'That\'s a hit!',
    'hit': () => 'You struck this area before! Miss!',
    'miss': () => 'You missed this area before! Miss!'
  }
  return messageOutcomes[results]();
}

const convertResults = (str) => {
  const convertedStr = str.toLowerCase();
  const firstCoord = alphabetList.toLowerCase().indexOf(convertedStr[0]);
  const secondCoord = convertedStr[convertedStr.length - 1];
  return [firstCoord, secondCoord];
}

const commenceAttack = (coords) => {
  const grid = grid1;
  const parent = player1;
  const [alteredCol, alteredRow] = convertResults(coords);
  const results = attackResults(grid, alteredCol, alteredRow);  
  player1Message.innerText = relayResults(results);

  const outcomes = {
    'empty' : () => 'miss',
    'occupied' : () => 'hit',
    'miss' : () => 'miss',
    'hit' : () => 'hit'
  }

  const newBoardSymbol = outcomes[results]();

  grid[alteredCol][alteredRow].status = newBoardSymbol;

  redrawGrid(parent, grid);
}

promptButton.addEventListener('click', function() {
  const inputValue = player1Input.value.replaceAll(' ', '');
  commenceAttack(inputValue);
});

const grid1 = createGrid(10);

drawGrid(player1, grid1);

ships.forEach((ship) => placeShip(player1, grid1, ship));
// const alphabetList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
// const player1Id = 'player-1';
// const player1 = document.getElementById(player1Id);
// const boardSymbols = {
//    'empty': ' -- ',
//    'hit': 'X',
//    'miss': 'O',
//    'occupied': 'H'
// };

// const createGrid = (gridSize) => {
//    const grid = [];
//    for (let i = 0; i < gridSize; i++) {
//       grid[i] = [];
//       for (let j = 0; j < gridSize; j++) {
//          grid[i][j] = {x: j, y: i, status: "empty"};
//       }
//    }
//    return grid;
// };

// const grid = createGrid(10);

// const createHeader = (grid) => {
//    let header = `<div class='board-header'> `;
//    for (let i = 0; i < grid.length; i++) {
//       header += ` | ${alphabetList[i]}`;
//    }
//    header += '</div>';
//    return header;
// }

// const drawGrid = (element, grid) => {
//    let child = '<div>';
//    const header = createHeader(grid);
//    child += ` ${header} `;
//    for (let i = 0; i < grid.length; i++) {
//       let gridRow = `<div>${i + 1} |`;
//       for (let cell of grid[i]) {
//          gridRow += ` ${boardSymbols[cell.status]} |`;
//       }
//       gridRow += '</div>';
//       child += gridRow;
//    }
//    child += '</div>';
//    element.innerHTML = child;
// };

// drawGrid(player1, grid);

// const shipData = [
//    {name: 'destroyer', length: 2},
//    {name: 'submarine', length: 3},
//    {name: 'cruiser', length: 3},
//    {name: 'battleship', length: 4},
//    {name: 'carrier', length: 5}
// ];

// class Ship {
//    constructor(name, length) {
//       this.name = name;
//       this.length = length;
//    }
// }

// const createShips = () => {
//    return shipData.map((stat) => new Ship(stat.name, stat.length));
// }

// const player1Ships = createShips();
