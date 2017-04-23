describe("FillTokenGapsWithComments", () => {
    const Namespace = require("rewire")("../../Editor.js")
    const FillTokenGapsWithComments = Namespace.__get__("FillTokenGapsWithComments")
    function Test(description, tokens, length, output) {
        it(description, () => {
            expect(FillTokenGapsWithComments(tokens, " ".repeat(length))).toEqual(output)
        })
    }

    Test("no tokens, no source", [], 0, [])
    Test("no tokens, single character source", [], 1, [{
        Type: "Comment",
        StartIndex: 0,
        EndIndex: 0
    }])
    Test("no tokens, two character source", [], 2, [{
        Type: "Comment",
        StartIndex: 0,
        EndIndex: 1
    }])
    Test("no tokens, three character source", [], 3, [{
        Type: "Comment",
        StartIndex: 0,
        EndIndex: 2
    }])
    Test("one single character token", [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 0
    }], 1, [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 0
    }])
    Test("one two character token", [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 1
    }], 2, [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 1
    }])
    Test("one three character token", [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 2
    }], 3, [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 2
    }])

    Test("one single character token preceded by a single character of space", [{
        Type: "Test Type A",
        StartIndex: 1,
        EndIndex: 1
    }], 2, [{
        Type: "Comment",
        StartIndex: 0,
        EndIndex: 0
    }, {
        Type: "Test Type A",
        StartIndex: 1,
        EndIndex: 1
    }])
    Test("one two character token preceded by a single character of space", [{
        Type: "Test Type A",
        StartIndex: 1,
        EndIndex: 2
    }], 3, [{
        Type: "Comment",
        StartIndex: 0,
        EndIndex: 0
    }, {
        Type: "Test Type A",
        StartIndex: 1,
        EndIndex: 2
    }])
    Test("one three character token preceded by a single character of space", [{
        Type: "Test Type A",
        StartIndex: 1,
        EndIndex: 3
    }], 4, [{
        Type: "Comment",
        StartIndex: 0,
        EndIndex: 0
    }, {
        Type: "Test Type A",
        StartIndex: 1,
        EndIndex: 3
    }])
    Test("one single character token preceded by two characters of space", [{
        Type: "Test Type A",
        StartIndex: 2,
        EndIndex: 2
    }], 3, [{
        Type: "Comment",
        StartIndex: 0,
        EndIndex: 1
    }, {
        Type: "Test Type A",
        StartIndex: 2,
        EndIndex: 2
    }])
    Test("one two character token preceded by two characters of space", [{
        Type: "Test Type A",
        StartIndex: 2,
        EndIndex: 3
    }], 4, [{
        Type: "Comment",
        StartIndex: 0,
        EndIndex: 1
    }, {
        Type: "Test Type A",
        StartIndex: 2,
        EndIndex: 3
    }])
    Test("one three character token preceded by two characters of space", [{
        Type: "Test Type A",
        StartIndex: 2,
        EndIndex: 4
    }], 5, [{
        Type: "Comment",
        StartIndex: 0,
        EndIndex: 1
    }, {
        Type: "Test Type A",
        StartIndex: 2,
        EndIndex: 4
    }])
    Test("one single character token preceded by three characters of space", [{
        Type: "Test Type A",
        StartIndex: 3,
        EndIndex: 3
    }], 4, [{
        Type: "Comment",
        StartIndex: 0,
        EndIndex: 2
    }, {
        Type: "Test Type A",
        StartIndex: 3,
        EndIndex: 3
    }])
    Test("one two character token preceded by three characters of space", [{
        Type: "Test Type A",
        StartIndex: 3,
        EndIndex: 4
    }], 5, [{
        Type: "Comment",
        StartIndex: 0,
        EndIndex: 2
    }, {
        Type: "Test Type A",
        StartIndex: 3,
        EndIndex: 4
    }])
    Test("one three character token preceded by three characters of space", [{
        Type: "Test Type A",
        StartIndex: 3,
        EndIndex: 5
    }], 6, [{
        Type: "Comment",
        StartIndex: 0,
        EndIndex: 2
    }, {
        Type: "Test Type A",
        StartIndex: 3,
        EndIndex: 5
    }])

    Test("one single character token followed by a single character of space", [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 0
    }], 2, [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 0
    }, {
        Type: "Comment",
        StartIndex: 1,
        EndIndex: 1
    }])
    Test("one two character token followed by a single character of space", [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 1
    }], 3, [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 1
    }, {
        Type: "Comment",
        StartIndex: 2,
        EndIndex: 2
    }])
    Test("one three character token followed by a single character of space", [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 2
    }], 4, [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 2
    }, {
        Type: "Comment",
        StartIndex: 3,
        EndIndex: 3
    }])
    Test("one single character token followed by two characters of space", [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 0
    }], 3, [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 0
    }, {
        Type: "Comment",
        StartIndex: 1,
        EndIndex: 2
    }])
    Test("one two character token followed by two characters of space", [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 1
    }], 4, [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 1
    }, {
        Type: "Comment",
        StartIndex: 2,
        EndIndex: 3
    }])
    Test("one three character token followed by two characters of space", [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 2
    }], 5, [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 2
    }, {
        Type: "Comment",
        StartIndex: 3,
        EndIndex: 4
    }])
    Test("one single character token followed by three characters of space", [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 0
    }], 4, [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 0
    }, {
        Type: "Comment",
        StartIndex: 1,
        EndIndex: 3
    }])
    Test("one two character token followed by three characters of space", [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 1
    }], 5, [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 1
    }, {
        Type: "Comment",
        StartIndex: 2,
        EndIndex: 4
    }])
    Test("one three character token followed by three characters of space", [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 2
    }], 6, [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 2
    }, {
        Type: "Comment",
        StartIndex: 3,
        EndIndex: 5
    }])

    Test("one single character token followed by one single character token", [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 0
    }, {
        Type: "Test Type B",
        StartIndex: 1,
        EndIndex: 1
    }], 2, [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 0
    }, {
        Type: "Test Type B",
        StartIndex: 1,
        EndIndex: 1
    }])
    Test("one single character token followed by one single character token separated by one space", [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 0
    }, {
        Type: "Test Type B",
        StartIndex: 2,
        EndIndex: 2
    }], 3, [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 0
    }, {
        Type: "Comment",
        StartIndex: 1,
        EndIndex: 1
    }, {
        Type: "Test Type B",
        StartIndex: 2,
        EndIndex: 2
    }])
    Test("one single character token followed by one single character token separated by two spaces", [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 0
    }, {
        Type: "Test Type B",
        StartIndex: 3,
        EndIndex: 3
    }], 4, [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 0
    }, {
        Type: "Comment",
        StartIndex: 1,
        EndIndex: 2
    }, {
        Type: "Test Type B",
        StartIndex: 3,
        EndIndex: 3
    }])
    Test("one single character token followed by one single character token separated by three spaces", [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 0
    }, {
        Type: "Test Type B",
        StartIndex: 4,
        EndIndex: 4
    }], 5, [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 0
    }, {
        Type: "Comment",
        StartIndex: 1,
        EndIndex: 3
    }, {
        Type: "Test Type B",
        StartIndex: 4,
        EndIndex: 4
    }])

    Test("one two character token followed by one single character token", [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 1
    }, {
        Type: "Test Type B",
        StartIndex: 2,
        EndIndex: 2
    }], 3, [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 1
    }, {
        Type: "Test Type B",
        StartIndex: 2,
        EndIndex: 2
    }])
    Test("one two character token followed by one single character token separated by one space", [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 1
    }, {
        Type: "Test Type B",
        StartIndex: 3,
        EndIndex: 3
    }], 4, [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 1
    }, {
        Type: "Comment",
        StartIndex: 2,
        EndIndex: 2
    }, {
        Type: "Test Type B",
        StartIndex: 3,
        EndIndex: 3
    }])
    Test("one two character token followed by one single character token separated by two spaces", [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 1
    }, {
        Type: "Test Type B",
        StartIndex: 4,
        EndIndex: 4
    }], 5, [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 1
    }, {
        Type: "Comment",
        StartIndex: 2,
        EndIndex: 3
    }, {
        Type: "Test Type B",
        StartIndex: 4,
        EndIndex: 4
    }])
    Test("one two character token followed by one single character token separated by three spaces", [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 1
    }, {
        Type: "Test Type B",
        StartIndex: 5,
        EndIndex: 5
    }], 6, [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 1
    }, {
        Type: "Comment",
        StartIndex: 2,
        EndIndex: 4
    }, {
        Type: "Test Type B",
        StartIndex: 5,
        EndIndex: 5
    }])

    Test("one three character token followed by one single character token", [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 2
    }, {
        Type: "Test Type B",
        StartIndex: 3,
        EndIndex: 3
    }], 4, [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 2
    }, {
        Type: "Test Type B",
        StartIndex: 3,
        EndIndex: 3
    }])
    Test("one three character token followed by one single character token separated by one space", [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 2
    }, {
        Type: "Test Type B",
        StartIndex: 4,
        EndIndex: 4
    }], 5, [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 2
    }, {
        Type: "Comment",
        StartIndex: 3,
        EndIndex: 3
    }, {
        Type: "Test Type B",
        StartIndex: 4,
        EndIndex: 4
    }])
    Test("one three character token followed by one single character token separated by two spaces", [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 2
    }, {
        Type: "Test Type B",
        StartIndex: 5,
        EndIndex: 5
    }], 6, [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 2
    }, {
        Type: "Comment",
        StartIndex: 3,
        EndIndex: 4
    }, {
        Type: "Test Type B",
        StartIndex: 5,
        EndIndex: 5
    }])
    Test("one three character token followed by one single character token separated by three spaces", [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 2
    }, {
        Type: "Test Type B",
        StartIndex: 6,
        EndIndex: 6
    }], 7, [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 2
    }, {
        Type: "Comment",
        StartIndex: 3,
        EndIndex: 5
    }, {
        Type: "Test Type B",
        StartIndex: 6,
        EndIndex: 6
    }])

    Test("one single character token followed by a two character token", [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 0
    }, {
        Type: "Test Type B",
        StartIndex: 1,
        EndIndex: 2
    }], 3, [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 0
    }, {
        Type: "Test Type B",
        StartIndex: 1,
        EndIndex: 2
    }])
    Test("one single character token followed by a two character token separated by one space", [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 0
    }, {
        Type: "Test Type B",
        StartIndex: 2,
        EndIndex: 3
    }], 4, [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 0
    }, {
        Type: "Comment",
        StartIndex: 1,
        EndIndex: 1
    }, {
        Type: "Test Type B",
        StartIndex: 2,
        EndIndex: 3
    }])
    Test("one single character token followed by a two character token separated by two spaces", [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 0
    }, {
        Type: "Test Type B",
        StartIndex: 3,
        EndIndex: 4
    }], 5, [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 0
    }, {
        Type: "Comment",
        StartIndex: 1,
        EndIndex: 2
    }, {
        Type: "Test Type B",
        StartIndex: 3,
        EndIndex: 4
    }])
    Test("one single character token followed by a two character token separated by three spaces", [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 0
    }, {
        Type: "Test Type B",
        StartIndex: 4,
        EndIndex: 5
    }], 6, [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 0
    }, {
        Type: "Comment",
        StartIndex: 1,
        EndIndex: 3
    }, {
        Type: "Test Type B",
        StartIndex: 4,
        EndIndex: 5
    }])

    Test("one two character token followed by a two character token", [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 1
    }, {
        Type: "Test Type B",
        StartIndex: 2,
        EndIndex: 3
    }], 4, [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 1
    }, {
        Type: "Test Type B",
        StartIndex: 2,
        EndIndex: 3
    }])
    Test("one two character token followed by a two character token separated by one space", [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 1
    }, {
        Type: "Test Type B",
        StartIndex: 3,
        EndIndex: 4
    }], 5, [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 1
    }, {
        Type: "Comment",
        StartIndex: 2,
        EndIndex: 2
    }, {
        Type: "Test Type B",
        StartIndex: 3,
        EndIndex: 4
    }])
    Test("one two character token followed by a two character token separated by two spaces", [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 1
    }, {
        Type: "Test Type B",
        StartIndex: 4,
        EndIndex: 5
    }], 6, [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 1
    }, {
        Type: "Comment",
        StartIndex: 2,
        EndIndex: 3
    }, {
        Type: "Test Type B",
        StartIndex: 4,
        EndIndex: 5
    }])
    Test("one two character token followed by a two character token separated by three spaces", [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 1
    }, {
        Type: "Test Type B",
        StartIndex: 5,
        EndIndex: 6
    }], 7, [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 1
    }, {
        Type: "Comment",
        StartIndex: 2,
        EndIndex: 4
    }, {
        Type: "Test Type B",
        StartIndex: 5,
        EndIndex: 6
    }])

    Test("one three character token followed by a two character token", [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 2
    }, {
        Type: "Test Type B",
        StartIndex: 3,
        EndIndex: 4
    }], 5, [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 2
    }, {
        Type: "Test Type B",
        StartIndex: 3,
        EndIndex: 4
    }])
    Test("one three character token followed by a two character token separated by one space", [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 2
    }, {
        Type: "Test Type B",
        StartIndex: 4,
        EndIndex: 5
    }], 6, [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 2
    }, {
        Type: "Comment",
        StartIndex: 3,
        EndIndex: 3
    }, {
        Type: "Test Type B",
        StartIndex: 4,
        EndIndex: 5
    }])
    Test("one three character token followed by a two character token separated by two spaces", [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 2
    }, {
        Type: "Test Type B",
        StartIndex: 5,
        EndIndex: 6
    }], 7, [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 2
    }, {
        Type: "Comment",
        StartIndex: 3,
        EndIndex: 4
    }, {
        Type: "Test Type B",
        StartIndex: 5,
        EndIndex: 6
    }])
    Test("one three character token followed by a two character token separated by three spaces", [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 2
    }, {
        Type: "Test Type B",
        StartIndex: 6,
        EndIndex: 7
    }], 8, [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 2
    }, {
        Type: "Comment",
        StartIndex: 3,
        EndIndex: 5
    }, {
        Type: "Test Type B",
        StartIndex: 6,
        EndIndex: 7
    }])

    Test("one single character token followed by a three character token", [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 0
    }, {
        Type: "Test Type B",
        StartIndex: 1,
        EndIndex: 3
    }], 4, [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 0
    }, {
        Type: "Test Type B",
        StartIndex: 1,
        EndIndex: 3
    }])
    Test("one single character token followed by a three character token separated by one space", [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 0
    }, {
        Type: "Test Type B",
        StartIndex: 2,
        EndIndex: 4
    }], 5, [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 0
    }, {
        Type: "Comment",
        StartIndex: 1,
        EndIndex: 1
    }, {
        Type: "Test Type B",
        StartIndex: 2,
        EndIndex: 4
    }])
    Test("one single character token followed by a three character token separated by two spaces", [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 0
    }, {
        Type: "Test Type B",
        StartIndex: 3,
        EndIndex: 5
    }], 6, [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 0
    }, {
        Type: "Comment",
        StartIndex: 1,
        EndIndex: 2
    }, {
        Type: "Test Type B",
        StartIndex: 3,
        EndIndex: 5
    }])
    Test("one single character token followed by a three character token separated by three spaces", [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 0
    }, {
        Type: "Test Type B",
        StartIndex: 4,
        EndIndex: 6
    }], 7, [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 0
    }, {
        Type: "Comment",
        StartIndex: 1,
        EndIndex: 3
    }, {
        Type: "Test Type B",
        StartIndex: 4,
        EndIndex: 6
    }])

    Test("one two character token followed by a three character token", [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 1
    }, {
        Type: "Test Type B",
        StartIndex: 2,
        EndIndex: 4
    }], 5, [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 1
    }, {
        Type: "Test Type B",
        StartIndex: 2,
        EndIndex: 4
    }])
    Test("one two character token followed by a three character token separated by one space", [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 1
    }, {
        Type: "Test Type B",
        StartIndex: 3,
        EndIndex: 5
    }], 6, [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 1
    }, {
        Type: "Comment",
        StartIndex: 2,
        EndIndex: 2
    }, {
        Type: "Test Type B",
        StartIndex: 3,
        EndIndex: 5
    }])
    Test("one two character token followed by a three character token separated by two spaces", [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 1
    }, {
        Type: "Test Type B",
        StartIndex: 4,
        EndIndex: 6
    }], 7, [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 1
    }, {
        Type: "Comment",
        StartIndex: 2,
        EndIndex: 3
    }, {
        Type: "Test Type B",
        StartIndex: 4,
        EndIndex: 6
    }])
    Test("one two character token followed by a three character token separated by three spaces", [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 1
    }, {
        Type: "Test Type B",
        StartIndex: 5,
        EndIndex: 7
    }], 8, [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 1
    }, {
        Type: "Comment",
        StartIndex: 2,
        EndIndex: 4
    }, {
        Type: "Test Type B",
        StartIndex: 5,
        EndIndex: 7
    }])

    Test("one three character token followed by a three character token", [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 2
    }, {
        Type: "Test Type B",
        StartIndex: 3,
        EndIndex: 5
    }], 6, [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 2
    }, {
        Type: "Test Type B",
        StartIndex: 3,
        EndIndex: 5
    }])
    Test("one three character token followed by a three character token separated by one space", [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 2
    }, {
        Type: "Test Type B",
        StartIndex: 4,
        EndIndex: 6
    }], 7, [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 2
    }, {
        Type: "Comment",
        StartIndex: 3,
        EndIndex: 3
    }, {
        Type: "Test Type B",
        StartIndex: 4,
        EndIndex: 6
    }])
    Test("one three character token followed by a three character token separated by two spaces", [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 2
    }, {
        Type: "Test Type B",
        StartIndex: 5,
        EndIndex: 7
    }], 8, [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 2
    }, {
        Type: "Comment",
        StartIndex: 3,
        EndIndex: 4
    }, {
        Type: "Test Type B",
        StartIndex: 5,
        EndIndex: 7
    }])
    Test("one three character token followed by a three character token separated by three spaces", [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 2
    }, {
        Type: "Test Type B",
        StartIndex: 6,
        EndIndex: 8
    }], 9, [{
        Type: "Test Type A",
        StartIndex: 0,
        EndIndex: 2
    }, {
        Type: "Comment",
        StartIndex: 3,
        EndIndex: 5
    }, {
        Type: "Test Type B",
        StartIndex: 6,
        EndIndex: 8
    }])

    Test("complex scenario", [{
        Type: "Test Type A",
        StartIndex: 3,
        EndIndex: 6
    }, {
        Type: "Test Type B",
        StartIndex: 7,
        EndIndex: 11
    }, {
        Type: "Test Type C",
        StartIndex: 14,
        EndIndex: 16
    }, {
        Type: "Test Type D",
        StartIndex: 25,
        EndIndex: 28
    }], 32, [{
        Type: "Comment",
        StartIndex: 0,
        EndIndex: 2
    }, {
        Type: "Test Type A",
        StartIndex: 3,
        EndIndex: 6
    }, {
        Type: "Test Type B",
        StartIndex: 7,
        EndIndex: 11
    }, {
        Type: "Comment",
        StartIndex: 12,
        EndIndex: 13
    }, {
        Type: "Test Type C",
        StartIndex: 14,
        EndIndex: 16
    }, {
        Type: "Comment",
        StartIndex: 17,
        EndIndex: 24
    }, {
        Type: "Test Type D",
        StartIndex: 25,
        EndIndex: 28
    }, {
        Type: "Comment",
        StartIndex: 29,
        EndIndex: 31
    }])
})