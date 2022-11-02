window.addEventListener("load", () => {
  // Variables
  let id = 0;
  let text = "";
  let alert = document.querySelector(".alert");
  let closeBttn = alert.firstElementChild;
  let input = document.querySelector("#task");
  let arrow = document.querySelector(".arrow");
  let done = document.querySelectorAll(".fa-circle-check");
  let trash = document.querySelectorAll(".fa-trash");
  let edit = document.querySelectorAll(".fa-pencil");
  let task = document.querySelectorAll(".task");

  // console.log(input);
  // Events
  // Close the alert
  closeBttn.addEventListener("click", () => {
    alert.classList.toggle("dismissible");
  });
  //sirve para que si el usuario hace enter, no haga nada.
  input.addEventListener("focus", () => {
    document.addEventListener("keydown", (e) => {
      if (e.code == "Enter" || e.code == "NumpadEnter") {
        e.preventDefault();
      }
    });
  });
  arrow.addEventListener("click", (e) => {
    //que no se pueda enviar el input vacío, trim sirve para eliminar espacios al principio/final del string
    if (input.value.trim() == "") {
      // console.log("Empty");
      //que no se pueda enviar vacío
      e.preventDefault(); // Prevent submit
      //que vuelva a poner el input vacío
      input.value = ""; // Reset value
      alert.classList.remove("dismissible");
    } else {
      let text = input.value;
      input.value = "";
      id =
        Number(document.querySelector("tbody")?.lastElementChild?.id) + 1 || 0;
      document.querySelector("tbody").appendChild(generateRow(id, text));
      if (!alert.classList.contains("dismissible")) {
        alert.classList.add("dismissible");
      }
    }
  });
  // console.log(done);
  // done[1].element.addEventListener('click', (e) => {console.log("working");});

  //done item
  done.forEach((item) => {
    item.addEventListener("click", (e) => {
      deleteTask(e);
    });
  });

  //trash item
  trash.forEach((item) => {
    item.addEventListener("click", (e) => {
      removeRow(e, false);
    });
  });

  //edit item
  edit.forEach((item) => {
    item.addEventListener("click", (e) => {
      editTask(e, false);
    });
  });

  task.forEach((item) => {
    item.addEventListener("focus", (e) => {
      editTask(e, true);
    });
  });
});

// Functions
const editTask = (e, onFocus) => {
  let editable = e;
  if (onFocus) {
    // console.log(e.target);
    editable.target.classList.add("editable");
    document.addEventListener("keydown", (e) => {
      console.log(e.code);
      if (e.code == "Escape") {
        editable.target.classList.remove("editable");
        editable.target.blur();
        if (editable.target.innerHTML == "") {
          removeRow(editable, true);
        }
      }
    });
    editable.target.addEventListener("blur", () => {
      editable.target.classList.remove("editable");
      if (editable.target.innerHTML == "") {
        removeRow(editable, true);
      }
    });
  } else {
    let editable =
      e.target.parentNode.parentNode.previousElementSibling.lastElementChild;
    // console.log(editable);
    editable.classList.add("editable");
    editable.focus();
  }
};

const deleteTask = (e) => {
  let task = e.target.nextElementSibling;
  text = task.innerHTML;

  if (text.includes("<del>")) {
    task.innerHTML = task.firstElementChild.textContent;
    task.setAttribute("data-completed", "false");
  } else {
    task.innerHTML = `<del>${text}</del>`;
    task.setAttribute("data-completed", "true");
  }
};

const removeRow = (e, editing) => {
  if (editing) {
    e.target.parentNode.parentNode.remove();
  } else {
    e.target.parentNode.parentNode.parentNode.remove();
  }
};

//Refactorizamos el códogo encapsulando la función
const generateRow = (id, text) => {
  // Creando una nueva fila.
  let newRow = document.createElement("tr");
  newRow.setAttribute("id", id);
  newRow.innerHTML = `
      <td>
      <i class="fa-solid fa-circle-check fa-2x"></i>
      <span
      class="task"
      contenteditable="true">
      ${text}
      </span>
      </td>
      <td>
      <span class="fa-stack fa-2x">
      <i class="fa-solid fa-square fa-stack-2x"></i>
      <i class="fa-solid fa-pencil fa-stack-1x fa-inverse"></i>
      </span>
      </td>
      <td>
      <span class="fa-stack fa-2x">
      <i class="fa-solid fa-square fa-stack-2x"></i>
      <i class="fa-solid fa-trash fa-stack-1x fa-inverse"></i>
      </span>
      </td>
      `;

  newRow.firstElementChild.firstElementChild.addEventListener("click", (e) => {
    deleteTask(e);
  });
  newRow.firstElementChild.lastElementChild.addEventListener("click", (e) => {
    editTask(e, true);
  });
  newRow.firstElementChild.nextElementSibling.firstElementChild.addEventListener(
    "click",
    (e) => {
      editTask(e, false);
    }
  );
  newRow.lastElementChild.firstElementChild.addEventListener("click", (e) => {
    removeRow(e, false);
  });

  return newRow;
};
// window.addEventListener("load", () => {
//   // Variables
//   let id = 0;
//   let text = "";
//   let alert = document.querySelector(".alert");
//   let closeBttn = alert.firstElementChild;
//   let input = document.querySelector("#task");
//   let arrow = document.querySelector(".arrow");
//   let done = document.querySelectorAll(".fa-circle-check");
//   let trash = document.querySelectorAll(".fa-trash");
//   let edit = document.querySelectorAll(".fa-pencil");
//   let task = document.querySelectorAll(".task");
//   // console.log(input);
//   // Events
//   // Close the alert
//   closeBttn.addEventListener("click", () => {
//     alert.classList.toggle("dismissible");
//   });
//   input.addEventListener("focus", () => {
//     document.addEventListener("keydown", (e) => {
//       if (e.code == "Enter" || e.code == "NumpadEnter") {
//         e.preventDefault();
//       }
//     });
//   });
//   arrow.addEventListener("click", (e) => {
//     // ELiminar los espacios al principio y al final del string.
//     if (input.value.trim() == "") {
//       console.log("Empty");
//       e.preventDefault(); // Prevent submit
//       input.value = ""; // Reset value
//       alert.classList.remove("dismissible");
//     } else {
//       let text = input.value;
//       input.value = "";
//       id =
//         Number(document.querySelector("tbody")?.lastElementChild?.id) + 1 || 0;

//       document.querySelector("tbody").appendChild(generateRow(id, text));
//       if (!alert.classList.contains("dismissible")) {
//         alert.classList.add("dismissible");
//       }
//     }
//   });
//   // done.addEventListener("click", (e) =>{
//   //   console.log("working");
//   // })
//   done.forEach((item) => {
//     item.addEventListener("click", (e) => {
//       deleteTask(e);
//     });
//   });
//   trash.forEach((item) => {
//     item.addEventListener("click", (e) => {
//       // deleteTask(e);
//       removeRow(e, false);
//     });
//   });
//   edit.forEach((item) => {
//     item.addEventListener("click", (e) => {
//       editTask(e, false);
//     });
//   });
//   task.forEach((item) => {
//     item.addEventListener("focus", (e) => {
//       editTask(e, true);
//     });
//   });
// });

// //Functions
// const editTask = (e, onFocus) => {
//   let editable = e;
//   if (onFocus) {
//     // console.log(e.target);
//     e.target.classList.add("editable");
//     document.addEventListener("keydown", (e) => {
//       // console.log(e.code);
//       if (e.code == "Escape") {
//         editable.target.classList.remove("editable");
//         editable.target.blur();
//         if (editable.target.innerHTML == "") {
//           removeRow(editable, true);
//         }
//       }
//     });
//     editable.target.addEventListener("blur", () => {
//       editable.target.classList.remove("editable");
//       if (editable.target.innerHTML == "") {
//         removeRow(editable, true);
//       }
//     });
//   } else {
//     let editable =
//       e.targt.parentNode.parentNode.previousElementSibling.lastElementChild;

//     editable.classList.add("editable");
//     editable.focus();
//   }
// };

// const deleteTask = (e) => {
//   let task = e.target.nextElementSibling;
//   text = task.innerHTML;

//   if (text.includes("<del>")) {
//     task.innerHTML = task.firstElementChild.textContent;
//     task.setAttribute("data-complete", "false");
//   } else {
//     task.innerHTML = `<del>${text}</del>`;
//     task.setAttribute("data-complete", "true");
//   }
// };

// const removeRow = (e, editing) => {
//   if (editing) {
//     e.target.parentNode.parentNode.remove();
//   } else {
//     e.target.parentNode.parentNode.parentNode.remove();
//   }
// };

// const generateRow = (id, text) => {
//   // Creando una nueva fila.
//   let newRow = document.createElement("tr");
//   newRow.setAttribute("id", id);
//   newRow.innerHTML = `
//      <td>
//      <i class="fa-solid fa-circle-check fa-2x"></i>
//      <span
//      class="task"
//      contenteditable="true">
//      ${text}
//      </span>
//      </td>
//      <td>
//      <span class="fa-stack fa-2x">
//      <i class="fa-solid fa-square fa-stack-2x"></i>
//      <i class="fa-solid fa-pencil fa-stack-1x fa-inverse"></i>
//      </span>
//      </td>
//      <td>
//      <span class="fa-stack fa-2x">
//      <i class="fa-solid fa-square fa-stack-2x"></i>
//      <i class="fa-solid fa-trash fa-stack-1x fa-inverse"></i>
//      </span>
//      </td>
//      `;
//   newRow.firstElementChild.firstElementChild.addEventListener("click", (e) => {
//     deleteTask(e);
//   });
//   newRow.firstElementChild.lastElementChild.addEventListener("click", (e) => {
//     editTask(e, true);
//   });
//   newRow.firstElementChild.nextElementSibling.firstElementChild.addEventListener(
//     "click",
//     (e) => {
//       editTask(e, false);
//     }
//   );
//   newRow.lastElementChild.firstElementChild.addEventListener("click", (e) => {
//     removeRow(e, false);
//   });
//   return newRow;
// };
