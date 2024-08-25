const tds = document.getElementsByTagName("td");

for (const td of tds) {
  td.addEventListener("click", (e) => e.currentTarget.innerHTML = "x");
}
