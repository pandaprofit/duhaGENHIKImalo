'use client'

import { ReactNode } from 'react'
import { Provider } from '@service/provider'

interface ProvidersProps {
	children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
	return <Provider>{children}</Provider>
}
