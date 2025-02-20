'use client'
import { FC, useEffect, useState } from 'react'
import classNames from 'classnames'
import Image from 'next/image'

import styles from './characters.module.scss'
import { CharactersProps, CharacterDetails } from './characters.types'
import { getPosts } from '@/shared/api/instances'
import Link from 'next/link'
import { useAtom } from 'jotai'
import { urlAtom } from '@/shared/atoms/urlAtom'
import { charactersAtom } from '@/shared/atoms/charactersAtom'
import Filters, { FilterState } from './filters'

const Characters: FC<CharactersProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)
  const [url, setUrl] = useAtom(urlAtom)
  const [characters, setCharacters] = useAtom(charactersAtom)
  const [loading, setLoading] = useState(!characters.length)
  const [characterDetails, setCharacterDetails] = useState<Record<string, CharacterDetails>>({})
  const [filters, setFilters] = useState<FilterState>({
    vision: [],
    weapon: [],
    rarity: []
  })

  const changeUrl = (post: string) => {
    const url = post
    setUrl(url)
  }

  useEffect(() => {
    const fetchPosts = async () => {
      if (characters.length) return

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

  useEffect(() => {
    const fetchCharacterDetails = async () => {
      try {
        const details = await Promise.all(
          characters.map(async (character) => {
            const data = await getPosts(`/characters/${character}`)
            return [character, data] as [string, CharacterDetails]
          })
        )
        setCharacterDetails(Object.fromEntries(details))
      } catch (err) {
        console.error('Error fetching character details:', err)
      }
    }

    if (characters.length && !Object.keys(characterDetails).length) {
      fetchCharacterDetails()
    }
  }, [characters])

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

  const filterCharacters = (character: string) => {
    const details = characterDetails[character]
    if (!details) return false

    const hasNoFilters = !filters.vision.length && !filters.weapon.length && !filters.rarity.length
    if (hasNoFilters) return true

    const matchesVision = !filters.vision.length || filters.vision.includes(details.vision)
    const matchesWeapon = !filters.weapon.length || filters.weapon.includes(details.weapon)
    const matchesRarity = !filters.rarity.length || filters.rarity.includes(details.rarity)

    return matchesVision && matchesWeapon && matchesRarity
  }

  if (loading) {
    return (
      <div className={rootClassName}>
        <div className={styles.loading}>Загрузка...</div>
      </div>
    )
  }

  const filteredCharacters = characters.filter(filterCharacters)

  return (
    <div className={styles.container}>
      <Filters onFilterChange={setFilters} currentFilters={filters} />
      <div className={styles.grid}>
        {filteredCharacters.map((character, index) => {
          const details = characterDetails[character]
          if (!details) return null

          const elementColor = getElementColor(details.vision)
          const characterImagePath = `/images/characters/${character.toLowerCase()}.webp`

          return (
            <Link
              onClick={() => changeUrl('/characters/' + character)}
              href={`/characters/${character}`}
              key={index}
              className={styles.character}
              style={{
                borderColor: elementColor,
                backgroundColor: `${elementColor}33` // 20% opacity
              }}
            >
              <div className={styles.characterImage}>
                <Image
                  src={characterImagePath}
                  alt={character}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  style={{ objectFit: 'cover' }}
                  priority={index < 6}
                />
              </div>
              <div className={styles.content}>
                <div className={styles.vision} style={{ backgroundColor: elementColor }}>
                  {details.vision}
                </div>
                <h3 className={styles.name}>{character}</h3>
                {details.title && (
                  <div className={styles.title}>{details.title}</div>
                )}
                <div className={styles.rarity}>
                  {'★'.repeat(details.rarity)}
                </div>
                {details.weapon && (
                  <div className={styles.weapon}>{details.weapon}</div>
                )}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Characters
