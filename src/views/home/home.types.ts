export interface HomeProps {
  className?: string;
}

export interface Event {
  title: string;
  timeLeft: string;
  type: 'upcoming' | 'current';
}

export interface FarmableCharacter {
  name: string;
  element: string;
  rarity: number;
}
