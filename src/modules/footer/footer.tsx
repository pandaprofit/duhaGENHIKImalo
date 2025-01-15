import { FC } from 'react'
import IconGithub from '@icons/github-mark.svg'

import styles from './footer.module.scss'
import { FooterSocialItemI } from './footer.types'
import Social from './social'

const socialList: FooterSocialItemI[] = [
  {
    label: 'github repo',
    href: 'https://github.com/pandaprofit/nextjs-boilerplate',
    icon: <IconGithub />
  }
]

const Footer: FC = () => {
  return (
    <footer className={styles.root}>
      <a target="_blank">VoidSharks.agency</a>
      <Social items={socialList} />
    </footer>
  )
}

export default Footer
