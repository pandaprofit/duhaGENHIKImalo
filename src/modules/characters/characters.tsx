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

  const [posts, setPosts] = useState<Post[]>([]); // Типизируйте свои данные правильно

  const changeUrl = (post: string) => {
    const url = post; // Assuming post has a url property
    setUrl(url);
  }

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await getPosts(url);
        setPosts(res); // Предполагаем, что ваши данные находятся в res
      } catch (err) {
        console.error(err);
      }
    };

    fetchPosts();
  }, [url]);

  return (
    <div className={rootClassName}>
      {posts.map((post, index) => (
        <Link
          onClick={() => changeUrl('/characters/' + post)}
          href={'/characters/' + post}
          key={index}
          className={styles.character}
        >
          <div>{post}</div>
        </Link>
      ))}
    </div>
  )
}

export default Characters
