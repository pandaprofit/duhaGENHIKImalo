'use client'
import { FC } from 'react'
import classNames from 'classnames'
import Tasks from '@/modules/Tasks/Tasks'
import { TaskProps } from './tasks.types'
import styles from './tasks.module.scss'

const TasksPage: FC<TaskProps> = ({
	className
}) => {
	const rootClassName = classNames(styles.root, className)

	return (
		<main className={rootClassName}>
			<div className={styles.container}>
				<Tasks />
			</div>
		</main>
	)
}

export default TasksPage
