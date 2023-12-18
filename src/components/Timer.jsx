import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Timer = ({ time }) => {
  const formattedTime = `${Math.floor(time / 60)
    .toString()
    .padStart(2, '0')}:${(time % 60).toString().padStart(2, '0')}`
  return (
    <View style={styles.container}>
      <Text style={styles.time}>{formattedTime}</Text>
    </View>
  )
}

export default Timer

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
    padding: 6,
    marginBottom: 30,
    width: 350,
    alignSelf: 'center',
    borderRadius: 45,
    borderWidth: 4,
    borderBlockColor: 'transparent',
  },
  time: {
    fontSize: 80,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
})
