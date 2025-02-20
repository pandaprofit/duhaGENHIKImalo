import { FC, useEffect } from 'react'
import { Task } from '@/modules/tasks'
import classNames from 'classnames'

import styles from './cacheTask.module.scss'

interface CacheTaskProps {
  tasks: Task[]
  onCacheLoad: (tasks: Task[]) => void
  className?: string
}

const CACHE_KEY = 'genshin_helper_tasks'

const CacheTask: FC<CacheTaskProps> = ({
  tasks,
  onCacheLoad,
  className
}) => {
  const rootClassName = classNames(styles.root, className)

  // Загрузка задач из кеша при монтировании
  useEffect(() => {
    try {
      const cached = localStorage.getItem(CACHE_KEY)
      if (cached) {
        const parsedTasks = JSON.parse(cached)
        onCacheLoad(parsedTasks)
      }
    } catch (error) {
      console.error('Ошибка при загрузке задач из кеша:', error)
      localStorage.removeItem(CACHE_KEY)
    }
  }, [onCacheLoad])

  // Сохранение задач в кеш при их изменении
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem(CACHE_KEY, JSON.stringify(tasks))
    } else {
      localStorage.removeItem(CACHE_KEY)
    }
  }, [tasks])

  return null // Этот компонент не рендерит UI
}

export default CacheTask
