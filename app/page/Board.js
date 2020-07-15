import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getBoard, getSolved, getValidate } from '../store/action/boardAction';

const windowWidth = Dimensions.get('window').width;

export default function BoardScreen({ route, navigation }) {
  const { name, difficulty } = route.params
  const [inputBoard, setInputBoard] = useState([])
  const { board, solution, validated } = useSelector(state => state.boardReducer)
  const dispatch = useDispatch()
  const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')

  const encodeParams = (params) => 
    Object.keys(params)
    .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
    .join('&');

  useEffect(() => {
    dispatch(getBoard(difficulty))
  }, [dispatch])

  useEffect(() => {
    setInputBoard(JSON.parse(JSON.stringify(board)))
  }, [board])

  useEffect(() => {
    if (validated !== 'broken') {
      setInputBoard(solution)
    }
    validated == 'solved' && navigation.navigate('Finish', {
      name
    })
  }, [solution, validated])

  const updateBoard = (text, iRow, iCol) => {
    let newBoard = JSON.parse(JSON.stringify(inputBoard))
    newBoard[iRow][iCol] = +text
    setInputBoard(newBoard)
  }

  const solved = () => {
    const newBoard = {
      board
    }
    const boardEncoded = encodeParams(newBoard)
    dispatch(getSolved(boardEncoded))
  }
  
  const validate = () => {
    const newBoard = {
      board: inputBoard
    }
    const boardEncoded = encodeParams(newBoard)
    dispatch(getValidate(boardEncoded))
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sudoku ^^</Text>
      <Text>Player : {name} </Text>
      <Text>Difficulty: {difficulty}</Text>
      <Text>Status: {validated}</Text>
      {inputBoard.map((row, iRow) => {
        return (
          <View style={styles.row} key={iRow}>
            {row.map((col, iCol) => {
              return (
                <View style={styles.col} key={iCol}>
                  {(board[iRow][iCol] == 0) ? <TextInput
                    value={inputBoard[iRow][iCol] > 0 ? String(inputBoard[iRow][iCol]) : ''}
                    maxLength={1}
                    keyboardType={"numeric"}
                    onChangeText={text => updateBoard(text, iRow, iCol)}
                  /> : <TextInput
                      editable={false}
                      defaultValue={String(col)}
                      style={styles.notZero}
                    />}
                </View>
              )
            })}
          </View>
        )
      })}
      <Button
        title="Validate"
        onPress={validate}
        style={styles.button}
      />
      <Button
        title="Solved"
        onPress={solved}
        style={styles.button}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 40
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row'
  },
  col: {
    borderWidth: 1,
    height: (windowWidth - 20) / 9,
    width: (windowWidth - 20) / 9,
  },
  notZero: {
    backgroundColor: 'grey'
  },
  button: {
    marginVertical: 7
  }
});
