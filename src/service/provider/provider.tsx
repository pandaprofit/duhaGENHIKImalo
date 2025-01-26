'use client'

import { FC, ReactNode, useEffect } from 'react'
import { DeviceSize, SCALING_BREAKPOINTS } from '@/shared/const'
import { isDeviceAtom } from '@atoms/deviceAtom'
import { useScaling } from '@hooks/index'
import { Provider as JotaiProvider, useAtom } from 'jotai'
import { urlAtom } from '@/shared/atoms/urlAtom'

const ScalingLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const [isDeviceDetected] = useAtom(isDeviceAtom)

  useScaling({
    deviceBreakpoints: {
      tablet: DeviceSize.Tablet.PORTRAIT,
      desktop: DeviceSize.Desktop.SMALL
    },
    scalingBreakpoints: SCALING_BREAKPOINTS
  })

  return isDeviceDetected ? children : <></>
}

export const Provider: FC<{ children: ReactNode }> = ({ children }) => {
  const [urlValue] = useAtom(urlAtom);

  useEffect(() => {
    const fetchPosts = async () => {
      try { /* empty */ } catch (err) {
        console.log(err)
      }
    }

    fetchPosts()
  }, [urlValue])

  return (
    <JotaiProvider>
      <ScalingLayout>{children}</ScalingLayout>
    </JotaiProvider>
  )
}
