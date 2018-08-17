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

	getTodos(draw) {
		todoApi.get('')
			.then((res) => {
				todoList = res.data.data
				draw(todoList)
			})
			.catch(logError)
	}

	addTodo(todo, callBack) {
		todoApi.post('', todo)
			.then(callBack)
			.catch(logError)
	}

	toggleTodoStatus(todoId) {
		// MAKE SURE WE THINK THIS ONE THROUGH
		//STEP 1: Find the todo by its index **HINT** todoList

		var todo = {} ///MODIFY THIS LINE

		//STEP 2: Change the completed flag to the opposite of what is is **HINT** todo.completed = !todo.completed
		todoApi.put(todoId, todo)
			.then(function (res) {
				//DO YOU WANT TO DO ANYTHING WITH THIS?
			})
			.catch(logError)
	}

	removeTodo(todoId, callBack) {
		todoApi.delete(todoId)
			.then(callBack)
			.catch(logError)

	}

}
