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
import { Instructions } from './instructions';
import { BestScores } from './bestScores';
import { SoundEnable } from './soundEnable';
import matchSound from './sounds/match.wav';
import noMatchSound from './sounds/noMatch.mp3';
import gameOverSound from './sounds/gameOver.mp3';

const CLICK_ON_A_CARD = 'Click On A Card';
const CLICK_ON_MATCHING_CARD = 'Click On Matching Card';
const CARD_FLIP_DELAY = 1500;

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
            instructions: CLICK_ON_A_CARD,
            result: '',
            cardsCleared: 0,
            gameOver: false,
            gridSize: 4,
            gameType: 'bands',
            best2by2: 1000,
            best4by4: 1000,
            best6by6: 1000,
            soundEnabled: false
        }

        let emptyBody = [];
        let keyIndex = 0;
        for(let row = 0; row < this.state.gridSize; row++)
        {
            emptyBody[row] = [];
            for(let col = 0; col < this.state.gridSize; col++)
            {
                emptyBody[row][col] = new GridElement(keyIndex++, "", "????", "", "hidden");
            }
        }
        
        let new_state = Object.assign({}, this.state);
        let newBody = new_state.body;
        populateGrid(newBody, this.state.gridSize, this.state.gameType);
        this.setState({body: newBody});
    };

    onIconClicked = (val) => {
         if (this.state.cardsFlipped === 0) {
             let new_state = Object.assign({}, this.state);
             let newBody = new_state.body;

             if (!cardAlreadyCleared(newBody, val, this.state.gridSize)) {
                 flipCardToFront(newBody, val.key, this.state.gridSize);
                 this.setState({card1: val});
                 this.setState({cardsFlipped: this.state.cardsFlipped + 1});
                 this.setState({body: newBody});
                 this.setState({score: this.state.score + 1});
                 this.setState({instructions: CLICK_ON_MATCHING_CARD});
             }

         } else if (this.state.cardsFlipped === 1) {
             let new_state = Object.assign({}, this.state);
             let newBody = new_state.body;

             if (!cardAlreadyCleared(newBody, val, this.state.gridSize)) {
                 flipCardToFront(newBody, val.key, this.state.gridSize);
                 this.setState({card2: val});
                 setTimeout(() => { this.checkForMatchingCards(val, newBody, this.state.gridSize); }, CARD_FLIP_DELAY);
                 this.setState({cardsFlipped: this.state.cardsFlipped + 1});
             }
         } else {
             console.log('2 cards already flipped');                                //if 2 cards are flipped don't allow more
         }
    }

    checkForMatchingCards = (val, newBody, gridSize) => {
        
        let lastResult = '';
        let matched = checkForMatch(this.state.card1, val, this.state.gameType);

        if (!matched) {  //fip cards back over
            lastResult = "No Match";
            flipCardsBackOver(newBody, this.state.card1, val, this.state.gridSize);
            this.setState({cardsFlipped: 0});
            this.setState({instructions: CLICK_ON_A_CARD});
            this.playNoMatchSound();
        } else {
            lastResult = "Match!";
            markCardsAsCleared(newBody, this.state.card1, val, this.state.gridSize);
            this.setState({cardsFlipped: 0});
            this.setState({cardsCleared: this.state.cardsCleared + 2});
            if (this.state.cardsCleared === gridSize * gridSize) {
                lastResult = "GAME OVER!!";
                this.setState({gameOver: true});

                if ((this.state.gridSize === 2)&&(this.state.score < this.state.best2by2)) {
                    this.setState({best2by2: this.state.score});
                } else if ((this.state.gridSize === 4)&&(this.state.score < this.state.best4by4)) {
                    this.setState({best4by4: this.state.score});
                } else if ((this.state.gridSize === 6)&&(this.state.score < this.state.best6by6)) {
                    this.setState({best6by6: this.state.score});
                }
                this.playGameOverSound();
            }
            this.playMatchSound();
        }
        this.setState({result: lastResult});
        this.setState({body: newBody});
        this.setState({score: this.state.score + 1});
    }

    onRestartGameClicked = () => {
        let newSize = this.state.gridSize;
        let emptyBody = [];
        let keyIndex = 0;
        for(let row = 0; row < newSize; row++)
        {
            emptyBody[row] = [];
            for(let col = 0; col < newSize; col++)
            {
                emptyBody[row][col] = new GridElement(keyIndex++, "", "????", "", "hidden");
            }
        }
        populateGrid(emptyBody, this.state.gridSize, this.state.gameType);
        this.setState({body: emptyBody});
        this.resetGameState();
    }

    onSizeSelected = (event) => {
        console.log('size selected: ' + event.target.value);

        let newSize = event.target.value;
        let emptyBody = [];
        let keyIndex = 0;
        for (let row = 0; row < newSize; row++)
        {
            emptyBody[row] = [];
            for(let col = 0; col < newSize; col++)
            {
                emptyBody[row][col] = new GridElement(keyIndex++, "", "????", "", "hidden");
            }
        }

        let new_state = Object.assign({}, this.state);
        populateGrid(emptyBody, newSize, this.state.gameType);
        new_state.body = emptyBody;
        this.setState({gridSize: newSize});
        this.setState({body: emptyBody});
        this.resetGameState();
    }

    resetGameState = () => {
        this.setState({score: 0});
        this.setState({cardsFlipped: 0});
        this.setState({card1: ''});
        this.setState({instructions: CLICK_ON_A_CARD});
        this.setState({cardsCleared: 0});
        this.setState({gameOver: false});
        this.setState({result: ''});
    }

    onGameTypeSelected = (event) => {
        let newGameType = event.target.value;
        let emptyBody = [];
        let keyIndex = 0;
        for(let row = 0; row < this.state.gridSize; row++)
        {
            emptyBody[row] = [];
            for(let col = 0; col < this.state.gridSize; col++)
            {
                emptyBody[row][col] = new GridElement(keyIndex++, "", "????", "", "hidden");
            }
        }

        let new_state = Object.assign({}, this.state);
        populateGrid(emptyBody, this.state.gridSize, newGameType);
        new_state.body = emptyBody;
        this.setState({body: emptyBody});
        this.setState({gameType: newGameType});
        this.resetGameState();
    }

    onSoundEnableChanged = (event) => {
        let enabled = event.target.checked;
        console.log('sound enable change: ' + enabled);

        this.setState({soundEnabled: enabled});
    }

    playMatchSound = () => {
        if (this.state.soundEnabled) {
            let audio = new Audio(matchSound);
            audio.play();
            console.log('playing matched sound');
        }
    }

    playNoMatchSound = () => {
        if (this.state.soundEnabled) {
            let audio = new Audio(noMatchSound);
            audio.play();
            console.log('playing matched sound');
        }
    }

    playGameOverSound = () => {
        if (this.state.soundEnabled) {
            let audio = new Audio(gameOverSound);
            audio.play();
            console.log('playing matched sound');
        }
    }

    render()
    {
        return (
            <div className="App">
                <TitleBar version="0.1"/>
                <Description/>
                <div class="options-row-container">
                  <RestartGameButton onButtonClicked={this.onRestartGameClicked} />
                  <GridSize size={this.state.gridSize} onSizeSelected={this.onSizeSelected} />
                  <GameType gameType={this.state.gameType} onGameTypeSelected={this.onGameTypeSelected} />
                  <SoundEnable checked={this.state.soundEnabled} onChange={this.onSoundEnableChanged} />
                </div>
                <div className="instructions-results-row-container">
                    <Score score={this.state.score} />
                    <Instructions class="instruction-container" lastInstruction={this.state.instructions} />
                    <Outcome class="outcome-container" lastResult={this.state.result} />
                </div>
                <div class="gameboard-and-scores-container">
                    <GameGrid body={this.state.body} gridSize={this.state.gridSize} onIconClicked={this.onIconClicked}/>
                    <div class="scores-and-best-scores-container">
                        <BestScores best2by2={this.state.best2by2} best4by4={this.state.best4by4} best6by6={this.state.best6by6} />
                        <Scorecard display={true} size={this.state.gridSize}/>
                    </div>
                </div>
            </div>
        );
    }
};

export default App;


