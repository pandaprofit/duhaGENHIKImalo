import { FC } from 'react'
import { TaskFiltersProps, TASK_GOALS } from '@/modules/tasks'
import styles from './task-filters.module.scss'

const TaskFilters: FC<TaskFiltersProps> = ({
	currentFilter,
	currentGoal,
	onFilterChange,
	onGoalChange
}) => {
	return (
		<div className={styles.filters}>
			<div className={styles.filterGroup}>
				<button
					className={currentFilter === 'all' ? styles.active : ''}
					onClick={() => onFilterChange('all')}
				>
					Все
				</button>
				<button
					className={currentFilter === 'active' ? styles.active : ''}
					onClick={() => onFilterChange('active')}
				>
					Активные
				</button>
				<button
					className={currentFilter === 'completed' ? styles.active : ''}
					onClick={() => onFilterChange('completed')}
				>
					Завершённые
				</button>
			</div>
			<div className={styles.goalFilter}>
				<select
					value={currentGoal}
					onChange={(e) => onGoalChange(e.target.value as any)}
					className={styles.goalSelect}
				>
					<option value="all">Все цели</option>
					{Object.entries(TASK_GOALS).map(([value, label]) => (
						<option key={value} value={value}>
							{label}
						</option>
					))}
				</select>
			</div>
		</div>
	)
}

export default TaskFilters
