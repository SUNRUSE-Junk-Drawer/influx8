describe("EndBuild", () => {
    global.window = {}
    const Namespace = require("rewire")("../../Editor.js")
    delete global.window
    const EndBuild = Namespace.__get__("EndBuild")
    let editorElement
    beforeEach(() => {
        editorElement = {
            removeChild: jasmine.createSpy("removeChild")
        }
        EndBuild({
            EditorElement: editorElement,
            SyntaxHighlightingElement: "test syntax highlighting element"
        })
    })
    it("removes one element from the editor element", () => expect(editorElement.removeChild.calls.count()).toEqual(1))
    it("it removes the syntax highlighting element from the editor element", () => expect(editorElement.removeChild).toHaveBeenCalledWith("test syntax highlighting element"))
})