export function getSubheading(numberOfTasks) {
	switch (true) {
		case numberOfTasks === 1:
			return '1 task'
		case numberOfTasks > 1:
			return `${numberOfTasks} tasks`
		default:
			return 'Brak zadań'
	}
}
