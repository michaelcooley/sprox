
import Button from '@material-ui/core/Button';


export function RestartGameButton(props) {
        return (
            <div class="restart-game-container">
              <Button disableRipple class="new-game-button" onClick={props.onButtonClicked}>Restart Game</Button>
            </div>
        );
}
