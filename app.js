const addTodoBtn = document.getElementById("addTodoBtn");
let todoText; // this should be populated when the user clicks on Add button
const inputTag = document.getElementById("todoInput");
let todos = []; //declaring an empty array
let remainning = document.getElementById("remainning-count")

let clear_completedBtn = document.getElementById("clearCompletedBtn")

const filterButtons = document.querySelectorAll(".filter-btn");
let currentFilter = "all"; // Start with 'all'

//if we have todos in the local storage we will read it 
let todosString = localStorage.getItem("todos")
if (todosString) {
    todos = JSON.parse(todosString);
    // populatetoDos();
}


let todoUI = document.getElementById("todoList")

//ADDING TODOS
addTodoBtn.addEventListener("click", () => {

    todoText = inputTag.value;
    // console.log(todoText);
    // console.log("Add Button Clicked!");
    // console.log(e);
    inputTag.value = '';
    inputTag.focus();
    if (todoText.trim().length < 4) {
        alert("Oops! That's too short. Try describing your task with 4+ characters.")
        return
    }
    let todo = {
        id: Date.now(),
        //this way we will get the length of the array as id number, starting from 0.
        title: todoText,
        isCompleted: false
    }
    todos.push(todo)
    // todos = todos.map((todo, i) => {
    //     return { ...todo, id: i }
    // })
    localStorage.setItem("todos", JSON.stringify(todos));
    // localStorage.setItem(("todos"), JSON.stringify(todos))
    populatetoDos();
});

inputTag.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addTodoBtn.click();  // simulate clicking the Add button
    }
});

// --- FILTER BUTTON LOGIC ---
filterButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        // 1. Manage the visual 'active' state
        filterButtons.forEach(statuss => statuss.classList.remove("active"));
        e.target.classList.add("active");

        // 2. Update the filter state based on the HTML data-filters attribute
        currentFilter = e.target.getAttribute("data-filters");

        // 3. Re-render the list with the new filter applied
        populatetoDos();
    });
});


// const populatetoDos = () => {

    

//     let string = "";
//     // let i = 0;
//     for (const todo of todos) {
//         string += ` <li id="todo-${todo.id}" class="todo-item ${todo.isCompleted ? "completed" : ""}">
//                     <input type="checkbox" class="todo-checkbox" ${todo.isCompleted ? "checked" : ""}>
//                     <span class="todo-text">${todo.title}</span>
//                     <button class="delete-btn">×</button>

//                 </li> `
//         // i++;

//     }
//     // todoUI.innerHTML=todoUI.innerHTML+string;
//     todoUI.innerHTML = string;

//     //CHECKBOX LOGIC
//     const toDo_checkbox = document.querySelectorAll((".todo-checkbox"));

//     toDo_checkbox.forEach((elemen) => {
//         elemen.addEventListener("click", (e) => {
//             if (e.target.checked) {
//                 // e.target.parentNode.classList.add("completed")
//                 elemen.parentNode.classList.add("completed")
//                 // console.log(elemen.parentNode.id);

//                 todos = todos.map(todo => {
//                     if ("todo-" + todo.id == elemen.parentNode.id) {
//                         return { ...todo, isCompleted: true }
//                     }
//                     else {
//                         return todo;
//                     }
//                 })
//                 // remainning.innerHTML = todos.filter(todo => {return todo.isCompleted == false}).length;
//                 localStorage.setItem("todos", JSON.stringify(todos))

//                 remainning.innerHTML = todos.filter(todo => { return todo.isCompleted == false }).length;


//             }
//             else {
//                 e.target.parentNode.classList.remove("completed")

//                 todos = todos.map(todo => {
//                     if ("todo-" + todo.id == elemen.parentNode.id) {
//                         return { ...todo, isCompleted: false }
//                     }
//                     else {
//                         return todo;
//                     }
//                 })
//                 // remainning.innerHTML = todos.filter(todo => {return todo.isCompleted == false}).length;
//                 localStorage.setItem("todos", JSON.stringify(todos));

//                 remainning.innerHTML = todos.filter(todo => { return todo.isCompleted == false }).length;
//                 // localStorage.setItem("todos", JSON.stringify(todos))

//             }
//         })
//     })

//     // handling clear completed button
//     clear_completedBtn.addEventListener("click", () => {
//         // const confirmed = confirm("blah")
//         // if (confirmed) {
//         todos = todos.filter((todo) => todo.isCompleted == false);
//         localStorage.setItem("todos", JSON.stringify(todos))


//         // }
//         populatetoDos();



//     })

//     //handling the delete buttons
//     //DELETE LOGIC
//     let deleteBtns = document.querySelectorAll(".delete-btn")

//     deleteBtns.forEach((element) => {
//         // console.log(element.parentNode.id);
//         element.addEventListener("click", (e) => {
//             // console.log(e)
//             const confirmation = confirm("Do you want to delete this task?");
//             if (confirmation) {
//                 // console.log(e.target.parentNode.id);
//                 todos = todos.filter((todo) => {
//                     return ("todo-" + todo.id) !== (e.target.parentNode.id);

//                 }) //returns a new array with the conditions given, todo variable will access all the element in the array
//                 // console.log(todos)
//                 localStorage.setItem("todos", JSON.stringify(todos));
//                 populatetoDos()

//             } //end of confirmation condition

//         })


//     })

//     remainning.innerHTML = todos.filter(todo => { return todo.isCompleted == false }).length;

// }


const populatetoDos = () => {
    // 1. APPLY THE FILTERING LOGIC
    let filteredTodos = todos; // Default to 'all'

    if (currentFilter === "active") {
        // When active is clicked, show tasks where isCompleted is false
        filteredTodos = todos.filter(todo => todo.isCompleted === false);
    } else if (currentFilter === "completed") {
        // When completed is clicked, show tasks where isCompleted is true
        filteredTodos = todos.filter(todo => todo.isCompleted === true);
    }

    // 2. RENDER THE FILTERED LIST (The fix is here: 'filteredTodos' is used)
    let string = "";
    for (const todo of filteredTodos) { 
        string += ` <li id="todo-${todo.id}" class="todo-item ${todo.isCompleted ? "completed" : ""}">
                    <input type="checkbox" class="todo-checkbox" ${todo.isCompleted ? "checked" : ""}>
                    <span class="todo-text">${todo.title}</span>
                    <button class="delete-btn">×</button>

                </li> `
    }
    todoUI.innerHTML = string;
    
    // Recalculate and display remaining count (always from the full 'todos' list)
    remainning.innerHTML = todos.filter(todo => { return todo.isCompleted == false }).length;


    // --- 3. Attach Event Listeners to the Newly Rendered Elements ---

    // CHECKBOX LOGIC (Modified to call populatetoDos() after status change)
    const toDo_checkbox = document.querySelectorAll((".todo-checkbox"));

    toDo_checkbox.forEach((elemen) => {
        elemen.addEventListener("click", (e) => {
            const taskId = elemen.parentNode.id.split("-")[1]; // Get ID from "todo-ID"

            todos = todos.map(todo => {
                if (todo.id == taskId) { 
                    const newStatus = e.target.checked;
                    elemen.parentNode.classList.toggle("completed", newStatus);
                    return { ...todo, isCompleted: newStatus };
                }
                return todo;
            });

            localStorage.setItem("todos", JSON.stringify(todos));
            
            // FIX: Re-render the list immediately to ensure the filter is updated
            populatetoDos(); 
        });
    });

    // handling clear completed button (Calls populatetoDos() at the end)
    clear_completedBtn.addEventListener("click", () => {
        todos = todos.filter((todo) => todo.isCompleted == false);
        localStorage.setItem("todos", JSON.stringify(todos))
        populatetoDos(); // Re-render the list
    });

    // DELETE LOGIC (Modified to call populatetoDos() after deletion)
    let deleteBtns = document.querySelectorAll(".delete-btn")

    deleteBtns.forEach((element) => {
        element.addEventListener("click", (e) => {
            const confirmation = confirm("Do you want to delete this task?");
            if (confirmation) {
                const taskId = e.target.parentNode.id.split("-")[1];

                todos = todos.filter((todo) => {
                    return todo.id != taskId;
                });
                
                localStorage.setItem("todos", JSON.stringify(todos));
                populatetoDos() // Re-render the list

            }
        })
    })

    // This line is redundant if called above, but good for safety
    remainning.innerHTML = todos.filter(todo => { return todo.isCompleted == false }).length;
}

populatetoDos();

// populatetoDos();






