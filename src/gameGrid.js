import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

export function GameGrid(props) {
            
        var gridContainer;
        if (props.gridSize == 2) gridContainer = "gameboard-container-2by2";
        else if (props.gridSize == 4) gridContainer = "gameboard-container-4by4";
           else if (props.gridSize == 6) gridContainer = "gameboard-container-6by6";
             else if (props.gridSize == 8) gridContainer = "gameboard-container-8by8";
            return (
                <div class={gridContainer}>
                    <Gameboard body={props.body} onIconClicked={props.onIconClicked}/>
                </div>
            );
}

class Gameboard extends Component {
    render() {
        var body = this.props.body;
        return (
            <div>
                   {body.map(row => <GameboardRow row={row} onIconClicked={this.props.onIconClicked}/>)} 
            </div>
        );
    }
}

class GameboardRow extends Component {
    render() {
        var row = this.props.row;

        return (
                row.map(val =>
                   <Button disableRipple class="grid-buttons" onClick={() => {this.props.onIconClicked(val)}}>{val.display}</Button>
            )
        )
    }
}

