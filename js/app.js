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
  input.addEventListener("focus", () => {
    document.addEventListener("keydown", (e) => {
      if (e.code == "Enter" || e.code == "NumpadEnter") {
        e.preventDefault();
      }
    });
  });
  arrow.addEventListener("click", (e) => {
    // ELiminar los espacios al principio y al final del string.
    if (input.value.trim() == "") {
      console.log("Empty");
      e.preventDefault(); // Prevent submit
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
  // done.addEventListener("click", (e) =>{
  //   console.log("working");
  // })
  done.forEach((item) => {
    item.addEventListener("click", (e) => {
      deleteTask(e);
    });
  });
  trash.forEach((item) => {
    item.addEventListener("click", (e) => {
      // deleteTask(e);
      removeRow(e);
    });
  });
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

let editTask = (e, onFocus) => {
  if (onFocus) {
    console.log(e.target);
    e.target.classList.add("editable");
  } else {
    let editable =
      e.targt.parentNode.parentNode.previousElementSibling.lastElementChild;

    editable.classList.add("editable");
    editable.focus();
  }
};

let deleteTask = (e) => {
  let task = e.target.nextElementSibling;
  text = task.innerHTML;

  if (text.includes("<del>")) {
    task.innerHTML = task.firstElementChild.textContent;
    task.setAttribute("data-complete", "false");
  } else {
    task.innerHTML = `<del>${text}</del>`;
    task.setAttribute("data-complete", "true");
  }
};

let removeRow = (e) => {
  e.target.parentNode.parentNode.parentNode.remove();
};

let generateRow = (id, text) => {
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
  return newRow;
};

// window.addEventListener("load", () => {
//   let id = 0; // id of the current task
//   let text = ""; // text of the current task
//   let alert = document.querySelector(".alert"); // alert element
//   let close = alert.firstElementChild; // button element in the alert element
//   let input = document.querySelector("#task"); // input element
//   let arrow = document.querySelector(".arrow"); // arrow element
//   let done = document.querySelectorAll(".fa-circle-check");
//   let trash = document.querySelectorAll(".fa-trash");
//   let edit = document.querySelectorAll(".fa-pencil");
//   let task = document.querySelectorAll(".task");

//   input.addEventListener("focus", () => {
//     document.addEventListener("keydown", (e) => {
//       if (e.code == "Enter" || e.code == "NumpadEnter") {
//         e.preventDefault();
//       }
//     });
//   });

//   input.addEventListener("blur", () => {
//     input.setAttribute("placeholder", "Add a new task");
//   });

//   arrow.addEventListener("click", (e) => {
//     if (input.value.trim() == "") {
//       //trim removes the white spaces
//       e.preventDefault();
//       alert.classList.remove("dismissible");
//       input.value = "";
//     } else {
//       text = input.value;
//       input.value = "";
//       id =
//         Number(document.querySelector("tbody")?.lastElementChild?.id) + 1 || 0;
//       document.querySelector("tbody").appendChild(generateRow(id, text));
//       if (!alert.classList.contains("dismissible")) {
//         alert.classList.add("dismissible");
//       }
//     }
//   });

//   // done.addEventListener('click', (e) => {
//   //   console.log("working");
//   // });

//   done.forEach((item) => {
//     item.addEventListener("click", (e) => {
//       deleteTask(e);
//     });
//   });

//   trash.forEach((item) => {
//     item.addEventListener("click", (e) => {
//       removeRow(e);
//     });
//   });

//   edit.forEach((item) => {
//     item.addEventListener("click", (e) => {
//       editTask(e, false);
//     });
//   });

//   task.forEach((item) => {
//     item.addEventListener("focus",(e) => {
//       editTask(e, true);
//     });
//   });

// });

// let editTask = (e, onFocus) => {

//   if(onFocus){
//     console.log(e.target);

//   }else{
//     let editable = e.target.parentNode.parentNode.previousElementSibling.lastElementChild;
//     console.log(editable);
//     editable.classList.add("editable");
//     editable.focus();
//   }
// }

// let deleteTask = (e) => {
//   let task = e.target.nextElementSibling;
//   text = task.innerHTML;

//   if (text.includes("<del>")) {
//     task.innerHTML = task.firstElementChild.textContent;
//     task.setAttribute("data-completed", "false");
//   } else {
//     task.innerHTML = `<del>${text}</del>`;
//     task.setAttribute("data-completed", "true");
//   }
// };

// let removeRow = (e) => {
//   e.target.parentNode.parentNode.parentNode.remove();
// };

// let generateRow = (id, text) => {
//   let newRow = document.createElement("tr");
//   newRow.setAttribute("id", id);
//   newRow.innerHTML = `
//     <td>
//       <i class="fa-solid fa-circle-check"></i>
//       <span class="task" contenteditable="true">${text}</span>
//     <td>
//       <span class="fa-stack fa-2x">
//         <i class="fa-solid fa-square fa-stack-2x"></i>
//         <i class="fa-solid fa-pencil fa-stack-1x fa-inverse"></i>
//       </span>
//     </td>
//     <td>
//       <span class="fa-stack fa-2x">
//         <i class="fa-solid fa-square fa-stack-2x"></i>
//         <i class="fa-solid fa-trash fa-stack-1x fa-inverse"></i>
//       </span>
//     </td>`;

//   return newRow;
// };
