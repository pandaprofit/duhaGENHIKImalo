import { FC } from 'react'
import classNames from 'classnames'
import { TaskListProps, TASK_GOALS } from '@/modules/tasks'
import styles from './task-list.module.scss'

const TaskList: FC<TaskListProps> = ({
	tasks,
	onToggle,
	onDelete
}) => {
	return (
		<div className={styles.taskList}>
			{tasks.map(task => (
				<div
					key={task.id}
					className={classNames(styles.task, {
						[styles.completed]: task.completed
					})}
				>
					<div className={styles.taskContent}>
						<label className={styles.checkbox}>
							<input
								type="checkbox"
								checked={task.completed}
								onChange={() => onToggle(task.id)}
							/>
							<span className={styles.checkmark}></span>
						</label>
						<div className={styles.taskInfo}>
							<span className={styles.taskText}>{task.text}</span>
							<div className={styles.taskMeta}>
								<span className={styles.taskGoal}>{TASK_GOALS[task.goal]}</span>
								<span className={styles.taskDate}>
									{new Date(task.createdAt).toLocaleDateString('ru-RU', {
										day: '2-digit',
										month: '2-digit',
										year: 'numeric'
									})}
								</span>
							</div>
						</div>
					</div>
					<button
						className={styles.deleteButton}
						onClick={() => onDelete(task.id)}
					>
						✕
					</button>
				</div>
			))}
			{tasks.length === 0 && (
				<div className={styles.emptyState}>
					<div className={styles.emptyIcon}>📝</div>
					<p>Нет задач</p>
				</div>
			)}
		</div>
	)
}

export default TaskList
