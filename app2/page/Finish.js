import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useDispatch } from 'react-redux';
// import LottieView from "lottie-react-native";

export default function FinishScreen({ route, navigation }) {
  const { name } = route.params
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({
      type: 'GET_VALIDATE',
      payload: {
        validated: 'unsolved'
      }
    })
  }, [dispatch])

  return (
    <View style={styles.container}>
      <Text>
        Congratulation {name} ^^
      </Text>
      {/* <LottieView source={require('./animation.json')} autoPlay loop />; */}
      <Button
        title="Home"
        onPress={() => navigation.navigate('Home')}
        style={styles.button}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})