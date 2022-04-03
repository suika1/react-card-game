import React from 'react';

export class Card extends React.Component {
    onCoup = () => {
        this.props.onCoup(this.props.id, this.props.img);
    };

    render() {
        let imageUrl;
        let style = {};
        let shirtUrl;

        if (this.props.img !== null) {
            imageUrl = require(`./img/${this.props.img}`);
            shirtUrl = require(`./img/${this.props.shirtImg}`);
            if (this.props.isInverted) {
                style.backgroundImage = `url(${imageUrl})`;
            } else {
                style.backgroundImage = `url(${shirtUrl}`;
            }
            style.backgroundSize = `100% 100%`;
        }
        else {
            style.opacity = 0;
            style.backgroundColor = `inherit`;
        }

        return (
            <div className="card"
                style={ //show either image, if chosen, or just bgColor
                    style
                }
                onClick={this.onCoup}
            >
            </div>
        );
    }
}
