'use client'

import { FC } from 'react'
import classNames from 'classnames'
import { useAtom } from 'jotai'

import styles from './home.module.scss'
import { HomeProps } from './home.types'
import { pageAtom } from '@/shared/atoms/pageAtom'

const Home: FC<HomeProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)
  const [currentPage] = useAtom(pageAtom)

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <div className={styles.welcome}>
            <h1>Добро пожаловать в Genshin Helper</h1>
            <p>Выберите раздел в меню слева для начала работы</p>
          </div>
        )
      default:
        return (
          <div className={styles.comingSoon}>
            <h2>Этот раздел находится в разработке</h2>
            <p>Скоро здесь появится новый контент!</p>
          </div>
        )
    }
  }

  return (
    <main className={rootClassName}>
      {renderContent()}
    </main>
  )
}

export default Home
