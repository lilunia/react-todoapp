export function addItem(newTodoName, setTodos, setIsFormShown) {
	setTodos(prevTodos => [...prevTodos, { name: newTodoName, done: false, id: Math.random() }])
	setIsFormShown(false)
}

export function finishItem(id, bool, setTodos) {
	setTodos(prevTodos =>
		prevTodos.map(todo => {
			if (todo.id === id) {
				return { ...todo, done: bool }
			} else {
				return todo
			}
		})
	)
}
export function editItemName(id, newTodoName, setTodos) {
	setTodos(prevTodos =>
		prevTodos.map(todo => {
			if (todo.id === id) {
				return { ...todo, name: newTodoName }
			} else {
				return todo
			}
		})
	)
}
export function deleteItem(id, setTodos) {
	setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id))
}
