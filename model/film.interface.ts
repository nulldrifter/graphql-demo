import { Character } from './character.interface'

export default interface Film {
  characters: Character[],
  episode_id: number,
  title: string
}
