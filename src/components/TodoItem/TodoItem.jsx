import { useState } from 'react'
import { Button } from '../Button/Button'
import { ButtonCheck } from '../ButtonCheck/ButtonCheck'
import styles from './TodoItem.module.css'
import trashIcon from './trash.svg'

export function TodoItem({
	name,
	done,
	onDoneButtonClick,
	onDeleteButtonClick,
	onUndoneButtonClick,
	onSaveButtonClick,
}) {
	const [showEditInput, setShowEditInput] = useState(false)
	const [newTodoName, setNewTodoName] = useState(false)

	function showInput() {
		setNewTodoName(name)
		setShowEditInput(true)
	}

	return (
		<li className={styles.item}>
			{!done && <ButtonCheck onClick={onDoneButtonClick}></ButtonCheck>}
			{done && <ButtonCheck onClick={onUndoneButtonClick} disabled={true}></ButtonCheck>}
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
					value={newTodoName}
					onChange={e => {
						setNewTodoName(e.target.value)
					}}
					className={styles.input}
					type='text'
				/>
			)}
			{showEditInput && (
				<Button
					onClick={() => {
						onSaveButtonClick(newTodoName)
						setShowEditInput(false)
					}}
				>
					Zapisz
				</Button>
			)}
			<div className={styles.bcontainer}>
				<ButtonCheck onClick={onDeleteButtonClick}>
					{<img className={styles.img} src={trashIcon}></img>}
				</ButtonCheck>
			</div>
		</li>
	)
}
