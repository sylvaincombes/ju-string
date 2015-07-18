// Setup
var test = require('tape'),
    ju = {};

ju.string = require('../src/string.js');

// Utils
function testDatas(datas, fn, assert) {
    for (var e in datas) {
        if (datas.hasOwnProperty(e)) {
            assert(fn(e), datas[e]);
        }
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// string

var trim = {
    dataPool: {
        'one': 'one',
        'T': 'T',
        ' T a p      e diofsnf dsqoin qsdoin  qsido qsdio ': 'T a p      e diofsnf dsqoin qsdoin  qsido qsdio',
        '   plop    ': 'plop'
    },
    test: function (t) {
        testDatas(trim.dataPool, ju.string.trim, t.equal);
    }
};

test("ju.string.trim:native", function (t) {
    if (!String.hasOwnProperty('trim') || !String.prototype.trim) {
        String.prototype.trim = ju.string.trim;
    }

    trim.test(t);
    t.end();
});

test("ju.string.trim", function (t) {
    if (String.hasOwnProperty('trim') || String.prototype.trim) {
        String.prototype.trim = undefined;
    }

    trim.test(t);
    t.end();
});

test("ju.string.trimLeft", function (t) {
    var dataPool = {
        ' o n e ': 'o n e ',
        '    T ': 'T ',
        '   plop': 'plop',
        '   foo  ': 'foo  '
    };

    testDatas(dataPool, ju.string.trimLeft, t.equal);
    t.end();
});

test("ju.string.trimRight", function (t) {
    var dataPool = {
        ' o n e ': ' o n e',
        '    T ': '    T',
        '   plop': '   plop',
        '   foo  ': '   foo'
    };

    testDatas(dataPool, ju.string.trimRight, t.equal);
    t.end();
});

test("ju.string.trimFull", function (t) {
    var dataPool = {
        ' o n e ': 'o n e',
        '    T ': 'T',
        '   p            l    o p     ': 'p l o p',
        '   f   o o  ': 'f o o',
        'nope': 'nope',
        '       a    gr8 thing is coming           next   to you         banana        ': 'a gr8 thing is coming next to you banana'
    };

    testDatas(dataPool, ju.string.trimFull, t.equal);
    t.end();
});

test("ju.string.toUpperCaseFirst", function (t) {
    var dataPool = {
        'one': 'One',
        'T': 'T',
        ' plop': ' plop',
        'foo': 'Foo',
        'ça': 'Ça',
        'à toi': 'À toi'
    };

    testDatas(dataPool, ju.string.toUpperCaseFirst, t.equal);
    t.end();
});

test("ju.string.toUpperCaseWords", function (t) {
    var dataPool = {
        'one thing at a time': 'One Thing At A Time',
        ' T uno per five kick   ': ' T Uno Per Five Kick   ',
        ' plop': ' Plop',
        'foo \n\t': 'Foo \n\t',
        "ça c'est sûr que oui": "Ça C'est Sûr Que Oui",
        'à toi': 'À Toi'
    };

    testDatas(dataPool, ju.string.toUpperCaseWords, t.equal);
    t.end();
});

var contains = {
    ok: {
        'one thing at a time': 'one',
        "Un appât à ça c'est sûr": 'appât',
        "Un appât 0 à ça c'est sûr": 'est',
        '0 5 2000 3 4 567 4 quatre vingt': '3',
        '0 5 2000 4 9 3 4 567 4 quatre vingt': '9',
        '0 5 2000 4 9 mp3 4 567 4 quatre vingt': '200',
        '0 5 2000 409 9 mp3 4 567 4 quatre vingt': '567',
        '0 6 2000 3 4 567 4 quatre vingt': '6 2000',
        '0 1 2000 3 4 567 4 quatre vingt': 'quatre',
        '0 10 2000 38 4 567 4 quatre vingt': 'vingt',
        '0 100 {{2000}} 3 4 567 4 quatre vingt': '{{',
        '0 1000 {{ 2000 }} 3 4 567 4 quatre vingt': '}}',
        '0 10000 {{2000}} x y z 3 4 567 4 quatre vingt': 'x',
        '0 10000 {{2000}} x y z 3 4 567 4 quatre vingt deux': 'deux'
    },
    ko: {
        'one thing is good': 'purple',
        'one thing at a time': 'One',
        "Un appât à ça c'est sûr": 'APPÂT',
        '0 1 {{2000}} 3 4 567 44 quatre vingt': 'ah bon',
        '0 1 {{2000}} 3 4 567 4 quatre vingt': '567'
    },
    test: function (t) {
        for (var e in contains.ok) {
            if (contains.ok.hasOwnProperty(e)) {
                t.ok(ju.string.contains(e, contains.ok[e]), '"' + e + '" contains "' + contains.ok[e] + '"');
            }
        }

        for (var f in contains.ko) {
            if (contains.ko.hasOwnProperty(f)) {
                t.not(ju.string.contains(f, contains.ko[f]), '"' + f + '" does not contains "' + contains.ko[f] + '"');
            }
        }
    }
};

test("ju.string.contains:native", function (t) {
    if (!String.hasOwnProperty('contains') || !String.prototype.contains) {
        String.prototype.contains = ju.string.contains;
    }

    contains.test(t);
    t.end();
});

test("ju.string.contains", function (t) {
    if (String.hasOwnProperty('contains') || String.prototype.contains) {
        String.prototype.contains = undefined;
    }

    contains.test(t);
    t.end();
});




var startsWith = {
    ok: {
        'one thing at a time': 'one',
        "Un appât à ça c'est sûr": 'Un appât',
        "Un appât 0 à ça c'est sûr": 'Un',
        '0 5 2000 3 4 567 4 quatre vingt': '0',
        '6 2000 3 4 567 4 quatre vingt': '6 2000',
        '0 1 2000 3 4 567 4 quatre vingt': '0 1',
        'vingt 0 10 2000 38 4 567 4 quatre vingt': 'vingt',
        'Ça 0 100 {{2000}} 3 4 567 4 quatre vingt': 'Ç',
        '{{0 1000 {{ 2000 }} 3 4 567 4 quatre vingt': '{',
        'x0 10000 {{2000}} x y z 3 4 567 4 quatre vingt': 'x'
    },
    ko: {
        'one thing is good': 'purple',
        'one thing at a time': 'One',
        "Un appât à ça c'est sûr": 'UN APPÂT',
        '0 1 {{2000}} 3 4 567 44 quatre vingt': 'ah bon',
        '0 1 {{2000}} 3 4 567 4 quatre vingt': '567'
    },
    test: function (t) {
        for (var e in startsWith.ok) {
            if (startsWith.ok.hasOwnProperty(e)) {
                t.ok(ju.string.startsWith(e, startsWith.ok[e]), '"' + e + '" startsWith "' + startsWith.ok[e] + '"');
            }
        }
        for (var f in startsWith.ko) {
            if (startsWith.ko.hasOwnProperty(f)) {
                t.not(ju.string.startsWith(f, startsWith.ko[f]), '"' + f + '" does not startsWith "' + startsWith.ko[f] + '"');
            }
        }
    }
};

test("ju.string.startsWith:native", function (t) {
    if (!String.hasOwnProperty('startsWith') || !String.prototype.startsWith) {
        String.prototype.startsWith = ju.string.startsWith;
    }

    startsWith.test(t);
    t.end();
});

test("ju.string.startsWith", function (t) {
    if (String.hasOwnProperty('startsWith') || String.prototype.startsWith) {
        String.prototype.startsWith = undefined;
    }

    startsWith.test(t);
    t.end();
});

var endsWith = {
    ok: {
        'one thing at a time': 'e',
        "Un appât à ça c'est sûr": 'sûr',
        "Un appât 0 à ça c'est sûr oui": 'ui',
        '0 5 2000 3 4 567 4 quatre vingt': 'gt',
        '6 2000 3 4 567 4 quatre vingt': 'vingt',
        '0 1 2000 3 4 567 4 quatre vingt': 'quatre vingt',
        'vingt 0 10 2000 38 4 567': '567',
        'Ça 0 100 {{2000}} 3Ç': 'Ç',
        '{{0 1000 {{ 2000 3 4 567 4 quatre vingt }}': '}',
        'x0 10000 {{2000}} x y z ': ' ',
        'x0 10000 {{o}} x y z ': 'x y z '
    },
    ko: {
        'one thing is good': 'is ',
        'one thing at a time': 'one',
        "Un appât à ça c'est sûr": 'UN APPÂT',
        '0 1 {{2000}} 3 4 567 44 quatre vingt': 'ah bon',
        '0 1 {{2000}} 3 4 567 4 quatre vingt': '567'
    },
    test: function (t) {
        for (var e in endsWith.ok) {
            if (endsWith.ok.hasOwnProperty(e)) {
                t.ok(ju.string.endsWith(e, endsWith.ok[e]), '"' + e + '" endsWith "' + endsWith.ok[e] + '"');
            }
        }
        for (var f in endsWith.ko) {
            if (endsWith.ko.hasOwnProperty(f)) {
                t.not(ju.string.endsWith(f, endsWith.ko[f]), '"' + f + '" does not endsWith "' + endsWith.ko[f] + '"');
            }
        }
    }
};


test("ju.string.endsWith:native", function (t) {
    if (!String.hasOwnProperty('endsWith') || !String.prototype.endsWith) {
        String.prototype.endsWith = ju.string.endsWith;
    }

    endsWith.test(t);
    t.end();
});

test("ju.string.endsWith", function (t) {
    if (String.hasOwnProperty('endsWith') || String.prototype.endsWith) {
        String.prototype.endsWith = undefined;
    }

    endsWith.test(t);
    t.end();
});


var repeat = {
    datas: [
        {
            value: 'pinaise',
            params: 2,
            expected: 'pinaisepinaise'
        },
        {
            value: ' pinaise doh what ',
            params: 17,
            expected: ' pinaise doh what  pinaise doh what  pinaise doh what  pinaise doh what  pinaise doh what  pinaise doh what  pinaise doh what  pinaise doh what  pinaise doh what  pinaise doh what  pinaise doh what  pinaise doh what  pinaise doh what  pinaise doh what  pinaise doh what  pinaise doh what  pinaise doh what '
        },
        {
            value: '01234',
            params: 4,
            expected: '01234012340123401234'
        },
        {
            value: 'àÀ\n\tçéÈ€',
            params: 4,
            expected: 'àÀ\n\tçéÈ€àÀ\n\tçéÈ€àÀ\n\tçéÈ€àÀ\n\tçéÈ€'
        }
    ],
    test: function (t) {
        for (var e in repeat.datas) {
            if (repeat.datas.hasOwnProperty(e)) {
                t.equal(
                    ju.string.repeat(repeat.datas[e].value, repeat.datas[e].params), repeat.datas[e].expected,
                    '"' + repeat.datas[e].value + '" repeat "' + repeat.datas[e].params + '" times'
                );
            }
        }
    }
};

test("ju.string.repeat:native", function (t) {
    if (!String.hasOwnProperty('repeat') || !String.prototype.repeat) {
        String.prototype.repeat = ju.string.repeat;
    }

    repeat.test(t);
    t.end();
});

test("ju.string.repeat", function (t) {
    if (String.hasOwnProperty('repeat') || String.prototype.repeat) {
        String.prototype.repeat = undefined;
    }

    repeat.test(t);
    t.end();
});

test("ju.string.reverse", function (t) {
    var equals = {
        'bodyboard': 'draobydob',
        '': '',
        'youpi': 'ipuoy',
        'aéronef': 'fenoréa'
    };

    for (var e in equals) {
        if (equals.hasOwnProperty(e)) {
            t.equal(ju.string.reverse(e), equals[e], '"' + e + '" reverse "' + equals[e] + '"');
        }
    }

    t.end();
});

test("ju.string.nl2br", function (t) {
    var datas = [
        {
            value: 'pinaise\n',
            params: true,
            expected: 'pinaise<br />'
        },
        {
            value: 'pinaise\n',
            params: false,
            expected: 'pinaise<br>'
        },
        {
            value: '\n\n\npin\taise\n',
            params: true,
            expected: '<br /><br /><br />pin\taise<br />'
        },
        {
            value: 'àÀ\n\tçéÈ€',
            params: true,
            expected: 'àÀ<br />\tçéÈ€'
        },
        {
            value: 'àÀ\r\nçéÈ€',
            params: true,
            expected: 'àÀ<br />çéÈ€'
        },
        {
            value: 'àÀ\n\rçéÈ€',
            params: true,
            expected: 'àÀ<br />çéÈ€'
        }
    ];

    for (var e in datas) {
        if (datas.hasOwnProperty(e)) {
            var result = ju.string.nl2br(datas[e].value, datas[e].params);
            t.equal(result, datas[e].expected, '"' + datas[e].value + '" nl2br, xhtml ? "' + datas[e].params);
        }
    }

    t.end();
});

test("ju.string.stripTags", function (t) {
    var ok = {
        'pinaise\n': 'pinaise\n',
        '<a href="#" target="_blank">pinaise</a>': 'pinaise',
        '<p><a href="#" target="_blank">pinaise</a></p>': 'pinaise',
        '<p><a href="#" target="_blank"> <img src="test.png" /> testing   a <span>method</span> <strong>of</strong> <em>ju.string</em> called <quote>stripTags</quote></a></p>': '  testing   a method of ju.string called stripTags'
    };

    for (var e in ok) {
        if (ok.hasOwnProperty(e)) {
            t.equal(ju.string.stripTags(e), ok[e]);
        }
    }

    t.end();
});

test("ju.string.levenshtein", function (t) {
    var datas = [
        {
            value: 'NICHE',
            params: 'CHIENS',
            expected: 5
        },
        {
            value: 'kitten',
            params: 'sitting',
            expected: 3
        },
        {
            value: 'same',
            params: 'same',
            expected: 0
        },
        {
            value: 'same',
            params: 'Same',
            expected: 1
        },
        {
            value: 'karolin',
            params: 'kathrin',
            expected: 3
        },
        {
            value: 'karolin',
            params: 'kerstin',
            expected: 3
        },
        {
            value: '1011101',
            params: '1001001',
            expected: 2
        },
        {
            value: '2173896',
            params: '2233796',
            expected: 3
        },
        {
            value: '',
            params: '',
            expected: 0
        }
    ];

    for (var e in datas) {
        if (datas.hasOwnProperty(e)) {
            var result = ju.string.levenshtein(datas[e].value, datas[e].params);
            t.equal(result, datas[e].expected, '"' + datas[e].value + '" levenshtein "' + datas[e].params);
        }
    }

    t.end();
});
