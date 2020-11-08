import React from "react"
import { StyleSheet, View } from "react-native"

import RectBase from "./RectBase"

const Food = props => <RectBase {...props} style={styles.main} />

const styles = StyleSheet.create({
  main: {
    position: "absolute",
    backgroundColor: "#f47f30",
    borderWidth: 2,
    borderColor: "#f94f4f"
  }
})

export default Food
