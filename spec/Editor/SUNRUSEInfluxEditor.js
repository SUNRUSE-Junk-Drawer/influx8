describe("SUNRUSEInfluxEditor", () => {
    let Namespace = require("rewire")("../../Editor.js")
    it("defines the function globally", () => expect(global.window.SUNRUSEInfluxEditor).toEqual(jasmine.any(Function)))
    describe("on calling with non-null source code", () => {
        let CreateTextArea
        let CreateTextAreaWrappingElement
        let SetupChangeListener
        let editorElement
        beforeEach(() => {
            // Ensures that we're setting up mocks around the function from our namespace, not one left in the global object by another test.
            Namespace = require("rewire")("../../Editor.js")
            CreateTextArea = jasmine.createSpy("CreateTextArea")
            CreateTextArea.and.returnValue("test text area")
            Namespace.__set__("CreateTextArea", CreateTextArea)
            CreateTextAreaWrappingElement = jasmine.createSpy("CreateTextAreaWrappingElement")
            CreateTextAreaWrappingElement.and.returnValue("test text area wrapping element")
            Namespace.__set__("CreateTextAreaWrappingElement", CreateTextAreaWrappingElement)
            SetupChangeListener = jasmine.createSpy("SetupChangeListener")
            Namespace.__set__("SetupChangeListener", SetupChangeListener)
            editorElement = {
                textContent: "test source code",
                appendChild: jasmine.createSpy("appendChild")
            }
            editorElement.appendChild.and.callFake(() => {
                expect(editorElement.textContent).toEqual("")
                editorElement.textContent = "test text content after adding text area wrapping element"
            })
            global.window.SUNRUSEInfluxEditor(editorElement, "test configuration")
        })
        it("creates one text area", () => expect(CreateTextArea.calls.count()).toEqual(1))
        it("gives the text area the source code", () => expect(CreateTextArea).toHaveBeenCalledWith("test source code"))
        it("creates one text area wrapper", () => expect(CreateTextAreaWrappingElement.calls.count()).toEqual(1))
        it("gives the text area wrapper the text area", () => expect(CreateTextAreaWrappingElement).toHaveBeenCalledWith("test text area"))
        it("appends one element to the editor element", () => expect(editorElement.appendChild.calls.count()).toEqual(1))
        it("appends the text area wrapper to the editor element", () => expect(editorElement.appendChild).toHaveBeenCalledWith("test text area wrapping element"))
        it("sets up one change listener", () => expect(SetupChangeListener.calls.count()).toEqual(1))
        it("sets up the change listener with the editor element, text area, text area wrapping element and configuration", () => expect(SetupChangeListener).toHaveBeenCalledWith(editorElement, "test text area", "test text area wrapping element", "test configuration"))
        it("has not modified the textContent after adding the text area wrapping element", () => expect(editorElement.textContent).toEqual("test text content after adding text area wrapping element"))
    })
    describe("on calling with null source code", () => {
        let CreateTextArea
        let CreateTextAreaWrappingElement
        let SetupChangeListener
        let editorElement
        beforeEach(() => {
            // Ensures that we're setting up mocks around the function from our namespace, not one left in the global object by another test.
            Namespace = require("rewire")("../../Editor.js")
            CreateTextArea = jasmine.createSpy("CreateTextArea")
            CreateTextArea.and.returnValue("test text area")
            Namespace.__set__("CreateTextArea", CreateTextArea)
            CreateTextAreaWrappingElement = jasmine.createSpy("CreateTextAreaWrappingElement")
            CreateTextAreaWrappingElement.and.returnValue("test text area wrapping element")
            Namespace.__set__("CreateTextAreaWrappingElement", CreateTextAreaWrappingElement)
            SetupChangeListener = jasmine.createSpy("SetupChangeListener")
            Namespace.__set__("SetupChangeListener", SetupChangeListener)
            editorElement = {
                textContent: null,
                appendChild: jasmine.createSpy("appendChild")
            }
            editorElement.appendChild.and.callFake(() => {
                expect(editorElement.textContent).toEqual("")
                editorElement.textContent = "test text content after adding text area wrapping element"
            })
            global.window.SUNRUSEInfluxEditor(editorElement, "test configuration")
        })
        it("creates one text area", () => expect(CreateTextArea.calls.count()).toEqual(1))
        it("gives the text area the source code, coerced to an empty string", () => expect(CreateTextArea).toHaveBeenCalledWith(""))
        it("creates one text area wrapper", () => expect(CreateTextAreaWrappingElement.calls.count()).toEqual(1))
        it("gives the text area wrapper the text area", () => expect(CreateTextAreaWrappingElement).toHaveBeenCalledWith("test text area"))
        it("appends one element to the editor element", () => expect(editorElement.appendChild.calls.count()).toEqual(1))
        it("appends the text area wrapper to the editor element", () => expect(editorElement.appendChild).toHaveBeenCalledWith("test text area wrapping element"))
        it("sets up one change listener", () => expect(SetupChangeListener.calls.count()).toEqual(1))
        it("sets up the change listener with the editor element, text area, text area wrapping element and configuration", () => expect(SetupChangeListener).toHaveBeenCalledWith(editorElement, "test text area", "test text area wrapping element", "test configuration"))
        it("has not modified the textContent after adding the text area wrapping element", () => expect(editorElement.textContent).toEqual("test text content after adding text area wrapping element"))
    })
})