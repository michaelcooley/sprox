import './App.css';
import React from 'react';
import { TitleBar } from './titleBar';
import { Description } from './description';
import { Outcome } from './outcome';
import { Score } from './score';
import { GameGrid } from './gameGrid';
import { populateGrid, flipCardToFront, checkForMatch, flipCardsBackOver, markCardsAsCleared, cardAlreadyCleared } from './gridUtils';
import { Scorecard } from './scorecard';
import { RestartGameButton } from './restartGameButton';
import { GridSize } from './gridSize';
import { GridElement } from './gridElement';
import { GameType } from './gameType';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            body: 
                [
                    [{key: 0, display: "", back: "?????", front: "", status: "hidden"},
                        {key: 1, display: "", back: "?????", front: "", status: "hidden"},
                        {key: 2, display: "", back: "?????", front: "", status: "hidden"},
                        {key: 3, display: "", back: "?????", front: "", status: "hidden"}],

                    [{key: 4, display: "", back: "?????", front: "", status: "hidden"},
                        {key: 5, display: "", back: "?????", front: "", status: "hidden"},
                        {key: 6, display: "", back: "?????", front: "", status: "hidden"},
                        {key: 7, display: "", back: "?????", front: "", status: "hidden"}],

                    [{key: 8, display: "", back: "?????", front: "", status: "hidden"},
                        {key: 9, display: "", back: "?????", front: "", status: "hidden"},
                        {key: 10, display: "", back: "?????", front: "", status: "hidden"},
                        {key: 11, display: "", back: "?????", front: "", status: "hidden"}],

                    [{key: 12, display: "", back: "?????", front: "", status: "hidden"},
                        {key: 13, display: "", back: "?????", front: "", status: "hidden"},
                        {key: 14, display: "", back: "?????", front: "", status: "hidden"},
                        {key: 15, display: "", back: "?????", front: "", status: "hidden"}],
                ],
            score: 0,
            cardsFlipped: 0,
            card1: '',
            result: 'Click On A Card',
            cardsCleared: 0,
            gameOver: false,
            gridSize: 4,
            gameType: 'planets'
        }

        console.log('creating empty grid');
        var emptyBody = new Array();
        var keyIndex = 0;
        for(var row = 0; row < this.state.gridSize; row++)
        {
            emptyBody[row] = new Array();
            for(var col = 0; col < this.state.gridSize; col++)
            {
                emptyBody[row][col] = new GridElement(keyIndex++, "", "????", "", "hidden");
            }
        }
        
        let new_state = Object.assign({}, this.state);
        let newBody = new_state.body;
        populateGrid(newBody, this.state.gridSize, this.state.gameType);
  
        this.setState({body: newBody});
       
        console.log('updating state in constructor');
    };

    onIconClicked = (val) => {

        console.log('icon ' + val.key + ' clicked');

         if (this.state.cardsFlipped === 0) {

            console.log('first card selected');
             //find element with the proper key and flip display
             let new_state = Object.assign({}, this.state);
             let newBody = new_state.body;

             if (!cardAlreadyCleared(newBody, val, this.state.gridSize)) {
                 flipCardToFront(newBody, val.key, this.state.gridSize);
                 console.log('flipping first card to front ' + val.display);
                 this.setState({card1: val});
                 this.setState({cardsFlipped: this.state.cardsFlipped + 1});
                 this.setState({body: newBody});
                 this.setState({score: this.state.score + 1});
                 this.setState({result: 'Click On The Card That Matches'});
             }

         } else if (this.state.cardsFlipped === 1) {

            console.log('second card selected')
             //find element with the proper key and flip display
             let new_state = Object.assign({}, this.state);
             let newBody = new_state.body;

             if (!cardAlreadyCleared(newBody, val, this.state.gridSize)) {
                 flipCardToFront(newBody, val.key, this.state.gridSize);
                 console.log('flipping second card to front ' + val.display);
                 this.setState({card2: val});

                 setTimeout(() => { this.checkForMatchingCards(val, newBody, this.state.gridSize); }, 2000);
             }
             this.setState({cardsFlipped: this.state.cardsFlipped + 1});

         } else {
             console.log('2 cards already flipped');                                //if 2 cards are flipped don't allow more
         }

    }

    checkForMatchingCards = (val, newBody, gridSize) => {
        
        let lastResult = '';
        var matched = checkForMatch(this.state.card1, val, this.state.gameType);

        if (!matched) {  //fip cards back over
            console.log('no match');
            lastResult = "No Match";

            flipCardsBackOver(newBody, this.state.card1, val, this.state.gridSize);
            this.setState({cardsFlipped: 0});
        } else {
            console.log('cards match');
            lastResult = "Match!";
            markCardsAsCleared(newBody, this.state.card1, val, this.state.gridSize);
            this.setState({cardsFlipped: 0});
            this.setState({cardsCleared: this.state.cardsCleared + 2});
            console.log('cards cleared: ' + this.state.cardsCleared);
            if (this.state.cardsCleared === gridSize * gridSize) {
                //game over
                lastResult = "GAME OVER!!";
                this.setState({gameOver: true});
            }
        }

        this.setState({result: lastResult});
        this.setState({body: newBody});
        this.setState({score: this.state.score + 1});
    }

    onRestartGameClicked = () => {

        console.log('new game');
        let new_state = Object.assign({}, this.state);

        var newSize = this.state.gridSize;
        var emptyBody = new Array();
        var keyIndex = 0;
        for(var row = 0; row < newSize; row++)
        {
            emptyBody[row] = new Array();
            for(var col = 0; col < newSize; col++)
            {
                emptyBody[row][col] = new GridElement(keyIndex++, "", "????", "", "hidden");
            }
        }

        populateGrid(emptyBody, this.state.gridSize, this.state.gameType);
        //new_state.body = emptyBody;
        this.setState({body: emptyBody});
        this.setState({score: 0});
        this.setState({cardsFlipped: 0});
        this.setState({card1: ''});
        this.setState({result: 'Click On A Card'});
        this.setState({cardsCleared: 0});
        this.setState({gameOver: false});
    }

    // Create a callback to toggle the `mobileOpen` state
    onSizeSelected = (event) => {
        console.log('size selected: ' + event.target.value);

        var newSize = event.target.value;
        var emptyBody = new Array();
        var keyIndex = 0;
        for(var row = 0; row < newSize; row++)
        {
            emptyBody[row] = new Array();
            for(var col = 0; col < newSize; col++)
            {
                emptyBody[row][col] = new GridElement(keyIndex++, "", "????", "", "hidden");
            }
        }

        let new_state = Object.assign({}, this.state);
        populateGrid(emptyBody, newSize, this.state.gameType);
        new_state.body = emptyBody;
        this.setState({gridSize: newSize});
        this.setState({body: emptyBody});
        this.setState({score: 0});
        this.setState({cardsFlipped: 0});
        this.setState({card1: ''});
        this.setState({result: 'Click On A Card'});
        this.setState({cardsCleared: 0});
        this.setState({gameOver: false});
    }

    // Create a callback to toggle the `mobileOpen` state
    onGameTypeSelected = (event) => {
        console.log('game type selected: ' + event.target.value);

        let newGameType = event.target.value;

        var emptyBody = new Array();
        var keyIndex = 0;
        for(var row = 0; row < this.state.gridSize; row++)
        {
            emptyBody[row] = new Array();
            for(var col = 0; col < this.state.gridSize; col++)
            {
                emptyBody[row][col] = new GridElement(keyIndex++, "", "????", "", "hidden");
            }
        }

        let new_state = Object.assign({}, this.state);
        populateGrid(emptyBody, this.state.gridSize, newGameType);
        new_state.body = emptyBody;
        this.setState({body: emptyBody});
        this.setState({score: 0});
        this.setState({cardsFlipped: 0});
        this.setState({card1: ''});
        this.setState({result: 'Click On A Card'});
        this.setState({cardsCleared: 0});
        this.setState({gameOver: false});
        this.setState({gameType: newGameType});
    }

    render()
    {
        return (
            <div className="App">
                <TitleBar version="0.1"/>
                <Description/>
                <div class="options-row-container">
                  <Score score={this.state.score} />
                  <RestartGameButton onButtonClicked={this.onRestartGameClicked} />
                  <GridSize size={this.state.gridSize} onSizeSelected={this.onSizeSelected} />
                  <GameType gameType={this.state.gameType} onGameTypeSelected={this.onGameTypeSelected} />
                </div>

                <Outcome class="outcome" lastResult={this.state.result} />
                <GameGrid body={this.state.body} gridSize={this.state.gridSize} onIconClicked={this.onIconClicked}/>
                <Scorecard display={true} size={this.state.gridSize}/>
            </div>
        );
    }




};

export default App;


