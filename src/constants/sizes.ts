import { Dimensions } from 'react-native'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

export const SIZES = {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  MOVIE_CARD_WIDTH: 120,
  MOVIE_CARD_HEIGHT: 180,
  BANNER_HEIGHT: 480,
  TAB_BAR_HEIGHT: 60,
} as const
