window.addEventListener("load", () => {
  let id = 0;
  let text = "";
  let alert = document.querySelector(".alert");
  let close = alert.firstChild;
  let input = document.querySelector("#task");
  close.addEventListener("click", () => {
    alert.classList.add("dismissible");
  });
  input.addEventListener("focus", () => {
    document.addEventListener("keydown", (event) => {
      event.preventDefault();
      console.log(event.code);
      if (event.code == "enter" || event.code == "numpadEnter") {
        event.preventDefault();
      }
    });
  });
});
