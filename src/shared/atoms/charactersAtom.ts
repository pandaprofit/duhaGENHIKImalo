import { atom } from 'jotai'
import { Post } from '@/modules/characters/characters.types'

export const charactersAtom = atom<Post[]>([])
