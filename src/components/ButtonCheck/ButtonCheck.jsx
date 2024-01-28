import styles from './ButtonCheck.module.css'

export function ButtonCheck({ onClick, children, disabled }) {
	return (
		<button className={`${styles.button} ${disabled ? styles.checked : ''}`} onClick={onClick}>
			{children}
		</button>
	)
}