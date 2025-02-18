'use client'
import { FC, useEffect, useState } from 'react'
import classNames from 'classnames'

import styles from './characters.module.scss'
import { CharactersProps, Post } from './characters.types'
import { getPosts } from '@/shared/api/instances'
import Link from 'next/link'
import { useAtom } from 'jotai'
import { urlAtom } from '@/shared/atoms/urlAtom'
import { charactersAtom } from '@/shared/atoms/charactersAtom'

const Characters: FC<CharactersProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)

  const [url, setUrl] = useAtom(urlAtom)
  const [characters, setCharacters] = useAtom(charactersAtom)
  const [loading, setLoading] = useState(!characters.length)

  const changeUrl = (post: string) => {
    const url = post
    setUrl(url)
  }

  useEffect(() => {
    const fetchPosts = async () => {
      if (characters.length) return // Если у нас уже есть данные, не делаем запрос

      try {
        setLoading(true)
        const res = await getPosts(url)
        setCharacters(Array.isArray(res) ? res : [])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [url, characters.length, setCharacters])

  if (loading) {
    return (
      <div className={rootClassName}>
        <div className={styles.loading}>Загрузка...</div>
      </div>
    )
  }

  return (
    <div className={rootClassName}>
      {characters.map((character, index) => (
        <Link
          onClick={() => changeUrl('/characters/' + character)}
          href={`/characters/${character}`}
          key={index}
          className={styles.character}
        >
          <div>{String(character)}</div>
        </Link>
      ))}
    </div>
  )
}

export default Characters
