describe("AddSyntaxHighlightingRun", () => {
    global.window = {}
    const Namespace = require("rewire")("../../Editor.js")
    delete global.window
    const AddSyntaxHighlightingRun = Namespace.__get__("AddSyntaxHighlightingRun")
    let document
    let syntaxHighlightingElement
    let runElement
    beforeEach(() => {
        document = {
            createElement: jasmine.createSpy("createElement")
        }
        Namespace.__set__("document", document)
        syntaxHighlightingElement = {
            appendChild: jasmine.createSpy("appendChild")
        }
        runElement = {
            setAttribute: jasmine.createSpy("setAttribute")
        }
        document.createElement.and.returnValue(runElement)
        AddSyntaxHighlightingRun({
            Type: "Test Token Type",
            StartIndex: 3,
            EndIndex: 9
        }, syntaxHighlightingElement, "Test Source Code")
    })
    it("creates one element", () => expect(document.createElement.calls.count()).toEqual(1))
    it("creates one span", () => expect(document.createElement).toHaveBeenCalledWith("span"))
    it("sets one attribute", () => expect(runElement.setAttribute.calls.count()).toEqual(1))
    it("sets the token type attribute", () => expect(runElement.setAttribute).toHaveBeenCalledWith("SUNRUSEInfluxTokenType", "Test Token Type"))
    it("sets the text content", () => expect(runElement.textContent).toEqual("t Sourc"))
    it("appends one element", () => expect(syntaxHighlightingElement.appendChild.calls.count()).toEqual(1))
    it("appends the created element", () => expect(syntaxHighlightingElement.appendChild).toHaveBeenCalledWith(runElement))
})