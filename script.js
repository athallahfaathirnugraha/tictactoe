let turn = "x";
const tds = document.getElementsByTagName("td");

for (const td of tds) {
  td.addEventListener("click", onClick);
}

function onClick(e) {
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
}

function addX(svg) {
  const xSvg = "<line x1=\"0\" y1=\"0\" x2=\"100%\" y2=\"100%\" /><line x1=\"100%\" y1=\"0\" x2=\"0\" y2=\"100%\" />";
  svg.innerHTML = xSvg;
}

function addCircle(svg) {
  const circleSvg = "<circle cx=\"50%\" cy=\"50%\" r=\"50%\" fill=\"none\" />"
  svg.innerHTML = circleSvg;
}
