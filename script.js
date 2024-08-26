const xSvg = "<line x1=\"0\" y1=\"0\" x2=\"100%\" y2=\"100%\" /><line x1=\"100%\" y1=\"0\" x2=\"0\" y2=\"100%\" />";
const circleSvg = "<circle cx=\"50%\" cy=\"50%\" r=\"50%\" fill=\"none\" />";

const triangleSvg = `
  <line x1="0" y1="100%" x2="100%" y2="100%" />
  <line x1="100%" y1="100%" x2="50%" y2="0" />
  <line x1="50%" y1="0" x2="0" y2="100%" />
`;

let turn = "x";
let finished = false;
const tds = document.getElementsByTagName("td");

let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""]
];

for (const td of tds) {
  td.addEventListener("click", onClick);
}

function onClick(e) {
  if (finished) return;

  const element = e.currentTarget;
  
  const x = parseInt(element.getAttribute("x"));
  const y = parseInt(element.getAttribute("y"));

  if (board[y][x] !== "") return;

  board[y][x] = turn;

  switch (turn) {
    case "x":
      setX(e.currentTarget.children[0]);
      turn = "o";
      break;
    case "o":
      setCircle(e.currentTarget.children[0]);
      turn = "x";
      break;
  }

  const win = checkWin(board);

  if (win !== null) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.id = "win-svg";
    svg.setAttribute("overflow", "visible");

    if (win === "x") {
      svg.innerHTML = xSvg;
    } else if (win === "o") {
      svg.innerHTML = circleSvg;
    } else if (win === "draw") {
      svg.innerHTML = triangleSvg;
    }

    document.body.appendChild(svg);
    document.body.setAttribute("win", "");

    finished = true;
  }
}

// only html, doesn't set the turn/anything else
function setX(svg) {
  svg.innerHTML = xSvg;
}

// only html, doesn't set the turn/anything else
function setCircle(svg) {
  svg.innerHTML = circleSvg;
}

function isFull(board) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === "") return false;
    }
  }

  return true;
}

function checkWin(board) {
  // horizontal
  for (let i = 0; i < 3; i++) {
    if (board[i][0] === "" || board[i][1] === "" || board[i][2] === "") continue;
    if (board[i][0] === board[i][1] && board[i][1] === board[i][2]) return board[i][0];
  }

  // vertical
  for (let i = 0; i < 3; i++) {
    if (board[0][i] === "" || board[1][i] === "" || board[2][i] === "") continue;
    if (board[0][i] === board[1][i] && board[1][i] === board[2][i]) return board[0][i];
  }

  // diagonal
  if (!(board[0][0] === "" || board[1][1] === "" || board[2][2] === "")) {
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
      return board[0][0];
    }
  }

  if (!(board[0][2] === "" || board[1][1] === "" || board[2][0] === "")) {
    if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
      return board[0][2];
    }
  }

  if (isFull(board)) return "draw";

  return null;
}
