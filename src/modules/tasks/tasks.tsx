import { FC, useState, useCallback } from 'react'
import { Task, TaskGoal } from './tasks.types'
import { TaskList, AddTask, TaskFilters, CacheTask } from '@/components'
import styles from './tasks.module.scss'

const Tasks: FC = () => {
	const [tasks, setTasks] = useState<Task[]>([])
	const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')
	const [goalFilter, setGoalFilter] = useState<TaskGoal | 'all'>('all')

	const handleAddTask = useCallback((newTask: Omit<Task, 'id' | 'createdAt'>) => {
		setTasks(prev => [
			...prev,
			{
				...newTask,
				id: Date.now(),
				createdAt: new Date().toISOString()
			}
		])
	}, [])

	const handleToggleTask = useCallback((id: number) => {
		setTasks(prev =>
			prev.map(task =>
				task.id === id ? { ...task, completed: !task.completed } : task
			)
		)
	}, [])

	const handleDeleteTask = useCallback((id: number) => {
		setTasks(prev => prev.filter(task => task.id !== id))
	}, [])

	const handleCacheLoad = useCallback((cachedTasks: Task[]) => {
		setTasks(cachedTasks)
	}, [])

	const filteredTasks = tasks.filter(task => {
		const matchesStatus =
			filter === 'all' ||
			(filter === 'active' && !task.completed) ||
			(filter === 'completed' && task.completed)

		const matchesGoal = goalFilter === 'all' || task.goal === goalFilter

		return matchesStatus && matchesGoal
	})

	return (
		<div className={styles.root}>
			<h1>Список дел</h1>
			<CacheTask tasks={tasks} onCacheLoad={handleCacheLoad} />
			<AddTask onAdd={handleAddTask} />
			<TaskFilters
				currentFilter={filter}
				currentGoal={goalFilter}
				onFilterChange={setFilter}
				onGoalChange={setGoalFilter}
			/>
			<TaskList
				tasks={filteredTasks}
				onToggle={handleToggleTask}
				onDelete={handleDeleteTask}
			/>
		</div>
	)
}

export default Tasks
