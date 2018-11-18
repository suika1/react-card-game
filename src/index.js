import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Card extends React.Component{
    constructor(props){
        super(props);
        this.onCoup = this.onCoup.bind(this);
    }

    onCoup(e){
        this.props.onCoup(this.props.id, this.props.img);
    }

    render(){
        let imageUrl;
        let style = {};
        let shirtUrl;

        if (this.props.img !== null) {
            imageUrl = require(`./img/${this.props.img}`);
            shirtUrl = require(`./img/${this.props.shirtImg}`);
            if (this.props.isInverted) {
                style.backgroundImage =`url(${imageUrl})`;
            }else {
                style.backgroundImage = `url(${shirtUrl}`;
            }
            style.backgroundSize =`100% 100%`;
        }
        else{
            style.opacity =0;
            style.backgroundColor = `inherit`;
        }

        return(
            <div className="card"
                 style={ //show either image, if chosen, or just bgColor
                    style
                 }
                 onClick = {this.onCoup}
            >
            </div>
        );
    }
}

class Board extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            invertedImg: null,
            inactiveCardsIds: [],
            invertedIds: [],
            allInactive: false,
            isVictory: true,
        };

        this.handleCoup = this.handleCoup.bind(this);
    }

    //show cards for the time and make them inactive
    //after that - hide all cards and make them active
    afterGameStarted(){
        if (this.props.cards.length === this.state.invertedIds.length)
            //this happens if shirt is changed while all cards are showing or if we changed size
            return;

        this.props.cards.forEach((card, index) => {
            this.state.inactiveCardsIds.push(index);
            this.state.invertedIds.push(index);
        });

        setTimeout(() =>{
            this.props.unforceNewGame();
            this.setState({
                invertedIds: [],
                inactiveCardsIds: [],
                isVictory: false,
            });
        }, 5000);
    }

    //Triggers when click on card happened
    handleCoup(id, img){
        console.log(`recieved click on id = ${id}, img = ${img}`);
        if (!this.state.invertedIds || this.state.invertedIds.length < 1 || this.state.invertedIds[0] === null) { //if no cards are inverted
            console.log(`currently no other card is inverted`);
            this.setState({
                invertedIds: [id],
                invertedImg: img,
            });
        }else if (this.state.invertedIds[0] === id){ //if clicked twice on same card
            console.log(`click on same card`);
            this.setState({
                invertedIds: [],
               invertedImg: null,
            });
        }
        else if (this.state.invertedImg === img) {//if clicked on card with same img(sibling)
            console.log(`clicked on sibling`);
            this.state.inactiveCardsIds.push(this.state.invertedIds[0], id);
            this.setState({
                invertedIds: [],
                invertedImg: null
            });

            //Victory
            if (this.state.inactiveCardsIds.length === this.props.cards.length) {
                this.setState({
                    invertedIds: [],
                    invertedImg: null,
                    inactiveCardsIds: [],
                    allInactive: false,
                    isVictory: true,
                });

                this.props.triggerNewGame();
            }

        }else{//click not on sibling
            console.log(`clicked on another card, making all inactive`);
            //show both cards and make all inactive
            this.setState({
                invertedIds: [...this.state.invertedIds, id],
                allInactive : true,
            });
            //after 1 sec - turn cards and make everything active
            setTimeout(() => {
                this.setState({
                    invertedImg: null,
                    invertedIds: [],
                    allInactive: false,
                });
                console.log(`All active again`);

              }, 1000);
        }
    }

    render(){
        if (this.state.isVictory || this.props.forcedNewGame) {
            this.afterGameStarted();
        }

        const cards = [];
        this.props.cards.forEach((card, index) =>{
            let img;
            if (this.state.invertedIds.length === this.props.cards.length){
                img = card.image;
            }else if (this.state.inactiveCardsIds.indexOf(index) !== -1
                && this.state.invertedIds
                && this.state.invertedIds.indexOf(index) === -1) {
                //This card will be hidden if it's inactive and not inverted
                img = null;
            }
            else{
                img = card.image;
            }

            let onCoup;
            //if card is hidden or all cards are inactive
            if (this.state.invertedIds.length === this.props.cards.length
                ||img === null || this.state.allInactive){
                onCoup = () => {return false};
            }
            else {
                onCoup = this.handleCoup;
            }

           cards.push(
               <Card
                   img = {img}
                   shirtImg = {this.props.shirtImg}
                   id = {index}
                   key = {index}
                   //if id of inverted card == card.key, then we show the card
                   isInverted = {this.state.invertedIds && this.state.invertedIds.indexOf(index) !== -1}
                   onCoup = {onCoup}
               />
           );
        });

        return(
            <div id="board" style={this.props.style}>
                {cards}
            </div>
        );
    }
}

class Game extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            fieldSize: '4x4',
            shirtImg: this.props.shirts[0].image,
            cardsInOrder: shuffle(this.props.cards[0]),
            forcedNewGame: false,
            winCount : 0,
        };

        this.triggerNewGame = this.triggerNewGame.bind(this);
        this.randomizeCards = this.randomizeCards.bind(this);
        this.unforceNewGame = this.unforceNewGame.bind(this);
        this.changeShirt = this.changeShirt.bind(this);
        this.changeSize = this.changeSize.bind(this);
        this.forceNewGame = this.forceNewGame.bind(this);
    }

    //Randomize cards when victory is achieved
    triggerNewGame(){
        console.log('Game received victory, updating');
        this.setState({
            winCount: this.state.winCount + 1,
        });
        this.randomizeCards();
    }

    randomizeCards(){
        this.setState({
            cardsInOrder: shuffle(this.state.cardsInOrder),
        });
    }

    unforceNewGame(){
        this.setState({
            forcedNewGame: false,
        });
    }

    //triggers on click on shirt div.
    changeShirt(event){
        let newShirtUrl = event.target.classList[1];
        this.setState({
            shirtImg: newShirtUrl,
        });
    }

    changeSize(event){
        if (this.state.forcedNewGame)
            return;
        let num;
        if (event.target.id === '4x4'){
            num = 0;
            this.setState({
                fieldSize: '4x4',
            });
        }else if (event.target.id === '6x6'){
            num = 1;
            this.setState({
                fieldSize: '6x6',
            });
        }else if (event.target.id === '8x8'){
            num = 2;
            this.setState({
                fieldSize: '8x8',
            });
        }
        this.setState({
            cardsInOrder: shuffle(this.props.cards[num]),
            forcedNewGame: true,
        });

    }

    forceNewGame(){
        this.setState({
            forcedNewGame: true,
            cardsInOrder: shuffle(this.state.cardsInOrder),
        });
    }

    render(){
        //build shirt list
        const shirts = [];
        this.props.shirts.forEach((shirt) => {
            let shirtImg = require(`./img/${shirt.image}`);
            shirts.push(
                <div className ={`shirt ${shirt.image}`}
                     style = {{backgroundImage: `url(${shirtImg})`, backgroundSize: `100% 100%`}}
                    onClick={this.changeShirt}
                     key = {shirt.image}
                />
            );
        });

        //setting right grid template
        let boardStyle = {};
        let strCol = '', strRow = '';
        for (let i = 0; i < Math.sqrt(this.state.cardsInOrder.length); i++){
            strCol = strCol.concat('1fr ');
            strRow = strRow.concat('1fr ');
        }
        boardStyle.gridTemplateColumns = strCol;
        boardStyle.gridTemplateRows = strRow;
        if (this.state.fieldSize === '4x4'){
            boardStyle.width = '600px';
            boardStyle.height = '600px';
        }else if (this.state.fieldSize === '6x6'){
            boardStyle.width = '900px';
            boardStyle.height = '900px';
        }

        return(
            <React.Fragment>
                <h1 id='header-shirts'>Рубашка карты</h1>
                <div id='shirtList'>
                    {shirts}
                </div>
                <div id='field-container'>
                    <Board
                        style={boardStyle}
                        cards={this.state.cardsInOrder}
                        shirtImg = {this.state.shirtImg}
                        triggerNewGame = {this.triggerNewGame}
                        forcedNewGame = {this.state.forcedNewGame}
                        unforceNewGame = {this.unforceNewGame}
                    />

                    <div id='settings-pane'>
                        <h1>Размер поля</h1>
                        <div>
                            <input className="size-radio" type="radio" id="4x4" name="size" value="4x4"
                                   checked ={this.state.fieldSize==='4x4'} onChange={this.changeSize}/>
                            <label htmlFor="huey">4x4</label>
                        </div>

                        <div>
                            <input className="size-radio" type="radio" id="6x6" name="size" value="6x6"
                                   checked ={this.state.fieldSize==='6x6'} onChange={this.changeSize}/>
                            <label htmlFor="dewey">6x6</label>
                        </div>


                        <div>
                            <button id='newGameBtn'  onClick={this.forceNewGame}>Начать новую игру</button>
                        </div>

                        <h1 id='win-counter'>Счётчик побед : {this.state.winCount}</h1>
                    </div>
                </div>
            </React.Fragment>
        );
    }

}

//shuffles an array
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}


//mocks for images
const CARDS4x4 = [
    {image: '4-1.jpg'},
    {image: '4-2.jpg'},
    {image: '4-3.jpg'},
    {image: '4-4.jpg'},

    {image: '4-5.jpg'},
    {image: '4-6.png'},
    {image: '4-7.png'},
    {image: '4-8.jpg'},

    {image: '4-1.jpg'},
    {image: '4-2.jpg'},
    {image: '4-3.jpg'},
    {image: '4-4.jpg'},

    {image: '4-5.jpg'},
    {image: '4-6.png'},
    {image: '4-7.png'},
    {image: '4-8.jpg'}
];

const CARDS6x6 = [
    {image: '6-1.jpg'},
    {image: '6-2.jpg'},
    {image: '6-3.jpg'},
    {image: '6-4.jpg'},
    {image: '6-5.jpg'},
    {image: '6-6.jpg'},

    {image: '6-7.jpg'},
    {image: '6-8.jpg'},
    {image: '6-9.jpg'},
    {image: '6-10.jpg'},
    {image: '6-11.jpg'},
    {image: '6-12.jpg'},

    {image: '6-13.jpg'},
    {image: '6-14.jpg'},
    {image: '6-15.jpg'},
    {image: '6-16.jpg'},
    {image: '6-17.jpg'},
    {image: '6-18.jpg'},

    {image: '6-1.jpg'},
    {image: '6-2.jpg'},
    {image: '6-3.jpg'},
    {image: '6-4.jpg'},
    {image: '6-5.jpg'},
    {image: '6-6.jpg'},

    {image: '6-7.jpg'},
    {image: '6-8.jpg'},
    {image: '6-9.jpg'},
    {image: '6-10.jpg'},
    {image: '6-11.jpg'},
    {image: '6-12.jpg'},

    {image: '6-13.jpg'},
    {image: '6-14.jpg'},
    {image: '6-15.jpg'},
    {image: '6-16.jpg'},
    {image: '6-17.jpg'},
    {image: '6-18.jpg'},
];


const CARDS = [CARDS4x4, CARDS6x6];

//mock for shirts
const SHIRTS = [
    {image: 's1.png'},
    {image: 's2.png'},
];

ReactDOM.render(
    <Game cards = {CARDS} shirts = {SHIRTS}/>,
    document.getElementById('root')
);