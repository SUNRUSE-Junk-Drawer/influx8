describe("AddSyntaxHighlightingFooter", () => {
    global.window = {}
    const Namespace = require("rewire")("../../Editor.js")
    delete global.window
    const AddSyntaxHighlightingFooter = Namespace.__get__("AddSyntaxHighlightingFooter")
    let document
    let syntaxHighlightingElement
    let footerElement
    beforeEach(() => {
        document = {
            createElement: jasmine.createSpy("createElement")
        }
        Namespace.__set__("document", document)
        syntaxHighlightingElement = {
            appendChild: jasmine.createSpy("appendChild")
        }
        footerElement = {
            textContent: "test existing text content"
        }
        document.createElement.and.returnValue(footerElement)
        AddSyntaxHighlightingFooter(syntaxHighlightingElement)
    })
    it("creates one element", () => expect(document.createElement.calls.count()).toEqual(1))
    it("creates one div", () => expect(document.createElement).toHaveBeenCalledWith("div"))
    it("sets the text content", () => expect(footerElement.textContent).toEqual(" "))
    it("appends one element", () => expect(syntaxHighlightingElement.appendChild.calls.count()).toEqual(1))
    it("appends the created element", () => expect(syntaxHighlightingElement.appendChild).toHaveBeenCalledWith(footerElement))
})