/// <reference path="Pattern.ts" />

type UnaryCSyntaxPattern<TUnary extends string> = {
    Type: "Unary",
    Operator: TUnary,
    Pattern: Pattern[],
    ResultOperand: Pattern[]
}

type BinaryCSyntaxPattern<TBinary extends string> = {
    Type: "Binary",
    Operator: TBinary,
    Pattern: Pattern[],
    ResultLeft: Pattern[],
    ResultRight: Pattern[]
}

type FunctionCSyntaxPattern<TFunction extends string> = {
    Type: "Function",
    Function: TFunction,
    Pattern: Pattern[],
    ResultArguments: Pattern[][]
}

type CSyntaxPattern<TUnary extends string, TBinary extends string, TFunction extends string> = UnaryCSyntaxPattern<TUnary> | BinaryCSyntaxPattern<TBinary> | FunctionCSyntaxPattern<TFunction>

type CSyntax<TUnary extends string, TBinary extends string, TFunction extends string> = {
    UnarySymbolsOrKeywords: {[operator in TUnary]: {}},
    BinarySymbolsOrKeywords: {[operator in TBinary]: {}},
    FunctionSymbolsOrKeywords: {[func in TFunction]: {}},
    Patterns: CSyntaxPattern<TUnary, TBinary, TFunction>[]
}

type BooleanCSyntaxMatch = {
    Type: "Boolean"
    Value: boolean
}

type IntegerCSyntaxMatch = {
    Type: "Integer"
    Value: number
}

type UnaryCSyntaxMatch<TUnary extends string, TBinary extends string, TFunction extends string> = {
    Type: "Unary"
    Operator: TUnary
    Operand: CSyntaxMatch<TUnary, TBinary, TFunction>
}

type BinaryCSyntaxMatch<TUnary extends string, TBinary extends string, TFunction extends string> = {
    Type: "Binary"
    Operator: TBinary
    Left: CSyntaxMatch<TUnary, TBinary, TFunction>
    Right: CSyntaxMatch<TUnary, TBinary, TFunction>
}

type FunctionCSyntaxMatch<TUnary extends string, TBinary extends string, TFunction extends string> = {
    Type: "Function"
    Function: TFunction
    Arguments: CSyntaxMatch<TUnary, TBinary, TFunction>[]
}

type CSyntaxMatch<TUnary extends string, TBinary extends string, TFunction extends string> = BooleanCSyntaxMatch | IntegerCSyntaxMatch | UnaryCSyntaxMatch<TUnary, TBinary, TFunction> | BinaryCSyntaxMatch<TUnary, TBinary, TFunction> | FunctionCSyntaxMatch<TUnary, TBinary, TFunction>