import React, { useState } from "react";
import { View, Text, TouchableOpacity, Button } from "react-native";
import _ from "lodash";

export function Square(props) {
  const { width, height, backgroundColor, number, onPress } = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          width,
          height,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          padding: 10,
          backgroundColor: "cream",
        }}
      >
        <View
          style={{
            backgroundColor,
            width: width - 5,
            height: height - 5,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 25, color: "white" }}>{number}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function Game(props) {
  const { color } = props;
  const [game, setGame] = useState([]);
  const [score, setScore] = useState(0);
  const [oldArray, setPreviousArray] = useState([]);
  const desiredArray = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 0],
  ];

  const GAME_WIDTH = 210;
  const PIECE_SIZE = 70;

  const _onUndo = () => {
    if (score > 0) {
      const oldValues = _.cloneDeep(oldArray);
      setScore(score - 1);
      setGame(oldValues[oldValues.length - 1]);
      setPreviousArray(_.dropRight(oldValues));
    } else {
      return;
    }
  };

  const onClick = (index) => {
    const i = Math.floor(index / 3);
    const j = index % 3;
    const possibleZeros = [
      [-1, 0],
      [1, 0],
      [0, 1],
      [0, -1],
    ];
    const element = game[i][j];
    const oldValues = _.cloneDeep(game);
    console.log(oldValues);
    _.forEach(possibleZeros, (poss) => {
      const [di, dj] = poss;
      if (i + di >= 0 && i + di < 3 && j + dj >= 0 && j + dj < 3) {
        if (game[i + di][j + dj] == 0) {
          let newI = i + di;
          let newJ = j + dj;

          const newGame = _.cloneDeep(game);
          newGame[newI][newJ] = element;
          newGame[i][j] = 0;
          setScore(score + 1);
          setGame(newGame);
          setPreviousArray([...oldValues, newGame]);
          if (_isGameOver(newGame)) {
            alert("Game over");
            return;
          }
          return false;
        }
      }
    });
  };

  const _isGameOver = (newGame) => {
    if (newGame.length !== desiredArray.length) return false;
    let len = newGame.length;
    for (let i = 0; i < len; i++) {
      if (newGame[i] !== desiredArray[i]) {
        return false;
      }
    }
    return true;
  };

  const _shuffle = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const _solveTheProblem = () => {
    if (_isGameOver(desiredArray)) {
      alert("Game over");
    }

    setGame(desiredArray);
  };

  const _generateRandomNumber = () => {
    let h = 0;
    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 0];
    _shuffle(numbers);
    var newGame = new Array(3);
    for (let i = 0; i < newGame.length; i++) {
      newGame[i] = new Array(3);
    }
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        newGame[i][j] = numbers[h++];
      }
    }
    setGame(newGame);
    setScore(0);
    setPreviousArray([]);
  };

  const gamearray = _.flatten(game);
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <View
          style={{
            width: GAME_WIDTH,
            height: GAME_WIDTH,
            backgroundColor: "white",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {_.map(gamearray, (num, index) => {
            if (num == 0) {
              return (
                <Square
                  key={index}
                  width={PIECE_SIZE}
                  height={PIECE_SIZE}
                  backgroundColor={"white"}
                ></Square>
              );
            } else {
              return (
                <Square
                  key={index}
                  width={PIECE_SIZE}
                  height={PIECE_SIZE}
                  backgroundColor={color}
                  number={num}
                  onPress={() => {
                    onClick(index);
                  }}
                ></Square>
              );
            }
          })}
        </View>
      </View>
      <View style={{ bottom: 100 }}>
        <Text
          style={{
            color: "red",
            fontSize: 20,
            marginBottom: 10,
            textAlign: "center",
          }}
        >
          Score - {score}
        </Text>

        <Button
          title="Reset cube"
          onPress={() => {
            _generateRandomNumber();
          }}
        />
        <Button
          title="Undo"
          onPress={() => {
            _onUndo();
          }}
        />
        <Button
          title="Solve automatically"
          onPress={() => {
            _solveTheProblem();
          }}
        />
      </View>
    </>
  );
}
