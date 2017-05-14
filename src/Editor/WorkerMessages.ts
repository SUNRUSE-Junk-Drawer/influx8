/// <reference path="../Compiler/Token.ts" />

type WorkerConfigurationRequest = {
    readonly Type: "Configuration"
    readonly WorkerUrls: string[]
}

type WorkerBuildRequest = {
    readonly Type: "Build"
    readonly Tokens: UnparenthesizedToken[]
    readonly BuildId: number
    readonly SourceLength: number
}

type WorkerResponse = {
    readonly BuildId: number
}