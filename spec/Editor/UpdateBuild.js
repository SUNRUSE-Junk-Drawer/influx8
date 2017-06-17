describe("UpdateBuild", () => {
    global.window = {}
    const Namespace = require("rewire")("../../Editor.js")
    delete global.window
    const UpdateBuild = Namespace.__get__("UpdateBuild")

    let configuration
    beforeEach(() => {
        configuration = {
            WhenBuildProgresses: jasmine.createSpy("WhenBuildProgresses"),
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

    describe("when a progress update is received for another build", () => {
        let build

        beforeEach(() => {
            build = {
                Id: "test correct build id",
                Progress: 5,
                Misc: "test misc"
            }

            UpdateBuild(configuration, build, {
                Type: "Progress",
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

        it("does not report build progress", () => expect(configuration.WhenBuildProgresses).not.toHaveBeenCalled())

        it("does not modify the build", () => expect(build).toEqual({
            Id: "test correct build id",
            Progress: 5,
            Misc: "test misc"
        }))
    })

    describe("when a progress update is received for the correct build", () => {
        let build

        beforeEach(() => {
            build = {
                Id: "test correct build id",
                Progress: 5,
                Misc: "test misc"
            }

            UpdateBuild(configuration, build, {
                Type: "Progress",
                Stage: "test stage",
                BuildId: "test correct build id",
            })
        })

        it("reports build progress once", () => expect(configuration.WhenBuildProgresses.calls.count()).toEqual(1))
        it("reports build progress", () => expect(configuration.WhenBuildProgresses).toHaveBeenCalledWith("test stage", 6, 12))

        it("does not execute a completion callback", () => {
            expect(configuration.Tasks[0].WhenCompleted).not.toHaveBeenCalled()
            expect(configuration.Tasks[1].WhenCompleted).not.toHaveBeenCalled()
            expect(configuration.Tasks[2].WhenCompleted).not.toHaveBeenCalled()
            expect(configuration.Tasks[3].WhenCompleted).not.toHaveBeenCalled()
        })

        it("increments the build progress", () => expect(build.Progress).toEqual(6))

        it("does not modify other aspects of the build", () => {
            expect(build.Id).toEqual("test correct build id")
            expect(build.Misc).toEqual("test misc")
        })
    })

    describe("when the final task for another build completes", () => {
        let build

        beforeEach(() => {
            build = {
                Id: "test correct build id",
                Progress: 11,
                Misc: "test misc"
            }

            UpdateBuild(configuration, build, {
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

        it("does not report build progress", () => expect(configuration.WhenBuildProgresses).not.toHaveBeenCalled())

        it("does not modify the build", () => expect(build).toEqual({
            Id: "test correct build id",
            Progress: 11,
            Misc: "test misc"
        }))
    })

    describe("when the final task for the correct build completes", () => {
        let build

        beforeEach(() => {
            build = {
                Id: "test correct build id",
                Progress: 11,
                Misc: "test misc"
            }

            UpdateBuild(configuration, build, {
                Type: "TaskCompleted",
                TaskIndex: 2,
                BuildId: "test correct build id",
                Data: "test data"
            })
        })

        it("executes the correct completion callback once", () => expect(configuration.Tasks[2].WhenCompleted.calls.count()).toEqual(1))
        it("executes the correct completion callback with the data", () => expect(configuration.Tasks[2].WhenCompleted).toHaveBeenCalledWith("test data"))

        it("reports build progress once", () => expect(configuration.WhenBuildProgresses.calls.count()).toEqual(1))
        it("reports build progress", () => expect(configuration.WhenBuildProgresses).toHaveBeenCalledWith("Done", 12, 12))

        it("does not execute any other completion callbacks", () => {
            expect(configuration.Tasks[0].WhenCompleted).not.toHaveBeenCalled()
            expect(configuration.Tasks[1].WhenCompleted).not.toHaveBeenCalled()
            expect(configuration.Tasks[3].WhenCompleted).not.toHaveBeenCalled()
        })

        it("increments the build progress", () => expect(build.Progress).toEqual(12))

        it("does not modify other aspects of the build", () => {
            expect(build.Id).toEqual("test correct build id")
            expect(build.Misc).toEqual("test misc")
        })
    })

    describe("when a task for another build completes", () => {
        let build

        beforeEach(() => {
            build = {
                Id: "test correct build id",
                Progress: 10,
                Misc: "test misc"
            }

            UpdateBuild(configuration, build, {
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

        it("does not report build progress", () => expect(configuration.WhenBuildProgresses).not.toHaveBeenCalled())

        it("does not modify the build", () => expect(build).toEqual({
            Id: "test correct build id",
            Progress: 10,
            Misc: "test misc"
        }))
    })

    describe("when a task for the correct build completes", () => {
        let build

        beforeEach(() => {
            build = {
                Id: "test correct build id",
                Progress: 10,
                Misc: "test misc"
            }

            UpdateBuild(configuration, build, {
                Type: "TaskCompleted",
                TaskIndex: 2,
                BuildId: "test correct build id",
                Data: "test data"
            })
        })

        it("executes the correct completion callback once", () => expect(configuration.Tasks[2].WhenCompleted.calls.count()).toEqual(1))
        it("executes the correct completion callback with the data", () => expect(configuration.Tasks[2].WhenCompleted).toHaveBeenCalledWith("test data"))

        it("reports build progress once", () => expect(configuration.WhenBuildProgresses.calls.count()).toEqual(1))
        it("reports build progress", () => expect(configuration.WhenBuildProgresses).toHaveBeenCalledWith("RunningTasks", 11, 12))

        it("does not execute any other completion callbacks", () => {
            expect(configuration.Tasks[0].WhenCompleted).not.toHaveBeenCalled()
            expect(configuration.Tasks[1].WhenCompleted).not.toHaveBeenCalled()
            expect(configuration.Tasks[3].WhenCompleted).not.toHaveBeenCalled()
        })

        it("increments the build progress", () => expect(build.Progress).toEqual(11))

        it("does not modify other aspects of the build", () => {
            expect(build.Id).toEqual("test correct build id")
            expect(build.Misc).toEqual("test misc")
        })
    })
})