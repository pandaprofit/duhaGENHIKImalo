import { atom } from 'jotai'

export type PageType = 'home' | 'characters' | 'wishes' | 'calculator' | 'tasks' | 'database' | 'events' | 'settings'

export const pageAtom = atom<PageType>('home')
