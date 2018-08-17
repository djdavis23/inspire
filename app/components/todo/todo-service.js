import Todo from "../../models/Todo.js"

let todoList = []
let user = ''

//@ts-ignore
var todoApi = axios.create({
	baseURL: `https://bcw-sandbox.herokuapp.com/api/`,
	timeout: 3000
});

function logError(e) {
	console.log(e)
}

// ${user}/todos/


export default class TodoService {

	setUser(userName) {
		user = userName
		//todoApi.baseURL = `https://bcw-sandbox.herokuapp.com/api/${user}/todos/`
		console.log(todoApi.baseURL)
	}

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
		if (!user) {
			draw(todoList)
			console.log('redraw empty local todo list')
			return
		}

		console.log("getting items from server for: " + user)
		todoApi.get(`${user}/todos/`)
			.then((res) => {
				todoList = res.data.data
				console.log("redrawing todo list")
				console.log(todoList)
				draw(todoList)
			})
			.catch(logError)

	}

	addTodo(todo, callBack) {
		console.log("adding todo: ", todo)
		todoApi.post(`${user}/todos/`, todo)
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
		todoApi.put(`${user}/todos/${todo._id}`, todo)
			.then(function (res) {
				console.log(res.data.message)
				console.log(todo)
			})
			.then(callBack)
			.catch(logError)
	}

	removeTodo(todoId, callBack) {
		todoApi.delete(`${user}/todos/${todoId}`)
			.then(callBack)
			.catch(logError)

	}

}
