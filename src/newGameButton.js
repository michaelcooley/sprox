
import Button from '@material-ui/core/Button';


export function NewGameButton(gameOver, onButtonClicked) {
    if (gameOver === true) {
        return (
            <Button disableRipple class="new-game-button" onClick={() => {onButtonClicked()}}>Start Game</Button>
        );
    } else {
        return (
          <div>Game In Progress</div>
        );
    }
}
