import React from 'react';
import ReactDOM from 'react-dom';
import { Board } from './Board';
import { CARDS, SHIRTS, shuffle } from './constants';
import './index.css';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fieldSize: '4x4',
            shirtImg: this.props.shirts[0].image,
            cardsInOrder: shuffle(this.props.cards[0]),
            forcedNewGame: true,
            winCount: 0,
        };
    }

    //Randomize cards when victory is achieved
    triggerNewGame = () => {
        console.log('Game received victory, updating');
        this.setState({
            winCount: this.state.winCount + 1,
        });
        this.randomizeCards();
    };

    randomizeCards = () => {
        this.setState({
            cardsInOrder: shuffle(this.state.cardsInOrder),
        });
        this.forceNewGame();
    };

    //set value for forcedNewGame to false
    unforceNewGame = () => this.setState({ forcedNewGame: false });

    //triggers on click on shirt div.
    changeShirt = (event) => {
        let newShirtUrl = event.target.classList[1];
        this.setState({
            shirtImg: newShirtUrl,
        });
    };

    changeSize = (event) => {
        if (this.state.forcedNewGame)
            return;
        let num;
        //set fieldSize
        switch (event.target.id) {
            case '4x4':
                num = 0;
                this.setState({
                    fieldSize: '4x4',
                });
                break;
            case '6x6':
                num = 1;
                this.setState({
                    fieldSize: '6x6',
                });
                break;
            default:
                num = 0;
                this.setState({
                    fieldSize: '4x4',
                });
        }
        //set cards array and force new game
        this.setState({
            cardsInOrder: shuffle(this.props.cards[num]),
            forcedNewGame: true,
        });
    };

    forceNewGame = () => {
        if (!this.state.forcedNewGame)
            this.setState({
                forcedNewGame: true,
                cardsInOrder: shuffle(this.state.cardsInOrder),
            });
    };

    render = () => {
        //build shirt list
        const shirts = [];
        this.props.shirts.forEach((shirt) => {
            let shirtImg = require(`./img/${shirt.image}`);
            shirts.push(
                <div className={`shirt ${shirt.image}`}
                    style={{ backgroundImage: `url(${shirtImg})`, backgroundSize: `100% 100%` }}
                    onClick={this.changeShirt}
                    key={shirt.image}
                />
            );
        });

        //setting right grid template
        let boardStyle = {};
        let strCol = '', strRow = '';
        for (let i = 0; i < Math.sqrt(this.state.cardsInOrder.length); i++) {
            strCol = strCol.concat('1fr ');
            strRow = strRow.concat('1fr ');
        }
        boardStyle.gridTemplateColumns = strCol;
        boardStyle.gridTemplateRows = strRow;
        if (this.state.fieldSize === '4x4') {
            boardStyle.width = '600px';
            boardStyle.height = '600px';
        } else if (this.state.fieldSize === '6x6') {
            boardStyle.width = '900px';
            boardStyle.height = '900px';
        }

        return (
            <React.Fragment>
                <h1 id='header-shirts'>Рубашка карты</h1>
                <div id='shirtList'>
                    {shirts}
                </div>
                <div id='field-container'>
                    <Board
                        style={boardStyle}
                        cards={this.state.cardsInOrder}
                        shirtImg={this.state.shirtImg}
                        triggerNewGame={this.triggerNewGame}
                        forcedNewGame={this.state.forcedNewGame}
                        unforceNewGame={this.unforceNewGame}
                    />

                    <div id='settings-pane'>
                        <h1>Размер поля</h1>
                        <div>
                            <input className="size-radio" type="radio" id="4x4" name="size" value="4x4"
                                checked={this.state.fieldSize === '4x4'} onChange={this.changeSize} />
                            <label htmlFor="huey">4x4</label>
                        </div>

                        <div>
                            <input className="size-radio" type="radio" id="6x6" name="size" value="6x6"
                                checked={this.state.fieldSize === '6x6'} onChange={this.changeSize} />
                            <label htmlFor="dewey">6x6</label>
                        </div>


                        <div>
                            <button id='newGameBtn' onClick={this.forceNewGame}>Начать новую игру</button>
                        </div>

                        <h1 id='win-counter'>Счётчик побед : {this.state.winCount}</h1>
                    </div>
                </div>
            </React.Fragment>
        );
    }

}

ReactDOM.render(
    <Game cards={CARDS} shirts={SHIRTS} />,
    document.getElementById('root')
);
