const alphabetList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const player1Id = 'player-1';
const player1 = document.getElementById(player1Id);
const boardSymbols = {
   'empty': ' -- ',
   'hit': 'X',
   'miss': 'O',
   'occupied': 'H'
};

const createGrid = (gridSize) => {
   const grid = [];
   for (let i = 0; i < gridSize; i++) {
      grid[i] = [];
      for (let j = 0; j < gridSize; j++) {
         grid[i][j] = {x: j, y: i, status: "empty"};
      }
   }
   return grid;
};

const grid = createGrid(10);

const createHeader = (grid) => {
   let header = `<div class='board-header'> `;
   for (let i = 0; i < grid.length; i++) {
      header += ` | ${alphabetList[i]}`;
   }
   header += '</div>';
   return header;
}

const drawGrid = (element, grid) => {
   let child = '<div>';
   const header = createHeader(grid);
   child += ` ${header} `;
   for (let i = 0; i < grid.length; i++) {
      let gridRow = `<div>${i + 1} |`;
      for (let cell of grid[i]) {
         gridRow += ` ${boardSymbols[cell.status]} |`;
      }
      gridRow += '</div>';
      child += gridRow;
   }
   child += '</div>';
   element.innerHTML = child;
};

drawGrid(player1, grid);