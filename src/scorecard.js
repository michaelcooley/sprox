
export function Scorecard(props) {

    var totalCards = props.size * props.size;

    var scorecardLine1 = totalCards + ' = PSYCHIC!';
    var scorecardLine2 = (totalCards + (totalCards /2)) + ' = Implausible!';
    var scorecardLine3 = (totalCards * 2) + ' = Stellar!';
    var scorecardLine4 = (totalCards * 3) + ' = Not Great';
    var scorecardLine5 = (totalCards * 4) + ' = Really Not Great';

    if (props.display) {
        return <div class="scorecard-container">
            <ul class="ul-no-bullets">
                <li><b>Scorecard:</b></li>
                <li>&nbsp;</li>
                <li>{ scorecardLine1 }</li>
                <li>{ scorecardLine2 }</li>
                <li>{ scorecardLine3 }</li>
                <li>{ scorecardLine4 }</li>
                <li>{ scorecardLine5 }</li>
            </ul>
        </div>
    }
}