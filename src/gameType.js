
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

export function GameType(props) {
    return (
        <div class="game-type-container">
            <FormControl fullWidth>
                <InputLabel className="menu-font-style" id="select-game-type-label">Game Type</InputLabel>
                <Select
                    labelId="select-game-type-label"
                    id="select-game-type"
                    value={props.gameType}
                    /*label="Game Type"*/
                    onChange={props.onGameTypeSelected}
                    className="menu-font-style"
                >
                    <MenuItem className="menu-font-style" value={'planets'}>Planets</MenuItem>
                    <MenuItem className="menu-font-style" value={'books'}>Books</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}
