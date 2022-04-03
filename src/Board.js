import React from 'react';
import { Card } from './Card';

export class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            invertedImg: null,
            inactiveCardsIds: [],
            invertedIds: [],
            allInactive: false,
            isVictory: true,
        };
    }

    //show cards for the time and make them inactive
    //after that - hide all cards and make them active
    afterGameStarted = () => {
        if (this.props.cards.length === this.state.invertedIds.length)
            //this happens if shirt is changed while all cards are showing or if we changed size
            return;

        this.props.cards.forEach((card, index) => {
            this.state.inactiveCardsIds.push(index);
            this.state.invertedIds.push(index);
        });

        setTimeout(() => {
            this.props.unforceNewGame();
            this.setState({
                invertedIds: [],
                inactiveCardsIds: [],
                isVictory: false,
            });
        }, 5000);
    };

    //Triggers when click on card happened
    handleCoup = (id, img) => {
        console.log(`received click on id = ${id}, img = ${img}`);
        if (!this.state.invertedIds || this.state.invertedIds.length < 1 || this.state.invertedIds[0] === null) { //if no cards are inverted
            console.log(`currently no other card is inverted`);
            this.setState({
                invertedIds: [id],
                invertedImg: img,
            });
        } else if (this.state.invertedIds[0] === id) { //if clicked twice on same card
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

        } else {//click not on sibling
            console.log(`clicked on another card, making all inactive`);
            //show both cards and make all inactive
            this.setState({
                invertedIds: [...this.state.invertedIds, id],
                allInactive: true,
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
    };

    render() {
        if (this.state.isVictory || this.props.forcedNewGame) {
            this.afterGameStarted();
        }

        const cards = [];
        this.props.cards.forEach((card, index) => {
            let img;
            if (this.state.invertedIds.length === this.props.cards.length) {
                img = card.image;
            } else if (this.state.inactiveCardsIds.indexOf(index) !== -1
                && this.state.invertedIds
                && this.state.invertedIds.indexOf(index) === -1
            ) {
                //This card will be hidden if it's inactive and not inverted
                img = null;
            }
            else {
                img = card.image;
            }

            let onCoup;
            //if card is hidden or all cards are inactive
            if (this.state.invertedIds.length === this.props.cards.length
                || img === null || this.state.allInactive
            ) {
                onCoup = () => { return false };
            }
            else {
                onCoup = this.handleCoup;
            }

            cards.push(
                <Card //render each card
                    img={img}
                    shirtImg={this.props.shirtImg}
                    id={index}
                    key={index}
                    //if id of inverted card == card.key, then we show the card
                    isInverted={this.state.invertedIds && this.state.invertedIds.indexOf(index) !== -1}
                    onCoup={onCoup}
                />
            );
        });

        return (
            <div id="board" style={this.props.style}>
                {cards}
            </div>
        );
    }
}
