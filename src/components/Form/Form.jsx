import { useState } from 'react'
import { Button } from '../Button/Button'
import styles from './Form.module.css'

export function Form({ inputValue, setInputValue, onFormSubmit, onUndoButtonClick }) {
	const [isDisabled, setIsDisabled] = useState(true)

	function checkIfDisabled(input) {
		if (input === '') {
			setIsDisabled(true)
		} else {
			setIsDisabled(false)
		}
	}

	function handleKeyDown(e) {
		if (e.target.value != '' && e.key === 'Enter') {
			onFormSubmit(inputValue)
			setInputValue('')
		}
	}

	return (
		<form
			onSubmit={e => {
				e.preventDefault()
				onFormSubmit(inputValue)
				setInputValue('')
			}}
			className={styles.form}
		>
			<input
				value={inputValue}
				onChange={e => {
					setInputValue(e.target.value)
					checkIfDisabled(e.target.value)
				}}
				onKeyDown={e => {
					handleKeyDown(e)
				}}
				className={styles.input}
				type='text'
				placeholder='Wpisz treść zadania...'
			/>
			<Button disabled={isDisabled}>Dodaj</Button>
			<Button
				onClick={() => {
					onUndoButtonClick()
					setInputValue('')
				}}
			>
				Cofnij
			</Button>
		</form>
	)
}
