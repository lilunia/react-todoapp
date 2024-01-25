import { useState } from 'react'
import { Button } from '../Button/Button'
import styles from './Form.module.css'

export function Form({ onFormSubmit, inputValue, setInputValue }) {
	const [isDisabled, setIsDisabled] = useState(true)

	function checkIfDisabled(input) {
		if (input === '') {
			setIsDisabled(true)
		} else {
			setIsDisabled(false)
		}
	}

	return (
		<form
			onSubmit={e => {
				e.preventDefault()
				onFormSubmit(inputValue)
			}}
			className={styles.form}
		>
			<input
				value={inputValue}
				onChange={e => {
					setInputValue(e.target.value)
					checkIfDisabled(e.target.value)
				}}
				className={styles.input}
				type='text'
			/>
			<Button disabled={isDisabled} className={styles.disabled}>
				Dodaj
			</Button>
		</form>
	)
}
