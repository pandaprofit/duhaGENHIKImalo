'use client'

import { FC } from 'react'
import classNames from 'classnames'
import Link from 'next/link'
import Image from 'next/image'

import styles from './home.module.scss'
import { HomeProps } from './home.types'

const Home: FC<HomeProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)

  const events = [
    {
      title: 'Realm of Tempered Valor',
      timeLeft: '5д 7ч',
      type: 'upcoming'
    },
    {
      title: 'Enchanted Tales of the Mikawa Festival',
      timeLeft: '12д 1ч',
      type: 'current'
    },
    {
      title: "Dawn's Drifting Reverie - Yumemizuki",
      timeLeft: '13д 15ч',
      type: 'current'
    }
  ]

  const farmableToday = [
    { name: 'Сяо', element: 'Anemo', rarity: 5 },
    { name: 'Кэйа', element: 'Cryo', rarity: 4 },
    { name: 'Дилюк', element: 'Pyro', rarity: 5 },
    // Добавьте больше персонажей по необходимости
  ]

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

  return (
    <div className={rootClassName}>
      <section className={styles.welcome}>
        <div className={styles.welcomeContent}>
          <h1>Добро пожаловать на Genshin Helper!</h1>
          <p>
            Твой лучший компаньон в Genshin Impact! Поможет тебе распланировать материалы для
            фарма благодаря калькулятору возвышения, а также отслеживать свой прогресс с помощью
            счетчика молитв и списка дел.
          </p>
          <Link href="/characters" className={styles.startButton}>
            Начать
          </Link>
        </div>
        <div className={styles.welcomeImage}>
          {/* Здесь можно добавить изображение персонажей */}
        </div>
      </section>

      <div className={styles.grid}>
        <section className={styles.events}>
          <h2>События</h2>
          <div className={styles.eventsList}>
            {events.map((event, index) => (
              <div key={index} className={classNames(styles.eventCard, styles[event.type])}>
                <h3>{event.title}</h3>
                <div className={styles.timeLeft}>{event.timeLeft}</div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.farmToday}>
          <h2>Можно фармить сегодня</h2>
          <div className={styles.charactersGrid}>
            {farmableToday.map((character, index) => (
              <div
                key={index}
                className={styles.characterCard}
                style={{
                  borderColor: getElementColor(character.element),
                  backgroundColor: `${getElementColor(character.element)}22`
                }}
              >
                <div className={styles.characterInfo}>
                  <span className={styles.characterName}>{character.name}</span>
                  <div className={styles.characterRarity}>
                    {'★'.repeat(character.rarity)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.stats}>
          <h2>Статистика молитв</h2>
          <div className={styles.statsCards}>
            <div className={styles.statsCard}>
              <div className={styles.statsValue}>26%</div>
              <div className={styles.statsLabel}>из всех 5★</div>
            </div>
            <div className={styles.statsCard}>
              <div className={styles.statsValue}>42%</div>
              <div className={styles.statsLabel}>из всех 5★</div>
            </div>
          </div>
        </section>

        <section className={styles.discord}>
          <h2>Discord</h2>
          <div className={styles.discordCard}>
            <div className={styles.discordInfo}>
              <div className={styles.onlineCount}>14711 Людей онлайн</div>
              <p>
                Присоединяйтесь к нашему Discord серверу для новостей о последних обновлениях,
                а также для обсуждения Genshin Impact и отзывов о genshin helper.
              </p>
              <a href="#" className={styles.discordButton}>
                Присоединиться к серверу
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home
