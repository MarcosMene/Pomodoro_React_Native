import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const options = ['25 minutes', '5 minutes', '15 minutes']

const Header = ({ currentTime, setCurrentTime, setTime }) => {
  function handlePress(index) {
    const newTime = index === 0 ? 25 : index === 1 ? 5 : 15
    setCurrentTime(index)
    setTime(newTime * 60)
  }

  return (
    <View style={{ flexDirection: 'row', marginBottom: 30 }}>
      {options.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handlePress(index)}
          style={[
            styles.itemStyle,
            currentTime !== index && {
              borderColor: 'transparent',
              backgroundColor: 'transparent',
            },
          ]}
        >
          <Text style={{ fontWeight: 'bold' }}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  itemStyle: {
    width: '33%',
    alignItems: 'center',
    borderWidth: 3,
    padding: 5,
    borderRadius: 10,
    marginVertical: 20,
    backgroundColor: '#fff',
    borderColor: 'green',
  },
})
