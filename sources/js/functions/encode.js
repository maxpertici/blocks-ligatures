
import CryptoJS from 'crypto-js';

/**
 * Generate Hash from a string
 * @description https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
 * @param {*} string 
 * @returns 
 */
const getHash = ( inputString ) => {

    const hashOutput = CryptoJS.SHA256(inputString);
    return hashOutput.toString(CryptoJS.enc.Hex);
}

export { getHash }