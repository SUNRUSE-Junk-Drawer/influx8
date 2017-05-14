/// <reference path="../Compiler/Token.ts" />

type WorkerRequest = {
    readonly Tokens: UnparenthesizedToken[]
    readonly BuildId: number
}

type WorkerResponse = {
    readonly BuildId: number
}