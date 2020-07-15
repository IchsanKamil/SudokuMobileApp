import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Picker } from 'react-native';
// import { Picker } from '@react-native-community/picker';

export default function HomeScreen({ navigation }) {
  const [name, setName] = useState('')
  const [difficulty, setDifficulty] = useState('easy')

  return (
    <View style={styles.container}>
      <Text>
        Welcome ^^
      </Text>
      <TextInput
        style={styles.input}
        placeholder='Name'
        onChangeText={(text) => setName(text)}
      />
      <Picker
        selectedValue={difficulty}
        style={{ height: 50, width: 100 }}
        onValueChange={(itemValue, itemIndex) =>
          setDifficulty(itemValue)
        }>
        <Picker.Item label="Easy" value="easy" />
        <Picker.Item label="Medium" value="medium" />
        <Picker.Item label="Hard" value="hard" />
        <Picker.Item label="Random" value="random" />
      </Picker>
      <Button
        title="Play"
        onPress={() => navigation.navigate('Board', {
          name,
          difficulty
        })}
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
  },
  input: {
    width: '90%',
    borderWidth: 1,
    padding: 12,
    borderColor: '#aaa'
  },
  button: {
    marginVertical: 7
  },
})