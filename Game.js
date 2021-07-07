import React from "react";
import {
    View,
    Text,
    TouchableOpacity
} from "react-native";
import _ from "lodash";

const GAME_WIDTH = 210;
const PIECE_SIZE = 70;


export class Square extends React.Component {
    render() {
        const { width, height, backgroundColor, number, onPress } = this.props;
        return (
            <TouchableOpacity onPress={onPress}>
                <View style={{width, height, flexDirection: "row", alignItems: "center", justifyContent: "center", padding: 10, backgroundColor: "cream"}}>
                    <View style={{backgroundColor, width: width-5, height: height-5, alignItems: "center", justifyContent: "center"}}>
                        <Text style={{fontSize: 25, color: "white"}}>{number}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}





export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            game: [[1, 2, 3], [4, 5, 6], [7, 8, 0]],
            score: 100
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.game !== this.state.game;
    }
    

    onClick = (index) => {
        this.setState({clicked: true});
        const i = Math.floor(index / 3);
        const j = index % 3;

        const possibleZeros = [[-1, 0], [1, 0], [0, 1], [0, -1]];
        const { game } = this.state;
        const element = game[i][j];
        _.forEach(possibleZeros, (poss) => {
            const [di, dj] = poss;
            if (i + di >= 0 && i + di < 3 && j + dj >= 0 && j <+ dj < 3) {
                if (game[i+di][j+dj] == 0) {
                    let newI = i + di;
                    let newJ = j + dj;
                                        
                    //const newGame = _.clone(game);
                    //newGame[newI][newJ] = element;
                    //newGame[i][j] = 0;
                    this.setState({game: newGame, playerName: 'amal'});
                    return false;
                }
            }
        })
    }

    render() {
        const { game } = this.state;
        const gamearray = _.flatten(game);
        const { color } = this.props;
        return (
            <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center", flex: 1}}>
                <View style={{width: GAME_WIDTH, height: GAME_WIDTH, backgroundColor: "white", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center"}}>
                {
                    _.map(gamearray, (num, index) => {
                        if (num == 0) {
                            return <Square key={index} width={PIECE_SIZE} height={PIECE_SIZE} backgroundColor={"white"} ></Square>
                        } else {
                            return <Square key={index} width={PIECE_SIZE} height={PIECE_SIZE} backgroundColor={color} number={num} onPress={() => {this.onClick(index)}} ></Square>
                        }
                    })
                }
                </View>
            </View>
        )
    }
}