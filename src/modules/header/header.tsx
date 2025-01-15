import { FC } from 'react'
import classNames from 'classnames'

import config from '../../../package.json'
import styles from './header.module.scss'
import { HeaderProps } from './header.types'
import Logo from './logo'

const Header: FC<HeaderProps> = ({ className }) => {
  const headerClassName = classNames(styles.root, className)
  return (
    <header className={headerClassName}>
      <Logo />
    </header>
  )
}

export default Header
