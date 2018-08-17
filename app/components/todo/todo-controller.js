import TodoService from "./todo-service.js";


var todoService = new TodoService
const todoList = document.getElementById("todo-list")
const numItems = document.getElementById("num-items")


// Use this getTodos function as your callback for all other edits
function getTodos() {
	//FYI DONT EDIT ME :)
	console.log("controller getting todo list")
	todoService.getTodos(draw)
}

function draw(todos) {
	let template = ''
	let index = 0
	todos.forEach(todo => {
		template += `
			<li><input type="checkbox" name="index${index}" />${todo.description} <i class="fas fa-trash-alt" onclick="app.controllers.todoController.removeTodo('${todo._id}')"></i></li>
		`
		index++
	})
	todoList.innerHTML = template
	numItems.innerText = todos.length.toString()
}


export default class TodoController {
	constructor() {
		getTodos()
	}
	// You will need four methods
	// getTodos should request your api/todos and give an array of todos to your callback fn
	// addTodo takes in a todo and posts it to the server
	// toggleTodoStatus takes in a todo marks its status as completed and puts it to the server
	// removeTodo takes in a todoId and sends a delete request to the server
	// **** HINT: Everytime you make a change to any todo don't forget to get the todo list again


	addTodoFromForm(e) {
		e.preventDefault() // <-- hey this time its a freebie don't forget this
		// TAKE THE INFORMATION FORM THE FORM
		console.log(e.target.newItem.value)
		let todo = {
			description: e.target.newItem.value,
			completed: false,
			user: todoService.user
		}
		//PASSES THE NEW TODO TO YOUR SERVICE
		//DON'T FORGET TO REDRAW THE SCREEN WITH THE NEW TODO
		//YOU SHOULDN'T NEED TO CHANGE THIS
		todoService.addTodo(todo, getTodos)
		//^^^^^^^ EXAMPLE OF HOW TO GET YOUR TOODOS AFTER AN EDIT
	}

	toggleTodoStatus(todoId) {
		// asks the service to edit the todo status
		todoService.toggleTodoStatus(todoId, getTodos)
		// YEP THATS IT FOR ME
	}

	removeTodo(todoId) {
		todoService.removeTodo(todoId, getTodos)
	}



}
