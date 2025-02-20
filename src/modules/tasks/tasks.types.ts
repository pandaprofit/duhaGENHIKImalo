export interface TasksProps {
	className?: string
}

export type TaskGoal = 'map_clearing' | 'character_upgrade' | 'entertainment'

export interface Task {
	id: number
	text: string
	completed: boolean
	createdAt: string
	goal: TaskGoal
}

export interface TaskListProps {
	tasks: Task[]
	onToggle: (id: number) => void
	onDelete: (id: number) => void
}

export interface AddTaskProps {
	onAdd: (task: Omit<Task, 'id' | 'createdAt'>) => void
}

export interface TaskFiltersProps {
	currentFilter: 'all' | 'active' | 'completed'
	currentGoal: TaskGoal | 'all'
	onFilterChange: (filter: 'all' | 'active' | 'completed') => void
	onGoalChange: (goal: TaskGoal | 'all') => void
}

export const TASK_GOALS = {
	map_clearing: 'Чистка карты',
	character_upgrade: 'Прокачка персонажа',
	entertainment: 'Развлечения'
} as const
