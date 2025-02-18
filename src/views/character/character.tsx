'use client'
import { FC, useEffect, useState } from 'react'
import classNames from 'classnames'
import { useParams } from 'next/navigation'

import styles from './character.module.scss'
import { CharacterProps, CharacterData } from './character.types'
import { getPosts } from '@/shared/api/instances'

const Character: FC<CharacterProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)
  const params = useParams()
  const [character, setCharacter] = useState<CharacterData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        setLoading(true)
        const characterName = params.character as string
        const data = await getPosts(`/characters/${characterName}`)
        setCharacter(data)
      } catch (error) {
        console.error('Error fetching character:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCharacter()
  }, [params.character])

  if (loading) {
    return (
      <main className={rootClassName}>
        <div className={styles.loading}>Загрузка...</div>
      </main>
    )
  }

  if (!character) {
    return (
      <main className={rootClassName}>
        <div className={styles.error}>Персонаж не найден</div>
      </main>
    )
  }

  return (
    <main className={rootClassName}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.name}>{character.name}</h1>
          <div className={styles.title}>{character.title || 'Путешественник'}</div>
        </div>

        <div className={styles.info}>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span>Редкость:</span>
              <div className={styles.rarity}>
                {'★'.repeat(character.rarity || 5)}
              </div>
            </div>
            <div className={styles.stat}>
              <span>Элемент:</span>
              <div className={styles.element}>{character.vision}</div>
            </div>
            <div className={styles.stat}>
              <span>Оружие:</span>
              <div>{character.weapon}</div>
            </div>
            <div className={styles.stat}>
              <span>Регион:</span>
              <div>{character.nation || 'Неизвестно'}</div>
            </div>
          </div>

          <div className={styles.description}>
            <h2>Описание</h2>
            <p>{character.description || 'Информация отсутствует'}</p>
          </div>

          {character.constellation && (
            <div className={styles.constellation}>
              <h2>Созвездие</h2>
              <div>{character.constellation}</div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default Character
