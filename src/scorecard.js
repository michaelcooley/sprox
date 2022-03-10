
export function Scorecard(props) {
    let totalCards = props.size * props.size;
    let total1 = totalCards;
    let total2 =  (totalCards + (totalCards / 2));
    let total3 = (totalCards * 2);
    let total4 = (totalCards * 3);
    let total5 = (totalCards * 4);

    let scorecardLine1 = totalCards + ' = PSYCHIC!';
    let scorecardLine2 = (total1 + 1) + '-' + total2 + ' = Implausible!';
    let scorecardLine3 = (total2 + 1) + '-'  + total3 + ' = Stellar!';
    let scorecardLine4 = (total3 + 1) + '-' + total4 + ' = Not Great';
    let scorecardLine5 = (total4 + 1) + '-'  + total5 + ' = Really Not Great';

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