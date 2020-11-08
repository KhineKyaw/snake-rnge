import React, { PureComponent, useState } from "react"
import {
  AppRegistry,
  StyleSheet,
  StatusBar,
  View,
  TouchableOpacity,
  Text,
  Animated,
  Alert,
  Easing
} from "react-native"
import { GameEngine } from "react-native-game-engine"

import Constants from "./src/constants"
import Head from "./src/components/Head"
import Food from "./src/components/Food"
import { GameLoop } from "./src/systems"
import getRandomBetween from "./src/general/getRandomBetween"
import Tail from "./src/components/Tail"
import gameBoard from "./src/styles/gameBoard"

const createButtonAlert = () =>
  Alert.alert("Game Over", "You lose!", [{ text: "OK" }], { cancelable: false })

const InfoTextView = props => {
  const animatedScaleVal = new Animated.Value(0)

  const animateOpacity = () => {
    Animated.loop(
      Animated.timing(animatedScaleVal, {
        toValue: 1,
        duration: 1800,
        easing: Easing.linear,
        useNativeDriver: true
      })
    ).start()
  }

  animateOpacity()

  return (
    <Animated.View
      style={[
        styles.infoTextView,
        {
          transform: [
            {
              scale: animatedScaleVal.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [0.78, 1, 0.78]
              })
            }
          ]
        }
      ]}>
      <Text style={{ fontSize: 25, color: "darkslategrey" }}>
        Press any Key to Start
      </Text>
    </Animated.View>
  )
}

export default class GameCanvs extends PureComponent {
  constructor() {
    super()
    this.state = {
      running: false,
      score: 0
    }
  }

  userActionHandler = type => {
    this.engine.dispatch({ type })
    if (!this.state.running) this.setState({ running: true })
  }

  onEvent = e => {
    if (e.type === "game-over") {
      this.setState({ running: false })
      this.setState({ score: 0 })
    } else if (e.type === "update-score") {
      this.setState({ score: this.state.score + 1 })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.text}>Score : {this.state.score}</Text>
        </View>
        <GameEngine
          style={gameBoard}
          ref={ref => (this.engine = ref)}
          systems={[GameLoop]}
          onEvent={this.onEvent}
          running={this.state.running}
          entities={{
            head: {
              position: { x: 4, y: 5 },
              speed: { x: 1, y: 0 },
              updateFrequency: 12,
              nextMove: 12,
              size: Constants.CELL_SIZE,
              renderer: <Head />
            },
            tail: {
              positionSequence: [],
              size: Constants.CELL_SIZE,
              renderer: <Tail />
            },
            food: {
              position: {
                x: getRandomBetween(0, Constants.GRID_SIZE),
                y: getRandomBetween(0, Constants.GRID_SIZE)
              },
              size: Constants.CELL_SIZE,
              renderer: <Food />
            }
          }}>
          {!this.state.running ? <InfoTextView /> : null}
          <StatusBar hidden={true} />
        </GameEngine>
        <View style={styles.buttonView}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.userActionHandler("move-up")}
            delayPressIn={0}>
            <Text style={styles.text}>UP</Text>
          </TouchableOpacity>
          <View style={styles.middle}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.userActionHandler("move-left")}
              delayPressIn={0}>
              <Text style={styles.text}>LEFT</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.userActionHandler("move-right")}
              delayPressIn={0}>
              <Text style={styles.text}>RIGHT</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.userActionHandler("move-down")}
            delayPressIn={0}>
            <Text style={styles.text}>DOWN</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightseagreen",
    justifyContent: "center",
    alignItems: "center"
  },
  header: {
    height: 60,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonView: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10
  },
  button: {
    backgroundColor: "#ffffff60",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    borderColor: "#ffffff80",
    borderWidth: 2,
    width: 100
  },
  text: {
    fontSize: 20,
    color: "darkslategrey",
    alignSelf: "center"
  },
  middle: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between"
  },
  infoTextView: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute"
  }
})

AppRegistry.registerComponent("GameCanvs", () => GameCanvs)
