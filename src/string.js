/**
 * Simple utility for the String javascript object
 *
 * @author Sylvain Combes <combes.sylvain@gmail.com>
 * @module ju-string
 */

/**
 * Collection of utils for string object
 *
 * @constructor
 */
function Str() {
    "use strict";


    /**
     * Trim blank spaces at the beginning and end of a string
     *
     * @example
     * ju.string.trim(' foo bar '); // return 'foo bar'
     *
     * @param {string} string The string to trim
     *
     * @return {string}
     */
    Str.prototype.trim = function (string) {
        if (String.prototype.trim) {
            return string.trim();
        }
        return string.replace(/^\s+|\s+$/g, '');
    };


    /**
     * Remove left spaces of the string
     *
     * @example
     * ju.string.trimLeft(' foo bar '); // return 'foo bar '
     *
     * @param {string} string The string to modify
     *
     * @return {string}
     */
    Str.prototype.trimLeft = function (string) {
        return string.replace(/^\s+/, '');
    };

    /**
     * Remove the right spaces of a string
     *
     * @example
     * ju.string.trimRight(' foo bar '); // return ' foo bar'
     *
     * @param {string} string The string to modify
     *
     * @return {string}
     */
    Str.prototype.trimRight = function (string) {
        return string.replace(/\s+$/, '');
    };


    /**
     * Remove spaces at the beginning and the end of a string and all redundant spaces
     *
     * @example
     * ju.string.trimFull('  foo    bar  '); // return 'foo bar'
     *
     * @param {string} string The string to modify
     *
     * @return {string}
     */
    Str.prototype.trimFull = function (string) {
        return string.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g, '').replace(/\s+/g, ' ');
    };

    /**
     * Uppercase the first character of the string
     *
     * @example
     * ju.string.toUpperCaseFirst('foo bar'); // return 'Foo bar'
     *
     * @param {string} string The string to modify
     *
     * @return {string}
     */
    Str.prototype.toUpperCaseFirst = function (string) {
        return (string.charAt(0).toUpperCase() + string.slice(1));
    };

    /**
     * Uppercase the first character of each word found in the string
     *
     * @example
     * ju.string.toUpperCaseWords('foo bar size'); // return 'Foo Bar Size'
     *
     * @param {string} string The string to modify
     *
     * @return {string}
     */
    Str.prototype.toUpperCaseWords = function (string) {
        return string.replace(/^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g, function ($1) {
            return $1.toUpperCase();
        });
    };

    /**
     * Return true if the string contains passed arguments, false otherwise
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/contains
     *
     * @example
     * ju.string.contains('foo bar size', 'foo'); // return true
     * ju.string.contains('foo bar size', 'z3w'); // return false
     *
     * @param {string} inputString The string we want to search in
     * @param {string} searchedString The string to check if it is contained in the inputString string
     *
     * @return {boolean} True if inputString contains searchedString, false otherwhise
     */
    Str.prototype.contains = function (inputString, searchedString) {
        if (String.prototype.contains) {
            return inputString.contains(searchedString);
        }
        return inputString.indexOf(searchedString) !== -1;
    };


    /**
     * Return if the searched string is at the beginning of a string
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith
     *
     * @example
     * ju.string.startsWith('foo bar size', 'foo'); // return true
     *
     * @param {string} inputString The string we want to search in
     * @param {string} searchedString The string to test if it matches the start of inputString
     * @param {number} [position=0] The start position to check, 0 by default
     *
     * @return {boolean}
     */
    Str.prototype.startsWith = function (inputString, searchedString, position) {
        if (String.prototype.startsWith) {
            return inputString.startsWith(searchedString);
        }
        position = position || 0;
        return inputString.lastIndexOf(searchedString, position) === position;
    };


    /**
     * Return if the searched string is at the end of a string
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith
     *
     * @example
     * ju.string.endsWith('foo bar size', 'size'); // return true
     *
     * @param {string} inputString The string we want to search in
     * @param {string} searchedString The string to test if it matches the end of inputString
     * @param {number} [position=inputString.length] The end position to check, inputString.length by default
     *
     * @return {boolean}
     */
    Str.prototype.endsWith = function (inputString, searchedString, position) {
        if (String.prototype.endsWith) {
            return inputString.endsWith(searchedString);
        }

        var subjectString = inputString.toString();
        if (position === undefined || position > subjectString.length) {
            position = subjectString.length;
        }

        position -= searchedString.length;
        var lastIndex = subjectString.indexOf(searchedString, position);

        return lastIndex !== -1 && lastIndex === position;
    };


    /**
     * Repeat a string for x times (count parameter)
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat
     *
     * @example
     * ju.string.repeat('foo bar ', 2); // return 'foo bar foo bar '
     *
     * @param {string} string The string to repeat
     * @param {number} count The number of time to repeat
     *
     * @return {string}
     */
    Str.prototype.repeat = function (string, count) {
        if (String.prototype.repeat) {
            return string.repeat(count);
        }

        var str = string;

        count = +count;

        if (count != count) {
            count = 0;
        }

        if (count < 0) {
            throw new RangeError("repeat count must be non-negative");
        }

        if (count == Infinity) {
            throw new RangeError("repeat count must be less than infinity");
        }

        count = Math.floor(count);

        if (str.length === 0 || count === 0) {
            return "";
        }

        // Ensuring count is a 31-bit integer allows us to heavily optimize the
        // main part. But anyway, most current (august 2014) browsers can't handle
        // strings 1 << 28 chars or longer, so :
        if (str.length * count >= 1 << 28) {
            throw new RangeError("repeat count must not overflow maximum string size");
        }

        var rpt = "";

        for (; ;) {
            if ((count & 1) == 1) {
                rpt += str;
            }
            count >>>= 1;
            if (count === 0) {
                break;
            }
            str += str;
        }
        return rpt;
    };


    /**
     * Transform new lines to br html tag
     *
     * @see http://phpjs.org/functions/nl2br/ (modified)
     *
     * @example
     * ju.string.nl2br('foo\n bar'); // return 'foo<br /> bar'
     *
     * @param {string} string The string to parse
     * @param {boolean} [is_xhtml=true] Use autoclose br tag or not (optional, true by default)
     *
     * @return {string}
     */
    Str.prototype.nl2br = function nl2br(string, is_xhtml) {
        var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
        return string.replace(new RegExp('\r\n|\n\r|\r|\n', 'g'), breakTag);
    };
}

module.exports = new Str();