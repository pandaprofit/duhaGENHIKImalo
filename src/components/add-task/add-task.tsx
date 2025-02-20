import { FC, useState } from 'react'
import { AddTaskProps, TaskGoal, TASK_GOALS } from '@/modules/tasks'
import styles from './add-task.module.scss'

const AddTask: FC<AddTaskProps> = ({ onAdd }) => {
	const [text, setText] = useState('')
	const [goal, setGoal] = useState<TaskGoal>('map_clearing')

	const handleSubmit = () => {
		if (!text.trim()) return

		onAdd({
			text: text.trim(),
			completed: false,
			goal
		})

		setText('')
	}

	return (
		<div className={styles.addTask}>
			<div className={styles.inputGroup}>
				<input
					type="text"
					value={text}
					onChange={(e) => setText(e.target.value)}
					placeholder="Добавить новую задачу..."
					onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
				/>
				<select
					value={goal}
					onChange={(e) => setGoal(e.target.value as TaskGoal)}
					className={styles.goalSelect}
				>
					{Object.entries(TASK_GOALS).map(([value, label]) => (
						<option key={value} value={value}>
							{label}
						</option>
					))}
				</select>
			</div>
			<button onClick={handleSubmit}>Добавить</button>
		</div>
	)
}

export default AddTask
