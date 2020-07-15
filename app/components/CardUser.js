import React from 'react';
import { Text, View } from 'react-native';

const CardUser = ({ user }) => {
  return(
    <View>
      <Text>{user.title} </Text>
    </View>
  )
}

export default CardUser