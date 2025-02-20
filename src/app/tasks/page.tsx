'use client'

import { FC } from 'react'
import { Tasks } from '@/modules/tasks'
import { useAtom } from 'jotai'
import { pageAtom } from '@/shared/atoms/pageAtom'
import { useEffect } from 'react'

const TasksPage: FC = () => {
	const [, setCurrentPage] = useAtom(pageAtom)

	// Устанавливаем текущую страницу при монтировании компонента
	useEffect(() => {
		setCurrentPage('tasks')
	}, [setCurrentPage])

	return <Tasks />
}

export default TasksPage
