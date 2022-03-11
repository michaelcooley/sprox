import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export function SoundEnable(props) {
    return (
        <div className="sound-enable-container">
            <FormControlLabel
                control={<Checkbox
                label={props.label}
                checked={props.checked}
                onChange={props.onChange}
            />
            }
            label="Sound" />
        </div>
    );
}