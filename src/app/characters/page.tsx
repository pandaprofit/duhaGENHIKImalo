'use client'

import { FC } from 'react'
import Characters from '@/modules/characters/characters'
import { useAtom } from 'jotai'
import { pageAtom } from '@/shared/atoms/pageAtom'
import { useEffect } from 'react'

const CharactersPage: FC = () => {
  const [, setCurrentPage] = useAtom(pageAtom)

  // Устанавливаем текущую страницу при монтировании компонента
  useEffect(() => {
    setCurrentPage('characters')
  }, [setCurrentPage])

  return <Characters />
}

export default CharactersPage
