/// <reference path="WorkerMessages.ts" />
/// <reference path="../Compiler/MatchCSyntax.ts" />
/// <reference path="../Compiler/GenerateCSyntax.ts" />
/// <reference path="../Compiler/GLSLCSyntax.ts" />

addEventListener("message", e => {
    const request = e.data as TaskRequest
    if (!request.Verified) {
        postMessage({ BuildId: request.BuildId, Data: undefined })
    } else {
        const matched = MatchCSyntax(request.Verified, GLSLCSyntax)
        if (!matched) {
            postMessage({ BuildId: request.BuildId, Data: undefined })
        } else {
            postMessage({ BuildId: request.BuildId, Data: GenerateCSyntax(matched, GLSLCSyntax) })
        }
    }
})