const alphabetList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const player1Id = 'player-1';
const player1 = document.getElementById(player1Id);
const boardSymbols = {
   'empty' : '-',
   'occupied' : 'H',
   'hit' : 'X',
   'miss' : 'O'
};



const createGrid = (gridSize) => {
   const grid = [];
   for (let i = 0; i <= gridSize; i++) {
      grid[i] = [];
      for (let j = 0; j <= gridSize; j++) {
         grid[i][j] = {x: j, y: i, status: 'empty'};
      }
   }
   return grid;
}

const createHeaders = (grid) => {
   const headerRow = document.createElement('div');
   headerRow.classList.add('cell-row');

   const firstCell = document.createElement('div');
   firstCell.innerText = '-';

   headerRow.appendChild(firstCell);

   for (let i = 0; i <= grid.length; i++) {
      const cell = document.createElement('div');
      cell.innerText = alphabetList[i];
      headerRow.appendChild(cell);
   }
   
   return headerRow;
};

const drawGrid = (parent, grid) => {
   const header = createHeaders(grid);
   parent.appendChild(header);
   for (let i = 0; i < grid.length; i++) {
      const cellRow = document.createElement('div');
      cellRow.classList.add('cell-row');
      
      const firstCell = document.createElement('div');
      firstCell.innerText = i;
      cellRow.appendChild(firstCell);

      for (const cell of grid[i]) {
         const cellDiv = document.createElement('div');
         cellDiv.innerText = boardSymbols[cell.status];
         cellRow.appendChild(cellDiv);
      }

      parent.appendChild(cellRow);
   }
}

const grid1 = createGrid(alphabetList.length - 2);

drawGrid(player1, grid1);




















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


