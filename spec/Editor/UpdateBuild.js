describe("UpdateBuild", () => {
    global.window = {}
    const Namespace = require("rewire")("../../Editor.js")
    delete global.window
    const UpdateBuild = Namespace.__get__("UpdateBuild")

    let configuration
    beforeEach(() => {
        configuration = {
            Tasks: [{
                WhenCompleted: jasmine.createSpy("WhenCompleted")
            }, {
                WhenCompleted: jasmine.createSpy("WhenCompleted")
            }, {
                WhenCompleted: jasmine.createSpy("WhenCompleted")
            }, {
                WhenCompleted: jasmine.createSpy("WhenCompleted")
            }]
        }
    })

    describe("when a task for another build completes", () => {
        beforeEach(() => {
            UpdateBuild(configuration, {
                Id: "test correct build id"
            }, {
                    Type: "TaskCompleted",
                    TaskIndex: 2,
                    BuildId: "test incorrect build id",
                    Data: "test data"
                })
        })

        it("does not execute a completion callback", () => {
            expect(configuration.Tasks[0].WhenCompleted).not.toHaveBeenCalled()
            expect(configuration.Tasks[1].WhenCompleted).not.toHaveBeenCalled()
            expect(configuration.Tasks[2].WhenCompleted).not.toHaveBeenCalled()
            expect(configuration.Tasks[3].WhenCompleted).not.toHaveBeenCalled()
        })
    })

    describe("when a task for the correct build completes", () => {
        beforeEach(() => {
            UpdateBuild(configuration, {
                Id: "test correct build id"
            }, {
                    Type: "TaskCompleted",
                    TaskIndex: 2,
                    BuildId: "test correct build id",
                    Data: "test data"
                })
        })

        it("executes the correct completion callback once", () => expect(configuration.Tasks[2].WhenCompleted.calls.count()).toEqual(1))
        it("executes the correct completion callback with the data", () => expect(configuration.Tasks[2].WhenCompleted).toHaveBeenCalledWith("test data"))

        it("does not execute any other completion callbacks", () => {
            expect(configuration.Tasks[0].WhenCompleted).not.toHaveBeenCalled()
            expect(configuration.Tasks[1].WhenCompleted).not.toHaveBeenCalled()
            expect(configuration.Tasks[3].WhenCompleted).not.toHaveBeenCalled()
        })
    })
})