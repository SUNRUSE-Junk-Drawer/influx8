describe("CreateTextAreaWrappingElement", () => {
    const Namespace = require("rewire")("../../Editor.js")
    const CreateTextAreaWrappingElement = Namespace.__get__("CreateTextAreaWrappingElement")
    let document
    let textAreaWrappingElement
    let result
    beforeEach(() => {
        document = {
            createElement: jasmine.createSpy("createElement")
        }
        Namespace.__set__("document", document)
        textAreaWrappingElement = {
            appendChild: jasmine.createSpy("appendChild"),
            style: {
                misc: "unmodified"
            }
        }
        document.createElement.and.returnValue(textAreaWrappingElement)
        result = CreateTextAreaWrappingElement("test text area element")
    })
    it("creates one element", () => expect(document.createElement.calls.count()).toEqual(1))
    it("creates one div", () => expect(document.createElement).toHaveBeenCalledWith("div"))
    it("positions the div absolutely", () => expect(textAreaWrappingElement.style.position).toEqual("absolute"))
    it("docks the div to the left", () => expect(textAreaWrappingElement.style.left).toEqual("0"))
    it("docks the div to the top", () => expect(textAreaWrappingElement.style.top).toEqual("0"))
    it("docks the div to the right", () => expect(textAreaWrappingElement.style.right).toEqual("0"))
    it("docks the div to the bottom", () => expect(textAreaWrappingElement.style.bottom).toEqual("0"))
    it("docks the div to the padding", () => expect(textAreaWrappingElement.style.padding).toEqual("inherit"))
    it("does not modify other aspects of the style", () => expect(textAreaWrappingElement.style.misc).toEqual("unmodified"))
    it("appends one child to the wrapping element", () => expect(textAreaWrappingElement.appendChild.calls.count()).toEqual(1))
    it("appends the text area to the wrapping element", () => expect(textAreaWrappingElement.appendChild).toHaveBeenCalledWith("test text area element"))
    it("returns the wrapping element", () => expect(result).toBe(textAreaWrappingElement))
})