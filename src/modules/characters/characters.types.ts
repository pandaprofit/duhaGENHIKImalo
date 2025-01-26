export interface CharactersProps {
  className?: string
  posts?: Post[]; // Add posts property to HomeProps
}

export interface Post {
    id: number;
    title: string;
    // Add other fields as necessary
}
