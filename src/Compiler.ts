/// <reference path="VerifiedExpression.ts" />

interface Compiler {
    Compile(program: VerifiedExpression): string
}