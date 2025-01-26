import Character from '@/views/character/character'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Legion Next.js template'
}

const CharacterPage = () => {

	return (
		<>
			<Character />
		</>
  )
}

export default CharacterPage
