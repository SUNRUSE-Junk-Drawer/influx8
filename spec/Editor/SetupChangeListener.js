describe("SetupChangeListener", () => {
    const Namespace = require("rewire")("../../Editor.js")
    const SetupChangeListener = Namespace.__get__("SetupChangeListener")
    let Throttle
    let StartBuild
    let EndBuild
    let textArea
    beforeEach(() => {
        Throttle = jasmine.createSpy("Throttle")
        Throttle.and.returnValue("test throttle")
        Namespace.__set__("Throttle", Throttle)

        StartBuild = jasmine.createSpy("StartBuild")
        StartBuild.and.callFake((editorElement, source, textAreaWrappingElement) => {
            expect(EndBuild.calls.count()).toEqual(StartBuild.calls.count() - 1, "Builds started without ending the previous")
            switch (source) {
                case "test source code a": return "test build a"
                case "test source code b": return "test build b"
                case "test source code c": return "test build c"
                case "test source code d": return "test build d"
                default: fail("Unexpected source")
            }
        })
        Namespace.__set__("StartBuild", StartBuild)
        EndBuild = jasmine.createSpy("EndBuild")
        Namespace.__set__("EndBuild", EndBuild)
        textArea = {
            value: "test source code a",
            addEventListener: jasmine.createSpy("addEventListener")
        }
        result = SetupChangeListener("test editor element", textArea, "test text area wrapping element")
    })
    it("creates one throttle", () => expect(Throttle.calls.count()).toEqual(1))
    it("creates a throttle for 500 milliseconds", () => expect(Throttle).toHaveBeenCalledWith(500))
    it("adds two event listeners to the text area", () => expect(textArea.addEventListener.calls.count()).toEqual(2))
    it("adds an event listener for input", () => expect(textArea.addEventListener).toHaveBeenCalledWith("change", jasmine.any(Function)))
    it("adds an event listener for changes", () => expect(textArea.addEventListener).toHaveBeenCalledWith("input", jasmine.any(Function)))
    it("gives both event listeners the same callback", () => expect(textArea.addEventListener.calls.argsFor(0)[1]).toBe(textArea.addEventListener.calls.argsFor(1)[1]))
    it("starts one build", () => expect(StartBuild.calls.count()).toEqual(1))
    it("gives the build the editor element, source code and text area wrapping element", () => expect(StartBuild).toHaveBeenCalledWith("test editor element", "test source code a", "test text area wrapping element", "test throttle"))
    it("does not end a build", () => expect(EndBuild.calls.count()).toEqual(0))
    describe("on executing a callback", () => {
        beforeEach(() => {
            textArea.value = "test source code b"
            textArea.addEventListener.calls.argsFor(0)[1]()
        })
        it("does not create further throttles", () => expect(Throttle.calls.count()).toEqual(1))
        it("does not add further event listeners to the text area", () => expect(textArea.addEventListener.calls.count()).toEqual(2))
        it("starts a second build", () => expect(StartBuild.calls.count()).toEqual(2))
        it("gives the build the editor element, source code and text area wrapping element", () => expect(StartBuild).toHaveBeenCalledWith("test editor element", "test source code b", "test text area wrapping element", "test throttle"))
        it("ends one build", () => expect(EndBuild.calls.count()).toEqual(1))
        it("ends the previously started build", () => expect(EndBuild).toHaveBeenCalledWith("test build a"))
        describe("on executing another callback", () => {
            beforeEach(() => {
                textArea.value = "test source code c"
                textArea.addEventListener.calls.argsFor(0)[1]()
            })
            it("does not create further throttles", () => expect(Throttle.calls.count()).toEqual(1))
            it("does not add further event listeners to the text area", () => expect(textArea.addEventListener.calls.count()).toEqual(2))
            it("starts a third build", () => expect(StartBuild.calls.count()).toEqual(3))
            it("gives the build the editor element, source code and text area wrapping element", () => expect(StartBuild).toHaveBeenCalledWith("test editor element", "test source code c", "test text area wrapping element", "test throttle"))
            it("ends another build", () => expect(EndBuild.calls.count()).toEqual(2))
            it("ends the previously started build", () => expect(EndBuild).toHaveBeenCalledWith("test build b"))
            describe("on executing another callback", () => {
                beforeEach(() => {
                    textArea.value = "test source code d"
                    textArea.addEventListener.calls.argsFor(0)[1]()
                })
                it("does not create further throttles", () => expect(Throttle.calls.count()).toEqual(1))
                it("does not add further event listeners to the text area", () => expect(textArea.addEventListener.calls.count()).toEqual(2))
                it("starts a fourth build", () => expect(StartBuild.calls.count()).toEqual(4))
                it("gives the build the editor element, source code and text area wrapping element", () => expect(StartBuild).toHaveBeenCalledWith("test editor element", "test source code d", "test text area wrapping element", "test throttle"))
                it("ends another build", () => expect(EndBuild.calls.count()).toEqual(3))
                it("ends the previously started build", () => expect(EndBuild).toHaveBeenCalledWith("test build c"))
            })
        })
    })
})