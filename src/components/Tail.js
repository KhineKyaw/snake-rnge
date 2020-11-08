import React from "react"
import { StyleSheet, View } from "react-native"

import RectBase from "./RectBase"
import gameBoard from "../styles/gameBoard"

const Tail = props => (
  <View style={{ ...gameBoard, backgroundColor: "transparent" }}>
    {props.positionSequence.map(item => (
      <RectBase
        {...props}
        key={item.id}
        position={{ x: item.x, y: item.y }}
        style={styles.main}
      />
    ))}
  </View>
)

const styles = StyleSheet.create({
  main: {
    position: "absolute",
    backgroundColor: "yellowgreen",
    borderWidth: 2,
    borderColor: "teal"
  }
})

export default Tail
