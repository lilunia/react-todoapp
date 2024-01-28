import { useState } from 'react'
import styles from './App.module.css'
import { Form } from './components/Form/Form'
import { TodoItem } from './components/TodoItem/TodoItem'
import { getSubheading } from './utils/getSubheading'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

function App() {
	const [isFormShown, setIsFormShown] = useState(false)
	const [inputValue, setInputValue] = useState('')

	const [todos, setTodos] = useState([
		{ name: 'Zapłacić rachunki', done: false, id: 1 },
		{ name: 'Wyrzucić śmieci', done: true, id: 2 },
	])
	function addItem(newTodoName) {
		setTodos(prevTodos => [...prevTodos, { name: newTodoName, done: false, id: Math.random() }])
		setIsFormShown(false)
	}
	
	function finishItem(id, bool) {
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
	function editItemName(id, newTodoName) {
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
	function deleteItem(id) {
		setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id))
	}
	
	function handleDragDrop(results) {
		const { source, destination } = results
	
		if (!destination) return
		if (source.droppableId === destination.droppableId && source.index === destination.index) return
		else {
			const reorderedTodos = [...todos]
			const sourceIndex = source.index
			const destinationIndex = destination.index
	
			const [removedTodo] = reorderedTodos.splice(sourceIndex, 1)
			reorderedTodos.splice(destinationIndex, 0, removedTodo)
	
			return setTodos(reorderedTodos)
		}
	}
	
	return (
		<div className={styles.container}>
			<header className={styles.header}>
				<div>
					<h1>Do zrobienia</h1>
					<h2>{getSubheading(todos.length)}</h2>
				</div>
				{!isFormShown && (
					<button
						className={styles.button}
						onClick={() => {
							setIsFormShown(true)
							setInputValue('')
						}}
					>
						+
					</button>
				)}
			</header>
			{isFormShown && (
				<Form
					inputValue={inputValue}
					setInputValue={setInputValue}
					onFormSubmit={newTodoName => addItem(newTodoName)}
					onUndoButtonClick={() => setIsFormShown(false)}
				/>
			)}
			<DragDropContext onDragEnd={handleDragDrop}>
				<Droppable droppableId='root'>
					{provided => (
						<ul
							className={styles.list}
							{...provided.droppableProps}
							ref={provided.innerRef}
						>
							{todos.map(({ name, done, id }, index) => (
								<Draggable
									draggableId={id.toString()}
									key={id}
									index={index}
								>
									{provided => (
										<div
											{...provided.dragHandleProps}
											{...provided.draggableProps}
											ref={provided.innerRef}
										>
											<TodoItem
												id={id}
												name={name}
												done={done}
												onDoneButtonClick={() =>
													finishItem(
														id,
														true
													)
												}
												onUndoneButtonClick={() =>
													finishItem(
														id,
														false
													)
												}
												onDeleteButtonClick={() =>
													deleteItem(id)
												}
												onSaveButtonClick={newTodoName => {
													editItemName(
														id,
														newTodoName
													)
												}}
												inputValue={inputValue}
												setInputValue={
													setInputValue
												}
												todos={todos}
												setTodos={setTodos}
											/>
										</div>
									)}
								</Draggable>
							))}
							{provided.placeholder}
						</ul>
					)}
				</Droppable>
			</DragDropContext>
		</div>
	)


}

export default App
