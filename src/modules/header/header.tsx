'use client'
import { FC } from 'react'
import classNames from 'classnames'
import { useAtom } from 'jotai'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

import styles from './header.module.scss'
import { HeaderProps } from './header.types'
import { pageAtom, PageType } from '@/shared/atoms/pageAtom'

const Header: FC<HeaderProps> = ({ className }) => {
  const headerClassName = classNames(styles.root, className)
  const [currentPage, setCurrentPage] = useAtom(pageAtom)
  const pathname = usePathname()

  // Синхронизируем URL с состоянием
  useEffect(() => {
    const page = pathname === '/' ? 'home' : pathname.slice(1) as PageType
    setCurrentPage(page)
  }, [pathname, setCurrentPage])

  const navigation = [
    {
      title: 'Главная',
      icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0zIDEyTDUgMTBNNSAxMEwyMSAyTDEyIDIxTDUgMTBaIi8+PC9zdmc+',
      page: 'home' as PageType,
      path: '/'
    },
    {
      title: 'Персонажи',
      icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0yMCA3SDRhMiAyIDAgMCAwLTIgMnY5YTIgMiAwIDAgMCAyIDJoMTZhMiAyIDAgMCAwIDItMlY5YTIgMiAwIDAgMC0yLTJ6Ii8+PHJlY3QgeD0iOCIgeT0iMiIgd2lkdGg9IjgiIGhlaWdodD0iNSIgcng9IjEiLz48cGF0aCBkPSJNOCAxMmg4Ii8+PHBhdGggZD0iTTggMTZoOCIvPjwvc3ZnPg==',
      page: 'characters' as PageType,
      path: '/characters'
    },
    {
      title: 'Счетчик молитв',
      icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5Z29uIHBvaW50cz0iMTIgMiAxNS4wOSA4LjI2IDIyIDkuMjcgMTcgMTQuMTQgMTguMTggMjEuMDIgMTIgMTcuNzcgNS44MiAyMS4wMiA3IDE0LjE0IDIgOS4yNyA4LjkxIDguMjYgMTIgMiIvPjwvc3ZnPg==',
      page: 'wishes' as PageType,
      path: '/wishes'
    },
    {
      title: 'Калькулятор',
      icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxyZWN0IHg9IjQiIHk9IjQiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgcng9IjIiLz48bGluZSB4MT0iOCIgeTE9IjkiIHgyPSIxNiIgeTI9IjkiLz48bGluZSB4MT0iOCIgeTE9IjEzIiB4Mj0iMTYiIHkyPSIxMyIvPjxsaW5lIHgxPSI4IiB5MT0iMTciIHgyPSIxNiIgeTI9IjE3Ii8+PC9zdmc+',
      page: 'calculator' as PageType,
      path: '/calculator'
    },
    {
      title: 'Список дел',
      icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxsaW5lIHgxPSI4IiB5MT0iNiIgeDI9IjIxIiB5Mj0iNiIvPjxsaW5lIHgxPSI4IiB5MT0iMTIiIHgyPSIyMSIgeTI9IjEyIi8+PGxpbmUgeDE9IjgiIHkxPSIxOCIgeDI9IjIxIiB5Mj0iMTgiLz48bGluZSB4MT0iMyIgeTE9IjYiIHgyPSIzLjAxIiB5Mj0iNiIvPjxsaW5lIHgxPSIzIiB5MT0iMTIiIHgyPSIzLjAxIiB5Mj0iMTIiLz48bGluZSB4MT0iMyIgeTE9IjE4IiB4Mj0iMy4wMSIgeTI9IjE4Ii8+PC9zdmc+',
      page: 'tasks' as PageType,
      path: '/tasks'
    },
    {
      title: 'База данных',
      icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxlbGxpcHNlIGN4PSIxMiIgY3k9IjUiIHJ4PSI5IiByeT0iMyIvPjxwYXRoIGQ9Ik0yMSAxMmMwIDEuNjYtNCAzLTkgM3MtOS0xLjM0LTktMyIvPjxwYXRoIGQ9Ik0zIDV2MTRjMCAxLjY2IDQgMyA5IDNzOS0xLjM0IDktM1Y1Ii8+PC9zdmc+',
      page: 'database' as PageType,
      path: '/database'
    }
  ]

  return (
    <header className={headerClassName}>
      <nav className={styles.nav}>
        {navigation.map((item, index) => (
          <Link
            key={index}
            href={item.path}
            className={classNames(styles.navItem, {
              [styles.active]: currentPage === item.page
            })}
            onClick={() => setCurrentPage(item.page)}
          >
            <div className={styles.iconWrapper}>
              <img
                src={item.icon}
                alt={item.title}
                width={24}
                height={24}
              />
            </div>
            <span>{item.title}</span>
          </Link>
        ))}
      </nav>
    </header>
  )
}

export default Header
