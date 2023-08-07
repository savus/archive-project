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
    cell.innerText = alphabetList[i];
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
    firstCell.innerText = i;
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
      ship.locations.push({y : col + indexY, x : row + indexX})
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
      this.locations = [];
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

const logShipLocations = (shipList) => {
   shipList.forEach((ship) => {
      console.log(ship.name);
      for (let location of ship.locations) {
         console.log('x: ' + location.x, 'y: ' + location.y);
      }
   })
}

const grid1 = createGrid(10);

drawGrid(player1, grid1);

ships.forEach((ship) => placeShip(player1, grid1, ship))
