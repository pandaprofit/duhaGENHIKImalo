'use client'
import { FC, useEffect, useState } from 'react'
import classNames from 'classnames'

import styles from './characters.module.scss'
import { CharactersProps, Post } from './characters.types'
import { getPosts } from '@/shared/api/instances'
import Link from 'next/link'
import { useAtom } from 'jotai'
import { urlAtom } from '@/shared/atoms/urlAtom'

const Characters: FC<CharactersProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)

  const [url, setUrl] = useAtom(urlAtom)

  const [characters, setCharacters] = useState<Post[]>([]); // Типизируйте свои данные правильно


  const changeUrl = (post: string) => {
    const url = post; // Assuming post has a url property
    setUrl(url);
  }

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await getPosts(url);
        setCharacters(Array.isArray(res) ? res : [])
      } catch (err) {
        console.error(err);
      }
    };

    fetchPosts();
  }, [url]);

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
