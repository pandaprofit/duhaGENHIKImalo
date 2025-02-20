export interface TaskProps {
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

export const TASK_GOALS = {
  map_clearing: 'Чистка карты',
  character_upgrade: 'Прокачка персонажа',
  entertainment: 'Развлечения'
} as const
