export interface Appearance {
  start: number;
  end: number;
  thumbnail: string;
}

export interface Person {
  id: string;
  name: string;
  appearances: Appearance[];
}
