export function appReducer(state, action) {
	switch (action.type) {
		case 'delete':
			return { ...state, todos: state.todos.filter(todo => todo.id !== action.id) }
		case 'finish':
			return {
				...state,
				todos: state.todos.map(todo => {
					if (todo.id === action.id) {
						return { ...todo, done: true }
					} else {
						return todo
					}
				}),
			}
		case 'unfinish':
			return {
				...state,
				todos: state.todos.map(todo => {
					if (todo.id === action.id) {
						return { ...todo, done: false }
					} else {
						return todo
					}
				}),
			}
		case 'add':
			return {
				isFormShown: false,
				todos: [...state.todos, { name: action.newTodoName, done: false, id: Math.random() }],
			}
		case 'edit':
			return {
				...state,
				todos: state.todos.map(todo => {
					if (todo.id === action.id) {
						return { ...todo, name: action.newTodoName }
					} else {
						return todo
					}
				}),
			}
		case 'open_form':
			return {
				...state,
				isFormShown: true,
			}
		case 'close_form':
			return {
				...state,
				isFormShown: false,
			}
		case 'reorder':
			console.log('hello')
			return {
				...state,
				todos: [...action.todos],
			}
		default:
			throw new Error('Action not supported!')
	}
}
