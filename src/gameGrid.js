import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';


export function GameGrid(props) {
            return (
                <div class="gameboard-container">
                    <Gameboard body={props.body} onIconClicked={props.onIconClicked}/>
                </div>
            );
}

class Gameboard extends Component {
    render() {
        var body = this.props.body;
        return (
            <Grid container spacing={2}>
                <Grid item xs={8}>
                   {body.map(row => <GameboardRow row={row} onIconClicked={this.props.onIconClicked}/>)}
                </Grid>
            </Grid>
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

