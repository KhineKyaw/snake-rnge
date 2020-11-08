import Constants from "./constants"
import getRandomBetween from "./general/getRandomBetween"

const GameLoop = (entities, { touches, dispatch, events }) => {
  let { head, food, tail } = entities

  if (events.length) {
    events.forEach(e => {
      switch (e.type) {
        case "move-up":
          head.speed.y = -1
          head.speed.x = 0
          break
        case "move-down":
          head.speed.y = 1
          head.speed.x = 0
          break
        case "move-left":
          head.speed.x = -1
          head.speed.y = 0
          break
        case "move-right":
          head.speed.x = 1
          head.speed.y = 0
          break
        default:
          null
      }
    })
  }

  head.nextMove -= 1
  if (!head.nextMove) {
    head.nextMove = head.updateFrequency

    // Update tail position
    if (tail.positionSequence.length) {
      tail.positionSequence = tail.positionSequence
        .concat({ id: tail.positionSequence[0].id, ...head.position })
        .slice(1)
    }

    // Update head position
    head.position.x += head.speed.x
    head.position.y += head.speed.y

    // Check collide with wall and tail
    const collideWithTail = !tail.positionSequence.reduce(
      (sumBool, tpos) =>
        (tpos.x !== head.position.x || tpos.y !== head.position.y) && sumBool,
      true
    )
    if (
      head.position.x + head.speed.x > Constants.GRID_SIZE ||
      head.position.x < 0 ||
      head.position.y + head.speed.y > Constants.GRID_SIZE ||
      head.position.y < 0 ||
      collideWithTail
    ) {
      head.position = { x: 4, y: 5 }
      tail.positionSequence = []
      dispatch({
        type: "game-over"
      })
    }

    // Check collide with food
    if (
      head.position.x === food.position.x &&
      head.position.y === food.position.y
    ) {
      dispatch({
        type: "update-score"
      })
      // Expend tail
      tail.positionSequence = [
        { id: tail.positionSequence.length, ...head.position },
        ...tail.positionSequence
      ]

      // Sample food position
      food.position = {
        x: getRandomBetween(0, Constants.GRID_SIZE),
        y: getRandomBetween(0, Constants.GRID_SIZE)
      }
    }
  }

  return entities
}

export { GameLoop }
