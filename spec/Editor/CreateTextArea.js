describe("CreateTextArea", () => {
    const Namespace = require("rewire")("../../Editor.js")
    const CreateTextArea = Namespace.__get__("CreateTextArea")
    let document
    let textAreaElement
    let result
    beforeEach(() => {
        document = {
            createElement: jasmine.createSpy("createElement")
        }
        Namespace.__set__("document", document)
        textAreaElement = {
            appendChild: jasmine.createSpy("appendChild")
        }
        textAreaElement = {
            spellcheck: true,
            style: {
                misc: "unmodified"
            }
        }
        document.createElement.and.returnValue(textAreaElement)
        result = CreateTextArea("test source code")
    })
    it("creates one element", () => expect(document.createElement.calls.count()).toEqual(1))
    it("creates one textarea", () => expect(document.createElement).toHaveBeenCalledWith("textarea"))
    it("sets spellcheck to false", () => expect(textAreaElement.spellcheck).toBeFalsy())
    it("removes the background", () => expect(textAreaElement.style.background).toEqual("none"))
    it("removes the border", () => expect(textAreaElement.style.border).toEqual("none"))
    it("removes the outline", () => expect(textAreaElement.style.outline).toEqual("none"))
    it("removes the padding", () => expect(textAreaElement.style.padding).toEqual("0"))
    it("removes the margin", () => expect(textAreaElement.style.margin).toEqual("0"))
    it("inherits the font color", () => expect(textAreaElement.style.color).toEqual("inherit"))
    it("hides the text as the syntax highlighting should be shown instead", () => expect(textAreaElement.style.webkitTextFillColor).toEqual("transparent"))
    it("inherits the font family", () => expect(textAreaElement.style.fontFamily).toEqual("inherit"))
    it("inherits the font size", () => expect(textAreaElement.style.fontSize).toEqual("inherit"))
    it("inherits the font size adjustment", () => expect(textAreaElement.style.fontSizeAdjust).toEqual("inherit"))
    it("inherits the font feature settings", () => expect(textAreaElement.style.fontFeatureSettings).toEqual("inherit"))
    it("inherits the font variant", () => expect(textAreaElement.style.fontVariant).toEqual("inherit"))
    it("inherits the font weight", () => expect(textAreaElement.style.fontWeight).toEqual("inherit"))
    it("inherits the font style", () => expect(textAreaElement.style.fontStyle).toEqual("inherit"))
    it("inherits the font stretch", () => expect(textAreaElement.style.fontStretch).toEqual("inherit"))
    it("inherits the line height", () => expect(textAreaElement.style.lineHeight).toEqual("inherit"))
    it("inherits the line break", () => expect(textAreaElement.style.lineBreak).toEqual("inherit"))
    it("enforces word wrapping to prevent scrolling", () => expect(textAreaElement.style.whiteSpace).toEqual("pre-wrap"))
    it("inherits the text alignment", () => expect(textAreaElement.style.textAlign).toEqual("inherit"))
    it("inherits the text alignment on the last line", () => expect(textAreaElement.style.textAlignLast).toEqual("inherit"))
    it("inherits the text anchoring", () => expect(textAreaElement.style.textAnchor).toEqual("inherit"))
    it("inherits the text decoration", () => expect(textAreaElement.style.textDecoration).toEqual("inherit"))
    it("inherits the text indentation", () => expect(textAreaElement.style.textIndent).toEqual("inherit"))
    it("inherits the text justification", () => expect(textAreaElement.style.textJustify).toEqual("inherit"))
    it("inherits the text kashida", () => expect(textAreaElement.style.textKashida).toEqual("inherit"))
    it("inherits the text kashida space", () => expect(textAreaElement.style.textKashidaSpace).toEqual("inherit"))
    it("inherits the text overflow", () => expect(textAreaElement.style.textOverflow).toEqual("inherit"))
    it("inherits the text shadow", () => expect(textAreaElement.style.textShadow).toEqual("inherit"))
    it("inherits the text transform", () => expect(textAreaElement.style.textTransform).toEqual("inherit"))
    it("inherits the text underline position", () => expect(textAreaElement.style.textUnderlinePosition).toEqual("inherit"))
    it("hides any overflow", () => expect(textAreaElement.style.overflow).toEqual("hidden"))
    it("fills horizontally", () => expect(textAreaElement.style.width).toEqual("100%"))
    it("fills vertically", () => expect(textAreaElement.style.height).toEqual("100%"))
    it("disables resizing", () => expect(textAreaElement.style.resize).toEqual("none"))
    it("does not modify other aspects of the style", () => expect(textAreaElement.style.misc).toEqual("unmodified"))
    it("copies the source code", () => expect(textAreaElement.value).toEqual("test source code"))
    it("returns the created textarea", () => expect(result).toBe(textAreaElement))
})