'use client'

import { FC } from 'react'
import { TasksView } from '@views/tasks'
import { useAtom } from 'jotai'
import { pageAtom } from '@/shared/atoms/pageAtom'
import { useEffect } from 'react'

const TasksPage: FC = () => {
	const [, setCurrentPage] = useAtom(pageAtom)

	// Устанавливаем текущую страницу при монтировании компонента
	useEffect(() => {
		setCurrentPage('tasks')
	}, [setCurrentPage])

	return <TasksView />
}

export default TasksPage
