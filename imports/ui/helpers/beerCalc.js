/**
 * @description A collection of beer calculations used for making beer recipes
 * @author simonpalmqvist
 */

/**
 * Function to convert colors from the SRM standard to EBC
 * @param srm - SRM color number
 * @returns {number} returns EBC color number
 */
export function srmToEbc(srm) {
    return Math.round(srm * 1.97);
}

/**
 * Function to calculate the expected OG
 * @param fermentables - {amount, potential}
 * @param recipe - {efficiency, batchSize, lossFermentation, lossKettle}
 * @returns {number} - returns expected OG
 */
export function calcExpectedOg(fermentables, recipe) {
    const oechsleKG = 400;
    //TODO: Read these values from brew profile
    const efficiency = 0.80;
    const waterAfterBoil = _literToGallon(recipe.batchSize + 0.5 + 2);

    //(((1.036*8)+(1.025*1))*0.72)/20;
    let points = fermentables
        .map(({amount, potential}) => _kgToLbs(amount) * _getPoints(potential))
        .reduce(_sum, 0);

    let result = 1+(((points * efficiency) / waterAfterBoil) / 1000);

    return _round(result, 3);
}

/**
 * Function to sum up total weight/amount of fermentables
 * @param fermentables - {amount}
 * @returns {number} - returns total weight/amount of fermentables
 */
export function calcFermentableWeight(fermentables) {
    return fermentables
        .map(({amount}) => amount)
        .reduce(_sum, 0);
}

function _getPoints(potential) {
    let result = 0;

    if(potential >= 1) {
        result = (potential * 1000) - 1000;
    }

    return result;
}

function _sum(a,b) {
    return a + b;
}

function _kgToLbs(kg) {
    return kg * 2.20462262;
}

function _literToGallon(liter) {
    return liter * 0.264172052;
}

function _round(value, decimals) {
    const x = Math.pow(10, decimals);

    return Math.round(value * x)/x;
}