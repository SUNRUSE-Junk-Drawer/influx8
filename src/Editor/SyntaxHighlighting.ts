/// <reference path="../Compiler/Token.ts" />

type CommentToken = {
    Type: "Comment"
    StartIndex: number
    EndIndex: number
}

function AddSyntaxHighlightingRun(token: UnparenthesizedToken | CommentToken, parent: Element, source: string) {
    const run = document.createElement("span")
    run.textContent = source.slice(token.StartIndex, token.EndIndex + 1)
    run.setAttribute("SUNRUSEInfluxTokenType", token.Type)
    parent.appendChild(run)
}

function FillTokenGapsWithComments(tokens: UnparenthesizedToken[], source: string): (UnparenthesizedToken | CommentToken)[] {
    const output: (UnparenthesizedToken | CommentToken)[] = []
    let lastEndIndex = -1
    for (const token of tokens) {
        if (lastEndIndex != token.StartIndex - 1) output.push({
            Type: "Comment",
            StartIndex: lastEndIndex + 1,
            EndIndex: token.StartIndex - 1
        })
        lastEndIndex = token.EndIndex
        output.push(token)
    }
    if (lastEndIndex != source.length - 1) output.push({
        Type: "Comment",
        StartIndex: lastEndIndex + 1,
        EndIndex: source.length - 1
    })
    return output
}

function CreateEmptySyntaxHighlightingElement(): HTMLDivElement {
    const syntaxHighlighting = document.createElement("div")
    syntaxHighlighting.style.width = "100%"
    syntaxHighlighting.style.wordWrap = "break-word"
    syntaxHighlighting.style.whiteSpace = "pre-wrap"
    return syntaxHighlighting
}

function AddSyntaxHighlightingFooter(parent: Element) {
    // This exists because some browsers do not make space for the last line unless there is something on it, which makes the textarea scroll.
    const footer = document.createElement("div")
    footer.textContent = " "
    parent.appendChild(footer)
}

function CreateSyntaxHighlightingElement(tokens: UnparenthesizedToken[], source: string): HTMLDivElement {
    const element = CreateEmptySyntaxHighlightingElement()
    for (const token of FillTokenGapsWithComments(tokens, source)) AddSyntaxHighlightingRun(token, element, source)
    AddSyntaxHighlightingFooter(element)
    return element
}