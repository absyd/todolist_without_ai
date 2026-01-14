const todoForm = document.getElementById('todo-form');
const todoContainer = document.getElementById('todo-container'); 
// main array to store todo data
let TODOS=[]


function generateID(){
    // this function generates random id 
    let randomId=`absyd_${Date.now()}`;
    // :) my id generation are so unique 
    return randomId;
}


// lets render the todos that we added

function renderTodo(){
    let renderHtml="";

    TODOS.forEach(todo=>{
        // console.log(todo.id);
        renderHtml+=`
        <div class="single-todo" id=${todo.id}>
                <h3 class="todo">${todo.todo}</h3>
                <button class="edit-btn"   onclick="editTodo('${todo.id}')" >Edit</button>
                <button class="delete-btn"  onclick="deleteTodo('${todo.id}')" >Delete</button>
        </div>
        
        `;
    })

    todoContainer.innerHTML=renderHtml;
}

 






// editing todo 
function editTodo(todoId){
    console.log(todoId);
        const todoIndex=TODOS.findIndex(todo=>todo.id===todoId)
        const edited = prompt("Please Input The Updated Value",TODOS[todoIndex].todo)
        if(edited){
            TODOS[todoIndex].todo=edited;
            renderTodo()
        } 

}

// deleting todo 
function deleteTodo(id){
    const todo=TODOS.filter(todo=>todo.id!=id)
    TODOS=todo;
    renderTodo();
    console.log(TODOS);
}



















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
            id,
        }

        TODOS.push(singleTodo);
        // oh no clear the input field that we added
        todoElement.value="";
        renderTodo()
    }

    console.log(TODOS);

})

