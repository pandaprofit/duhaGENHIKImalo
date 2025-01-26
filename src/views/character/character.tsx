import { FC } from 'react'
import classNames from 'classnames'

import styles from './character.module.scss'
import { CharacterProps } from './character.types'

const Character: FC<CharacterProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <main className={rootClassName}>
      
    </main>
  )
}

export default Character
