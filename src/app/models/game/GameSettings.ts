export type GameSettings = {
  id?: number
  setting: string
}

export const initGameSettings = () => {
  return {
    setting: '',
  }
}
