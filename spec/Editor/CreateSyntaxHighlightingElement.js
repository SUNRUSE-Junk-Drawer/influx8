describe("CreateSyntaxHighlightingElement", () => {
    const Namespace = require("rewire")("../../Editor.js")
    const CreateSyntaxHighlightingElement = Namespace.__get__("CreateSyntaxHighlightingElement")
    let CreateEmptySyntaxHighlightingElement
    let FillTokenGapsWithComments
    let AddSyntaxHighlightingRun
    let AddSyntaxHighlightingFooter
    let result
    beforeEach(() => {
        CreateEmptySyntaxHighlightingElement = jasmine.createSpy("CreateEmptySyntaxHighlightingElement")
        CreateEmptySyntaxHighlightingElement.and.returnValue("test wrapping element")
        Namespace.__set__("CreateEmptySyntaxHighlightingElement", CreateEmptySyntaxHighlightingElement)
        FillTokenGapsWithComments = jasmine.createSpy("FillTokenGapsWithComments")
        FillTokenGapsWithComments.and.callFake((tokens, source) => {
            expect(tokens).toEqual("test tokens")
            expect(source).toEqual("test source")
            return ["test token a", "test token b", "test token c"]
        })
        Namespace.__set__("FillTokenGapsWithComments", FillTokenGapsWithComments)
        AddSyntaxHighlightingRun = jasmine.createSpy("AddSyntaxHighlightingRun")
        AddSyntaxHighlightingRun.and.callFake(() => expect(AddSyntaxHighlightingFooter).not.toHaveBeenCalled())
        Namespace.__set__("AddSyntaxHighlightingRun", AddSyntaxHighlightingRun)
        AddSyntaxHighlightingFooter = jasmine.createSpy("AddSyntaxHighlightingFooter")
        Namespace.__set__("AddSyntaxHighlightingFooter", AddSyntaxHighlightingFooter)
        result = CreateSyntaxHighlightingElement("test tokens", "test source")
    })
    it("creates one empty element", () => expect(CreateEmptySyntaxHighlightingElement.calls.count()).toEqual(1))
    it("creates a run for every token in order", () => expect(AddSyntaxHighlightingRun.calls.allArgs()).toEqual([["test token a", "test wrapping element", "test source"], ["test token b", "test wrapping element", "test source"], ["test token c", "test wrapping element", "test source"]]))
    it("appends a single footer", () => expect(AddSyntaxHighlightingFooter.calls.count()).toEqual(1))
    it("appends the footer to the created element", () => expect(AddSyntaxHighlightingFooter).toHaveBeenCalledWith("test wrapping element"))
    it("returns the created element", () => expect(result).toEqual("test wrapping element"))
})