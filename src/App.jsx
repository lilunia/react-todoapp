import { useState, useReducer, useEffect } from 'react'
import styles from './App.module.css'
import { Form } from './components/Form/Form'
import { TodoItem } from './components/TodoItem/TodoItem'
import { getSubheading } from './utils/getSubheading'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { appReducer } from '../reducer/appReducer'

function App() {
	const [inputValue, setInputValue] = useState('')
	let initialTodos = [
		{ name: 'Pay the bills', done: false, id: 1 },
		{ name: 'Throw out the rubbish', done: true, id: 2 },
		{ name: 'Car inspection', done: false, id: 3 },
	]

	const [{ todos, isFormShown }, dispatch] = useReducer(appReducer, {
		todos: JSON.parse(localStorage.getItem('todos')) || initialTodos,
		isFormShown: false,
	})

	useEffect(() => {
		localStorage.setItem('todos', JSON.stringify(todos))
	}, [todos])

	function handleDragDrop({ source, destination }) {
		if (!destination) return
		if (source.droppableId === destination.droppableId && source.index === destination.index) return
		else {
			const reorderedTodos = [...todos]

			const sourceIndex = source.index
			const destinationIndex = destination.index
			const [removedTodo] = reorderedTodos.splice(sourceIndex, 1)
			reorderedTodos.splice(destinationIndex, 0, removedTodo)

			dispatch({ type: 'reorder', todos: reorderedTodos })
		}
	}

	return (
		<div className={styles.container}>
			<header className={styles.header}>
				<div className={styles.headerContainer}>
					<h1>To do</h1>
					<h2>{getSubheading(todos.length)}</h2>
				</div>
				{!isFormShown && (
					<button
						className={styles.button}
						onClick={() => {
							dispatch({ type: 'open_form' })
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
					onFormSubmit={newTodoName => dispatch({ type: 'add', newTodoName })}
					onUndoButtonClick={() => dispatch({ type: 'close_form' })}
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
												name={name}
												done={done}
												onUndoneButtonClick={() =>
													dispatch({
														type: 'unfinish',
														id,
													})
												}
												onDoneButtonClick={() =>
													dispatch({
														type: 'finish',
														id,
													})
												}
												onDeleteButtonClick={() =>
													dispatch({
														type: 'delete',
														id,
													})
												}
												onSaveButtonClick={newTodoName =>
													dispatch({
														type: 'edit',
														id,
														newTodoName,
													})
												}
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
