import { useState } from 'react'
import styles from './App.module.css'
import { Form } from './components/Form/Form'
import { TodoItem } from './components/TodoItem/TodoItem'
import { getSubheading } from './utils/getSubheading'

function App() {
	const [isFormShown, setIsFormShown] = useState(false)
	const [todos, setTodos] = useState([
		{ name: 'Zapłacić rachunki', done: false, id: 1 },
		{ name: 'Wyrzucić śmieci', done: true, id: 2 },
	])

	function addItem(newTodoName) {
		setTodos(prevTodos => [...prevTodos, { name: newTodoName, done: false, id: prevTodos.at(-1).id + 1 }])
		setIsFormShown(false)
	}

	function finishItem(id) {
		setTodos(prevTodos =>
			prevTodos.map(todo => {
				if (todo.id === id) {
					return { ...todo, done: true }
				} else {
					return todo
				}
			})
		)
	}

	function deleteItem(id) {
		setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id))
	}

	return (
		<div className={styles.container}>
			<header className={styles.header}>
				<div>
					<h1>Do zrobienia</h1>
					<h2>{getSubheading(todos.length)}</h2>
				</div>
				{!isFormShown && (
					<button className={styles.button} onClick={() => setIsFormShown(true)}>
						+
					</button>
				)}
			</header>
			{isFormShown && <Form onFormSubmit={newTodoName => addItem(newTodoName)} />}
			<ul>
				{todos.map(({ name, done, id }) => (
					<TodoItem
						key={id}
						name={name}
						done={done}
						onDoneButtonClick={() => finishItem(id)}
						onDeleteButtonClick={() => deleteItem(id)}
					/>
				))}
			</ul>
		</div>
	)
}

export default App
