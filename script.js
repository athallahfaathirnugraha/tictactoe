let turn = "x";
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
  const element = e.currentTarget;
  
  const x = parseInt(element.getAttribute("x"));
  const y = parseInt(element.getAttribute("y"));

  if (board[y][x] !== "") return;

  board[y][x] = turn;

  switch (turn) {
    case "x":
      addX(e.currentTarget.children[0]);
      turn = "o";
      break;
    case "o":
      addCircle(e.currentTarget.children[0]);
      turn = "x";
      break;
  }

  const win = checkWin(board);
  console.log(win);

  if (win !== null) {
    alert(`${win} won`);
  }
}

function addX(svg) {
  const xSvg = "<line x1=\"0\" y1=\"0\" x2=\"100%\" y2=\"100%\" /><line x1=\"100%\" y1=\"0\" x2=\"0\" y2=\"100%\" />";
  svg.innerHTML = xSvg;
}

function addCircle(svg) {
  const circleSvg = "<circle cx=\"50%\" cy=\"50%\" r=\"50%\" fill=\"none\" />"
  svg.innerHTML = circleSvg;
}

function checkWin(board) {
  // horizontal
  for (let i = 0; i < 3; i++) {
    if (board[i][0] === "" || board[i][1] === "" || board[i][2] === "") break;
    if (board[i][0] === board[i][1] && board[i][1] === board[i][2]) return board[i][0];
  }

  // vertical
  for (let i = 0; i < 3; i++) {
    if (board[0][i] === "" || board[1][i] === "" || board[2][i] === "") break;
    if (board[0][i] === board[1][i] && board[1][i] === board[2][i]) return board[0][i];
  }

  // diagonal
  if (board[0][0] === "" || board[1][1] === "" || board[2][2] === "" || board[0][2] === "" || board[2][0] === "") return null;

  if (
    board[0][0] === board[1][1] && board[1][1] === board[2][2] ||
    board[0][2] === board[1][1] && board[1][1] === board[2][0]
  ) {
    return board[0][0];
  }

  return null;
}
