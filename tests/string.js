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
test("ju.string.trim", function (t) {
    var dataPool = {
        'one': 'one',
        'T': 'T',
        ' T a p      e diofsnf dsqoin qsdoin  qsido qsdio ': 'T a p      e diofsnf dsqoin qsdoin  qsido qsdio',
        '   plop    ': 'plop'
    };

    testDatas(dataPool, ju.string.trim, t.equal);
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

test("ju.string.contains", function (t) {
    var ok = {
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
    };

    var ko = {
        'one thing is good': 'purple',
        'one thing at a time': 'One',
        "Un appât à ça c'est sûr": 'APPÂT',
        '0 1 {{2000}} 3 4 567 44 quatre vingt': 'ah bon',
        '0 1 {{2000}} 3 4 567 4 quatre vingt': '567'
    };

    for (var e in ok) {
        if (ok.hasOwnProperty(e)) {
            t.ok(ju.string.contains(e, ok[e]), '"' + e + '" contains "' + ok[e] + '"');
        }
    }

    for (var f in ko) {
        if (ko.hasOwnProperty(f)) {
            t.not(ju.string.contains(f, ko[f]), '"' + f + '" does not contains "' + ko[f] + '"');
        }
    }

    t.end();
});

test("ju.string.startsWith", function (t) {
    var ok = {
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
    };

    var ko = {
        'one thing is good': 'purple',
        'one thing at a time': 'One',
        "Un appât à ça c'est sûr": 'UN APPÂT',
        '0 1 {{2000}} 3 4 567 44 quatre vingt': 'ah bon',
        '0 1 {{2000}} 3 4 567 4 quatre vingt': '567'
    };

    for (var e in ok) {
        if (ok.hasOwnProperty(e)) {
            t.ok(ju.string.startsWith(e, ok[e]), '"' + e + '" startsWith "' + ok[e] + '"');
        }
    }
    for (var f in ko) {
        if (ko.hasOwnProperty(f)) {
            t.not(ju.string.startsWith(f, ko[f]), '"' + f + '" does not startsWith "' + ko[f] + '"');
        }
    }

    t.end();
});

test("ju.string.endsWith", function (t) {
    var ok = {
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
    };

    var ko = {
        'one thing is good': 'is ',
        'one thing at a time': 'one',
        "Un appât à ça c'est sûr": 'UN APPÂT',
        '0 1 {{2000}} 3 4 567 44 quatre vingt': 'ah bon',
        '0 1 {{2000}} 3 4 567 4 quatre vingt': '567'
    };

    for (var e in ok) {
        if (ok.hasOwnProperty(e)) {
            t.ok(ju.string.endsWith(e, ok[e]), '"' + e + '" endsWith "' + ok[e] + '"');
        }
    }
    for (var f in ko) {
        if (ko.hasOwnProperty(f)) {
            t.not(ju.string.endsWith(f, ko[f]), '"' + f + '" does not endsWith "' + ko[f] + '"');
        }
    }

    t.end();
});

test("ju.string.repeat", function (t) {
    var datas = [
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
    ];

    for (var e in datas) {
        if (datas.hasOwnProperty(e)) {
            t.equal(
                ju.string.repeat(datas[e].value, datas[e].params), datas[e].expected,
                '"' + datas[e].value + '" repeat "' + datas[e].params + '" times'
            );
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