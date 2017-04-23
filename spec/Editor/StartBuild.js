describe("StartBuild", () => {
    const Namespace = require("rewire")("../../Editor.js")
    const StartBuild = Namespace.__get__("StartBuild")
    let result
    let editorElement
    beforeEach(() => {
        Namespace.__set__("ParseToTokens", (source) => {
            expect(source).toEqual("test source code")
            return "test tokens"
        })
        Namespace.__set__("CreateSyntaxHighlightingElement", (tokens, source) => {
            expect(tokens).toEqual("test tokens")
            expect(source).toEqual("test source code")
            return "test syntax highlighting element"
        })
        editorElement = {
            insertBefore: jasmine.createSpy("insertBefore")
        }
        result = StartBuild(editorElement, "test source code", "test text area wrapping element")
    })
    it("inserts one element into the editor element", () => expect(editorElement.insertBefore.calls.count()).toEqual(1))
    it("inserts the syntax highlighting element before the textarea's wrapper", () => expect(editorElement.insertBefore).toHaveBeenCalledWith("test syntax highlighting element", "test text area wrapping element"))
    it("returns the editor element", () => expect(result.EditorElement).toBe(editorElement))
    it("returns the syntax highlighting element", () => expect(result.SyntaxHighlightingElement).toEqual("test syntax highlighting element"))
})