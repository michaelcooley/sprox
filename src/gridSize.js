
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

export function GridSize(props) {
        return (
            <div class="grid-size-container">
                <FormControl fullWidth>
                    <InputLabel className="menu-font-style" id="select-grid-size-label">Grid Size</InputLabel>
                    <Select
                        labelId="select-grid-size-label"
                        id="select-grid-size"
                        value={props.size}
                        onChange={props.onSizeSelected}
                        className="menu-font-style"
                    >
                        <MenuItem className="menu-font-style" value={2}>2 x 2</MenuItem>
                        <MenuItem className="menu-font-style"  value={4}>4 x 4</MenuItem>
                        <MenuItem className="menu-font-style"  value={6}>6 x 6</MenuItem>
                    </Select>
                </FormControl>
            </div>
        );
}
