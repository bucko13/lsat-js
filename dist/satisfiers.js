"use strict";
/**
 * @file Useful satisfiers that are independent of environment, for example,
 * ones that don't require the request object in a server as these can be used anywhere.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.expirationSatisfier = void 0;
/**
 * @description A satisfier for validating expiration caveats on macaroon. Used in the exported
 * boltwallConfig TIME_CAVEAT_CONFIGS
 * @type Satisfier
 */
exports.expirationSatisfier = {
    condition: 'expiration',
    satisfyPrevious: (prev, curr) => {
        if (prev.condition !== 'expiration' || curr.condition !== 'expiration')
            return false;
        // fails if current expiration is later than previous
        // (i.e. newer caveats should be more restrictive)
        else if (prev.value < curr.value)
            return false;
        else
            return true;
    },
    satisfyFinal: (caveat) => {
        if (caveat.condition !== 'expiration')
            return false;
        // if the expiration value is less than current time than satisfier is failed
        if (caveat.value < Date.now())
            return false;
        return true;
    },
};
