/// <reference path="../Compiler/ParseUntypedTokens.ts" />
/// <reference path="../Compiler/ParseTokens.ts" />

type Build = {
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

function StartBuild(editorElement: Element, source: string, textAreaWrappingElement: Element, throttle: Function): Build {
    const allTypedTokens: UnparenthesizedToken[] = ParseToTokens(source)
    const syntaxHighlightingElement = CreateSyntaxHighlightingElement(allTypedTokens, source)
    editorElement.insertBefore(syntaxHighlightingElement, textAreaWrappingElement)
    return {
        EditorElement: editorElement,
        SyntaxHighlightingElement: syntaxHighlightingElement
    }
}