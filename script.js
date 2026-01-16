const todoForm = document.getElementById('todo-form');
const todoContainer = document.getElementById('todo-container'); 
// main array to store todo data
let TODOS=[]

window.addEventListener("DOMContentLoaded",()=>{
    const todosFromLocalDB=getFromLocalDB();


    if(todosFromLocalDB){
        TODOS=todosFromLocalDB;
    }
    renderTodo()
})

// utility functions
function generateID(){
    // this function generates random id 
    let randomId=`absyd_${Date.now()}`;
    // :) my id generation are so unique 
    return randomId;
}

// add to localstorage 
function addToLocalDB(){
    localStorage.setItem("todos",JSON.stringify(TODOS));
}
function getFromLocalDB(){
    const todosFromLocalDB=localStorage.getItem("todos" );
    return JSON.parse(todosFromLocalDB);
}
// lets render the todos that we added

function renderTodo(){
    let renderHtml="";
    

    // check if there is any todo's
    if(TODOS.length){
        TODOS.forEach(todo=>{

            renderHtml+=`
            <div class="single-todo" id=${todo.id}>
                    ${todo.compleated ?`<h3 class='todo'><strike>${todo.todo}</strike></h3>`:`<h3 class="todo">${todo.todo}</h3>`}
                    <button class="edit-btn"   onclick="editTodo('${todo.id}')" >Edit</button>
                    <button class="delete-btn"  onclick="deleteTodo('${todo.id}')" >Delete</button>
                    ${!todo.compleated ? "<button class='compleate-btn'  onclick='markAsCompleated('${todo.id}')' >Mark As Completed</button>":""}
            </div>
            
            `;
        })

        todoContainer.innerHTML=renderHtml;
    }else{
        todoContainer.innerHTML="<h3>Please Add Some Todo</h3>"
    }
}

 






// editing todo 
function editTodo(todoId){
    console.log(todoId);
        const todoIndex=TODOS.findIndex(todo=>todo.id===todoId)
        const edited = prompt("Please Input The Updated Value",TODOS[todoIndex].todo)
        if(edited){
            TODOS[todoIndex].todo=edited;
            renderTodo()
            addToLocalDB();
        } 

}
function markAsCompleated(todoId){
        const todoIndex=TODOS.findIndex(todo=>todo.id===todoId)
        // const edited = prompt("Please Input The Updated Value",TODOS[todoIndex].todo)
        TODOS[todoIndex].compleated=true;
        renderTodo()
        addToLocalDB();


}
// deleting todo 
function deleteTodo(id){
    const todo=TODOS.filter(todo=>todo.id!=id)
    TODOS=todo;
    renderTodo();
    addToLocalDB();
}

// Select elements
const todoInput = document.getElementById('todo-input');
const addTodoButton = document.getElementById('add-todo');
const todoList = document.getElementById('todo-list');

// Add event listener to the "Add" button
addTodoButton.addEventListener('click', () => {
  const taskText = todoInput.value.trim();

  if (taskText) {
    const listItem = document.createElement('li');

    // Create task text
    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;
    taskSpan.addEventListener('click', () => {
      taskSpan.classList.toggle('completed');
    });

    // Create delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete');
    deleteButton.addEventListener('click', () => {
      todoList.removeChild(listItem);
    });

    // Append task and delete button to list item
    listItem.appendChild(taskSpan);
    listItem.appendChild(deleteButton);

    // Add list item to the todo list
    todoList.appendChild(listItem);

    // Clear the input field
    todoInput.value = '';
  }
});

// adding event listener to the form to add toto
todoForm.addEventListener("submit",function(e){
    // preventing default behivaoure 
    e.preventDefault();
    
    const todoElement = document.getElementById("todo-input");
    const todoText=todoElement.value;
    const id=generateID();
    // check if valuee exists
    if(!todoText){
        alert("Please Add Some Todo");
    }else{
        const singleTodo={
            todo:todoText,
            compleated:false,
            id,
        }

        TODOS.push(singleTodo);
        // oh no clear the input field that we added
        todoElement.value="";
        renderTodo();
        addToLocalDB();
    }

    console.log(TODOS);

})

