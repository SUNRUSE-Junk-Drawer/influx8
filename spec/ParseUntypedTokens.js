describe("ParseUntypedTokens", () => {
    const ParseUntypedTokens = require("rewire")("../dist/index.js").__get__("ParseUntypedTokens")

    function Test(description, input, output) {
        it(description, () => {
            expect(ParseUntypedTokens(input)).toEqual(output)
        })
    }

    Test("returns empty for empty", "", [])
    Test("returns empty for whitespace", "    ", [])

    Test("returns empty for whitespace with newlines", `
        
        
        
`, [])

    Test("finds a single token", "testToken2378$", [{
        StartIndex: 0,
        Text: "testtoken2378$"
    }])

    Test("finds a single token preceded by whitespace", "   testToken2378$", [{
        StartIndex: 3,
        Text: "testtoken2378$"
    }])

    Test("finds a single token preceded by whitespace including newlines", `


testToken2378$
`, [{
            StartIndex: 3,
            Text: "testtoken2378$"
        }])

    Test("finds a single token followed by whitespace", "testToken2378$     ", [{
        StartIndex: 0,
        Text: "testtoken2378$"
    }])

    Test("finds a single token followed by whitespace including newlines", `testToken2378$



`, [{
            StartIndex: 0,
            Text: "testtoken2378$"
        }])

    Test("finds multiple tokens split by whitespace or newlines", `testToken2378$  SOMEmoretokens 2furtherTOKEN


followingNewlinesToken WithMORE!after
  andMoreHere
    `, [{
            StartIndex: 0,
            Text: "testtoken2378$"
        }, {
            StartIndex: 16,
            Text: "somemoretokens"
        }, {
            StartIndex: 31,
            Text: "2furthertoken"
        }, {
            StartIndex: 47,
            Text: "followingnewlinestoken"
        }, {
            StartIndex: 70,
            Text: "withmore!after"
        }, {
            StartIndex: 87,
            Text: "andmorehere"
        }])
})