import React from "react"
import { StyleSheet } from "react-native"

import RectBase from "./RectBase"

const Head = props => <RectBase {...props} style={styles.main} />

export default Head

const styles = StyleSheet.create({
  main: {
    position: "absolute",
    backgroundColor: "#07b54f",
    borderWidth: 2,
    borderColor: "teal",
    zIndex: 3
  }
})
