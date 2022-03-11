
export function BestScores(props) {
    let bestLine1 = '2x2 = ' + ((props.best2by2 === 1000) ? 'N/A' : props.best2by2 + 1);
    let bestLine2 = '4x4 = ' + ((props.best4by4 === 1000) ? 'N/A' : props.best4by4 + 1);
    let bestLine3 = '6x6 = ' + ((props.best6by6 === 1000) ? 'N/A' : props.best6by6 + 1);

    return <div class="best-scores-container">
        <ul class="ul-no-bullets">
            <li><b>Best Scores</b></li>
            <li>{ bestLine1 }</li>
            <li>{ bestLine2 }</li>
            <li>{ bestLine3 }</li>
        </ul>
    </div>

}