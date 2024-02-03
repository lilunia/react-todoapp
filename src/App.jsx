import { useState } from 'react'
import styles from './App.module.css'
import { Form } from './components/Form/Form'
import { TodoItem } from './components/TodoItem/TodoItem'
import { getSubheading } from './utils/getSubheading'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { addItem, finishItem, editItemName, deleteItem } from './utils/handleItems'

function App() {
	const [isFormShown, setIsFormShown] = useState(false)
	const [inputValue, setInputValue] = useState('')

	const [todos, setTodos] = useState([
		{ name: 'Zapłacić rachunki', done: false, id: 1 },
		{ name: 'Wyrzucić śmieci', done: true, id: 2 },
	])

	function handleDragDrop({ source, destination }) {
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
					onFormSubmit={newTodoName => addItem(newTodoName, setTodos, setIsFormShown)}
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
												name={name}
												done={done}
												onDoneButtonClick={() =>
													finishItem(
														id,
														true,
														setTodos
													)
												}
												onUndoneButtonClick={() =>
													finishItem(
														id,
														false,
														setTodos
													)
												}
												onDeleteButtonClick={() =>
													deleteItem(
														id,
														setTodos
													)
												}
												onSaveButtonClick={newTodoName => {
													editItemName(
														id,
														newTodoName,
														setTodos
													)
												}}
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
