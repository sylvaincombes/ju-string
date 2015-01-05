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
     * Reverse a string
     *
     * @example
     * ju.string.reverse('bodyboard'); // return 'draobydob'
     *
     * @param {string} string The string to reverse
     * @return {string}
     */
    Str.prototype.reverse = function(string) {
        return string.split('').reverse().join('');
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

    /**
     * Remove html tags from a string
     *
     * @param {string} string The string we want to remove tags
     * @return {string} The string without the tags
     */
    Str.prototype.stripTags = function (string) {
        return string.replace(/<\/?[^>]+>/g, '');
    };

    /**
     * Converts HTML special characters to their entity equivalents.
     *
     * @example
     * ju.string.escapeHTML('<div class="article">This is an article</div>'); // return '&lt;div class="article"&gt;This is an article&lt;/div&gt;'
     *
     * @see https://github.com/sstephenson/prototype/blob/d9411e5/src/prototype/lang/string.js#L408
     *
     * @param {string} string
     * @return {string}
     */
    Str.prototype.escapeHTML = function(string) {
        return string.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    };

    /**
     * Converts the entity forms of special HTML characters to their normal form.
     *
     * @example
     * ju.string.escapeHTML('&lt;div class="article"&gt;This is an article&lt;/div&gt;'); // return '<div class="article">This is an article</div>'
     *
     * @see https://github.com/sstephenson/prototype/blob/d9411e5/src/prototype/lang/string.js#L426
     *
     * @param {string} string
     * @return {string}
     */
    Str.prototype.unescapeHTML = function(string) {
        return string.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
    };

    /**
     * Return the levenshtein distance between two strings
     *
     * @see http://en.wikipedia.org/wiki/Levenshtein_distance
     *
     * @example
     * ju.string.levenshtein('karolin', 'kathrin'); // return 3
     *
     * @param firstString   First string to compare to second String
     * @param secondString  Second string to compare to string1
     * @return {number}     The levenshtein distance
     */
    Str.prototype.levenshtein = function (firstString, secondString) {
        var current = [],
            firstStringLength = firstString.length,
            secondStringLength = secondString.length,
            prev = 0,
            value = 0;

        // Special cases

        // if the two string are the same or the two strings have a length of 0, the distance is 0
        if (firstString === secondString || (firstStringLength === 0 && secondStringLength === 0)) {
            return 0;
        }

        // If one of the string length is 0, the distance is the length of the other string
        if (firstStringLength === 0) {
            return secondStringLength;
        }

        if (secondStringLength === 0) {
            return firstStringLength;
        }

        // calculate levenshtein distance
        for (var i = 0; i <= secondStringLength; i++) {
            for (var j = 0; j <= firstStringLength; j++) {
                if (i && j) {
                    if (firstString.charAt(j - 1) === secondString.charAt(i - 1)) {
                        value = prev;
                    } else {
                        value = Math.min(current[j], current[j - 1], prev) + 1;
                    }
                } else {
                    value = i + j;
                }
                prev = current[j];
                current[j] = value;
            }
        }

        return current.pop();
    };

    /**
     * Generate a uuid and return it
     *
     * @see http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript for more details.
     *
     * @example
     * ju.string.uuid(); // return something like : "3bce4931-6c75-41ab-afe0-2ec108a30860"
     *
     * @return {string} uuid
     */
    Str.prototype.uuid = function () {
        var matcher = /[xy]/g;

        var replacer = function (c) {
            var r = Math.random() * 16 | 0;
            var v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        };

        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(matcher, replacer);
    };
}

module.exports = new Str();