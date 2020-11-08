import { Dimensions } from "react-native"

const { width, height } = Dimensions.get("screen")

const game_bord_dim = width * 0.95

const Constants = {
  MAX_WIDTH: width,
  MAX_HEIGHT: height,
  GRID_SIZE: 16,
  GAME_BORD_DIM: game_bord_dim,
  CELL_SIZE: game_bord_dim / 16
}

export default Constants
