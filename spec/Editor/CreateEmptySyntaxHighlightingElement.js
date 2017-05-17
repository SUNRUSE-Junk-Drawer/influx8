describe("CreateEmptySyntaxHighlightingElement", () => {
    global.window = {}
    const Namespace = require("rewire")("../../Editor.js")
    delete global.window
    const CreateEmptySyntaxHighlightingElement = Namespace.__get__("CreateEmptySyntaxHighlightingElement")
    let document
    let syntaxHighlightingElement
    let result
    beforeEach(() => {
        document = {
            createElement: jasmine.createSpy("createElement")
        }
        Namespace.__set__("document", document)
        syntaxHighlightingElement = {
            appendChild: jasmine.createSpy("appendChild")
        }
        syntaxHighlightingElement = {
            style: {
                misc: "unmodified"
            }
        }
        document.createElement.and.returnValue(syntaxHighlightingElement)
        result = CreateEmptySyntaxHighlightingElement()
    })
    it("creates one element", () => expect(document.createElement.calls.count()).toEqual(1))
    it("creates one div", () => expect(document.createElement).toHaveBeenCalledWith("div"))
    it("fills its container horizontally", () => expect(syntaxHighlightingElement.style.width).toEqual("100%"))
    it("word wraps the same as the text area", () => expect(syntaxHighlightingElement.style.wordWrap).toEqual("break-word"))
    it("enforces word wrapping to match the text area", () => expect(syntaxHighlightingElement.style.whiteSpace).toEqual("pre-wrap"))
    it("does not modify other aspects of the style", () => expect(syntaxHighlightingElement.style.misc).toEqual("unmodified"))
    it("returns the created div", () => expect(result).toBe(syntaxHighlightingElement))
})