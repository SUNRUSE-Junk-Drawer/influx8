/// <reference path="../Compiler/ParseUntypedTokens.ts" />
/// <reference path="../Compiler/ParseTokens.ts" />
/// <reference path="WorkerMessages.ts" />

type Build = {
    readonly Id: number
    readonly EditorElement: Element
    readonly SyntaxHighlightingElement: Element
}

function EndBuild(build: Build) {
    build.EditorElement.removeChild(build.SyntaxHighlightingElement)
}

function ParseToTokens(source: string): UnparenthesizedToken[] {
    const allTypedTokens: UnparenthesizedToken[] = []
    for (const untyped of ParseUntypedTokens(source)) for (const typed of ParseTokens(untyped)) allTypedTokens.push(typed)
    return allTypedTokens
}

function StartBuild(editorElement: Element, source: string, textAreaWrappingElement: Element, throttle: Function, worker: Worker, buildId: number): Build {
    const allTypedTokens: UnparenthesizedToken[] = ParseToTokens(source)
    const syntaxHighlightingElement = CreateSyntaxHighlightingElement(allTypedTokens, source)
    editorElement.insertBefore(syntaxHighlightingElement, textAreaWrappingElement)
    const request: WorkerBuildRequest = {
        Type: "Build",
        Tokens: allTypedTokens,
        BuildId: buildId,
        SourceLength: source.length
    }
    throttle(() => worker.postMessage(request))
    return {
        Id: buildId,
        EditorElement: editorElement,
        SyntaxHighlightingElement: syntaxHighlightingElement
    }
}

function UpdateBuild(build: Build, response: TaskCompletedWorkerResponse): void {
    // TODO
}