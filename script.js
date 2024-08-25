const tds = document.getElementsByTagName("td");

for (const td of tds) {
  td.addEventListener("click", onClick);
}

function onClick(e) {
  addX(e.currentTarget.children[0]);
}

function addX(svg) {
  const xSvg = "<line x1=\"0\" y1=\"0\" x2=\"100%\" y2=\"100%\" /><line x1=\"100%\" y1=\"0\" x2=\"0\" y2=\"100%\" />";
  svg.innerHTML = xSvg;
}
