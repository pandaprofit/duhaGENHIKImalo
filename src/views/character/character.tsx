'use client'
import { FC, useEffect, useState } from 'react'
import classNames from 'classnames'
import { useParams } from 'next/navigation'
import Image from 'next/image'

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

  const getElementColor = (vision: string) => {
    const colors: Record<string, string> = {
      Pyro: '#f64747',
      Hydro: '#4680ff',
      Anemo: '#4fc3a0',
      Electro: '#a757f6',
      Dendro: '#6fb327',
      Cryo: '#98d2e6',
      Geo: '#fab632'
    }
    return colors[vision] || '#ffffff'
  }

  if (loading) {
    return (
      <main className={rootClassName}>
        <div className={styles.loading}>
          <div className={styles.loadingSpinner}></div>
          <div className={styles.loadingText}>Загрузка данных персонажа...</div>
        </div>
      </main>
    )
  }

  if (!character) {
    return (
      <main className={rootClassName}>
        <div className={styles.error}>
          <div className={styles.errorIcon}>⚠️</div>
          <div className={styles.errorText}>Персонаж не найден</div>
        </div>
      </main>
    )
  }

  const characterImagePath = `/images/characters/${(params.character as string).toLowerCase()}.webp`
  const elementColor = getElementColor(character.vision)

  return (
    <main className={rootClassName}>

      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.titleSection}>
            <div className={styles.vision} style={{ backgroundColor: elementColor }}>
              <span>{character.vision}</span>
            </div>
            <h1 className={styles.name}>{character.name}</h1>
            <div className={styles.title}>{character.title || 'Путешественник'}</div>
          </div>
          <div className={styles.rarity}>
            {'★'.repeat(character.rarity || 5)}
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.characterPortrait}>
            <div className={styles.portraitContainer}>
              <Image
                src={characterImagePath}
                alt={character.name}
                fill
                quality={95}
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center 15%'
                }}
              />
              <div className={styles.portraitGlow} style={{ '--element-color': elementColor } as React.CSSProperties} />
            </div>
          </div>

          <div className={styles.details}>
            <div className={styles.statsGrid}>
              <div className={styles.stat} style={{ '--element-color': elementColor } as React.CSSProperties}>
                <div className={styles.statIcon}>⚔️</div>
                <span className={styles.statLabel}>Оружие</span>
                <div className={styles.statValue}>{character.weapon}</div>
              </div>
              <div className={styles.stat} style={{ '--element-color': elementColor } as React.CSSProperties}>
                <div className={styles.statIcon}>🏰</div>
                <span className={styles.statLabel}>Регион</span>
                <div className={styles.statValue}>{character.nation || 'Неизвестно'}</div>
              </div>
              <div className={styles.stat} style={{ '--element-color': elementColor } as React.CSSProperties}>
                <div className={styles.statIcon}>⭐</div>
                <span className={styles.statLabel}>Редкость</span>
                <div className={styles.statValue}>{character.rarity || 5}★</div>
              </div>
              {character.affiliation && (
                <div className={styles.stat} style={{ '--element-color': elementColor } as React.CSSProperties}>
                  <div className={styles.statIcon}>🏢</div>
                  <span className={styles.statLabel}>Организация</span>
                  <div className={styles.statValue}>{character.affiliation}</div>
                </div>
              )}
            </div>

            <div className={styles.description}>
              <h2>О персонаже</h2>
              <p>{character.description || 'Информация отсутствует'}</p>
            </div>

            {character.constellation && (
              <div className={styles.constellation}>
                <h2>Созвездие</h2>
                <div className={styles.constellationContent}>
                  <div className={styles.constellationIcon}>✨</div>
                  <div>
                    <div className={styles.constellationName}>{character.constellation_name}</div>
                    <p>{character.constellation}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export default Character
