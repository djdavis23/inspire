import Todo from "../../models/Todo.js"

let todoList = []
let user = 'Don'

//@ts-ignore
const todoApi = axios.create({
	baseURL: `https://bcw-sandbox.herokuapp.com/api/${user}/todos/`,
	timeout: 3000
});

function logError(e) {
	console.log(e)
}



export default class TodoService {

	get user() {
		return user
	}

	get todoList() {
		let todoListCopy = []
		todoList.forEach(todo => {
			let todoCopy = new Todo(todo)
			todoListCopy.push(todoCopy)
		})
		return todoListCopy
	}

	getTodos(draw) {
		console.log("service retrieving todo list")
		todoApi.get('')
			.then((res) => {
				todoList = res.data.data
				console.log("redrawing todo list")
				console.log(todoList)
				draw(todoList)
			})
			.catch(logError)
	}

	addTodo(todo, callBack) {
		todoApi.post('', todo)
			.then(callBack)
			.catch(logError)
	}

	toggleTodoStatus(todoIndex, callBack) {
		//retrieve todo object
		var todo = todoList[todoIndex]
		//toggle complete status
		if (todo.completed) {
			todo.completed = false
		}
		else {
			todo.completed = true
		}
		todoList[todoIndex] = todo

		//post change to server
		todoApi.put(todo._id, todo)
			.then(function (res) {
				console.log(res.data.message)
				console.log(todo)
			})
			.then(callBack)
			.catch(logError)
	}

	removeTodo(todoId, callBack) {
		todoApi.delete(todoId)
			.then(callBack)
			.catch(logError)

	}

}
