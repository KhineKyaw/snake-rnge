import React, { PureComponent } from "react"
import { View, StyleSheet } from "react-native"

class RectBase extends PureComponent {
  constructor() {
    super()
  }

  render() {
    const x = this.props.position.x
    const y = this.props.position.y

    return (
      <View
        style={[
          styles.container,
          {
            ...this.props.style
          },
          {
            width: this.props.size,
            height: this.props.size,
            left: x * this.props.size,
            top: y * this.props.size
          }
        ]}></View>
    )
  }
}

export default RectBase

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 3
  }
})
