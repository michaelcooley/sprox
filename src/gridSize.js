
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

export function GridSize(props) {
        return (
            <div class="grid-size-container">
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Grid Size</InputLabel>
                    <Select
                        labelId="select-grid-size-label"
                        id="select-grid-size"
                        value={props.size}
                        label="Grid Size"
                        onChange={props.onSizeSelected}
                    >
                        <MenuItem value={2}>2 x 2</MenuItem>
                        <MenuItem value={4}>4 x 4</MenuItem>
                        <MenuItem value={6}>6 x 6</MenuItem>
                        <MenuItem value={8}>8 x 8</MenuItem>
                    </Select>
                </FormControl>
            </div>
        );
}
