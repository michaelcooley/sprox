
export function Scorecard(props) {

    var totalCards = props.size * props.size;

    var total1 = totalCards;
    var total2 =  (totalCards + (totalCards /2));
    var total3 = (totalCards * 2);
    var total4 = (totalCards * 3);
    var total5 = (totalCards * 4);

    var scorecardLine1 = totalCards + ' = PSYCHIC!';
    var scorecardLine2 = (total1 + 1) + '-' + total2 + ' = Implausible!';
    var scorecardLine3 = (total2 + 1) + '-'  + total3 + ' = Stellar!';
    var scorecardLine4 = (total3 + 1) + '-' + total4 + ' = Not Great';
    var scorecardLine5 = (total4 + 1) + '-'  + total5 + ' = Really Not Great';

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