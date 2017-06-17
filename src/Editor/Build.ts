/// <reference path="../Compiler/ParseUntypedTokens.ts" />
/// <reference path="../Compiler/ParseTokens.ts" />
/// <reference path="WorkerMessages.ts" />

type Build = {
    readonly Id: number
    readonly EditorElement: Element
    readonly SyntaxHighlightingElement: Element
    Progress: number
}

function EndBuild(build: Build) {
    build.EditorElement.removeChild(build.SyntaxHighlightingElement)
}

function ParseToTokens(source: string): UnparenthesizedToken[] {
    const allTypedTokens: UnparenthesizedToken[] = []
    for (const untyped of ParseUntypedTokens(source)) for (const typed of ParseTokens(untyped)) allTypedTokens.push(typed)
    return allTypedTokens
}

function StartBuild(editorElement: Element, source: string, textAreaWrappingElement: Element, throttle: Function, worker: Worker, buildId: number, configuration: Configuration): Build {
    const allTypedTokens: UnparenthesizedToken[] = ParseToTokens(source)
    const syntaxHighlightingElement = CreateSyntaxHighlightingElement(allTypedTokens, source)
    editorElement.insertBefore(syntaxHighlightingElement, textAreaWrappingElement)
    const request: WorkerBuildRequest = {
        Type: "Build",
        Tokens: allTypedTokens,
        BuildId: buildId,
        SourceLength: source.length
    }
    const build: Build = {
        Id: buildId,
        EditorElement: editorElement,
        SyntaxHighlightingElement: syntaxHighlightingElement,
        Progress: 0
    }
    configuration.WhenBuildProgresses("Waiting", 0, 8 + configuration.Tasks.length)
    throttle(() => {
        build.Progress++
        configuration.WhenBuildProgresses("Starting", 1, 8 + configuration.Tasks.length)
        worker.postMessage(request)
    })
    return build
}

function UpdateBuild(configuration: Configuration, build: Build, response: TaskCompletedWorkerResponse | ProgressWorkerResponse): void {
    if (build.Id != response.BuildId) return
    build.Progress++
    switch (response.Type) {
        case "TaskCompleted":
            configuration.Tasks[response.TaskIndex].WhenCompleted(response.Data)
            configuration.WhenBuildProgresses(build.Progress == 8 + configuration.Tasks.length ? "Done" : "RunningTasks", build.Progress, 8 + configuration.Tasks.length)
            break
        case "Progress":
            configuration.WhenBuildProgresses(response.Stage, build.Progress, 8 + configuration.Tasks.length)
            break
    }
}