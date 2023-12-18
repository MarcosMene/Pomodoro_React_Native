import {
  StyleSheet,
  Platform,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native'
import { useEffect, useState } from 'react'
import Header from './src/components/Header'
import Timer from './src/components/Timer'
import { Audio } from 'expo-av'

const colors = ['#f7dc6fa4', '#a2d9ce8c', '#0b35dc2f']

export default function App() {
  const [isWorking, setIsWorking] = useState(false)

  //====usestate tempo
  const [time, setTime] = useState(25 * 60)

  //---currenttime
  const [currentTime, setCurrentTime] = useState('POMO' | 'SHORT' | 'BREAK')

  //--to show buttom stop/start if it is active or not
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    let interval = null

    if (isActive) {
      interval = setInterval(() => {
        setTime(time - 1)
      }, 1000)
    } else {
      clearInterval(interval)
    }

    if (time === 0) {
      setIsActive(false)
      setIsWorking((prev) => !prev)
      setTime(isWorking ? 300 : 1500)
      playEnd()
    }

    return () => clearInterval(interval)
  }, [isActive, time])

  const handleStartStop = () => {
    playSound()
    setIsActive(!isActive)
  }

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('./assets/click.wav')
    )
    await sound.playAsync()
  }
  const playEnd = async () => {
    const { sound } = await Audio.Sound.createAsync(require('./assets/end.mp3'))
    await sound.playAsync()
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors[currentTime] }]}
    >
      <View
        style={{
          flex: 1,
          paddingHorizontal: 15,
          paddingTop: Platform.OS === 'android' && 30,
        }}
      >
        <Text style={styles.text}>Pomodoro</Text>
        <Header
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          setTime={setTime}
        />
        <Timer time={time} />
        <TouchableOpacity
          onPress={handleStartStop}
          style={[
            {
              color: 'white',
              fontWeight: 'bold',
              alignSelf: 'center',
            },
            isActive
              ? {
                  alignItems: 'center',
                  backgroundColor: 'red',
                  padding: 15,
                  marginTop: 15,
                  borderRadius: 15,
                  width: 100,
                }
              : {
                  alignItems: 'center',
                  backgroundColor: 'green',
                  padding: 15,
                  marginTop: 15,
                  borderRadius: 15,
                  width: 100,
                },
          ]}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>
            {isActive ? 'STOP' : 'START'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginTop: 40,
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})
