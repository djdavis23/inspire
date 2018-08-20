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

		//draw todo items based on state (complete or incomplete)
		if (todo.completed) {
			template += `
			<li>
				<input type="checkbox" id="cb${index}" onclick="app.controllers.todoController.toggleTodoStatus(${index})" checked />
					<span id="${todo._id}" class="complete">${todo.description} </span>
				<i class="fas fa-trash-alt" 
				onclick="app.controllers.todoController.removeTodo('${todo._id}')"></i>
			</li>
		`
		}

		else {
			template += `
			<li>
				<input type="checkbox" id="cb${index}" onclick="app.controllers.todoController.toggleTodoStatus(${index})" />
					<span id="${todo._id}">${todo.description} </span>
				<i class="fas fa-trash-alt" 
				onclick="app.controllers.todoController.removeTodo('${todo._id}')"></i>
			</li>
		`
		}
		index++
	})
	todoList.innerHTML = template
	numItems.innerText = todos.length.toString()
}


export default class TodoController {
	constructor() {
		getTodos()
	}

	//get user-specific todos upon login
	setUser(e) {
		e.preventDefault()
		let user = e.target.username.value
		todoService.setUser(user)
		getTodos()
	}

	//add new todo to server from user input
	addTodoFromForm(e) {
		e.preventDefault()
		console.log(e.target.newItem.value)
		let todo = {
			description: e.target.newItem.value,
			completed: false,
			user: todoService.user
		}
		todoService.addTodo(todo, getTodos)
		e.target.reset()


	}

	toggleTodoStatus(todoIndex) {
		// asks the service to edit the todo status
		todoService.toggleTodoStatus(todoIndex, getTodos)
	}

	removeTodo(todoId) {
		todoService.removeTodo(todoId, getTodos)
	}



}
