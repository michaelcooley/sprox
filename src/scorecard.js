
export function Scorecard(displayFlag) {
    if (displayFlag) {
        return <div class="scorecard">
            Scorecard:
                36: PSYCHIC!
                37-50: Unbelievable!
                51-80: Stellar!
                81-100: Average
                100-120: Starting to Suck
                121 or More: Don't Give Up Your Day Job
        </div>
    }
}