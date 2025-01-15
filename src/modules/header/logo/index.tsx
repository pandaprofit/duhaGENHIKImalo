import { FC } from 'react'
import Link from 'next/link'
import PaimonLogo from '@icons/paimonLogo.svg'

import styles from './logo.module.scss'

const Logo: FC = () => (
  <Link href="/" className={styles.root} aria-label="home">
    <PaimonLogo />
  </Link>
)

export default Logo
