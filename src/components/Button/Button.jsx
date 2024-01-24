import styles from './Button.module.css'

export function Button({ children, onClick, disabled }) {
	return (
		<button
			className={`${styles.button} ${disabled ? styles.disabled : ''} `}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	)
}
