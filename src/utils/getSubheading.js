export function getSubheading(numberOfTasks) {
	switch (true) {
		case numberOfTasks === 1:
			return '1 zadanie'
		case numberOfTasks > 1 && numberOfTasks <= 4:
			return `${numberOfTasks} zadania`
		case numberOfTasks > 4:
			return `${numberOfTasks} zadań`
		default:
			return 'Brak zadań'
	}
}
