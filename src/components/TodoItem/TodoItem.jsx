import { useState } from 'react'
import { Button } from '../Button/Button'
import styles from './TodoItem.module.css'

export function TodoItem({
	name,
	done,
	onDoneButtonClick,
	onDeleteButtonClick,
	onUndoneButtonClick,
	onSaveButtonClick,
	inputValue,
	setInputValue,
}) {
	const [showEditInput, setShowEditInput] = useState(false)

	function showInput() {
		setInputValue(name)
		setShowEditInput(true)
	}
	function editNameInput() {
		setShowEditInput(false)
	}

	return (
		<li className={styles.item}>
			{!showEditInput && (
				<span
					className={`${styles.name} ${done ? styles.done : ''}`}
					onClick={() => showInput()}
				>
					{name}
				</span>
			)}
			{showEditInput && (
				<input
					value={inputValue}
					onChange={e => {
						setInputValue(e.target.value)
					}}
					className={styles.input}
					type='text'
				/>
			)}
			{showEditInput && (
				<Button
					onClick={() => {
						onSaveButtonClick(inputValue)
						editNameInput()
					}}
				>
					Zapisz
				</Button>
			)}
			<div className={styles.bcontainer}>
				{!done && <Button onClick={onDoneButtonClick}>Zrobione</Button>}
				{done && <Button onClick={onUndoneButtonClick}>Niezrobione</Button>}
				<Button onClick={onDeleteButtonClick}>Usuń</Button>
			</div>
		</li>
	)
}
