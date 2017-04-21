/// <reference path="CSyntax.ts" />
/// <reference path="GLSLCSyntaxBase.ts" />

function GLSLUnaryPattern(operator: TypedUnary, operatorType: GLSLOperatorType, resultOperators: [GLSLUnary, GLSLUnary, GLSLUnary, GLSLUnary]): CSyntaxPattern<GLSLUnary, GLSLBinary, GLSLFunction>[] {
    const output: CSyntaxPattern<GLSLUnary, GLSLBinary, GLSLFunction>[] = []

    for (let i = 1; i < 4; i++) {
        const allSame: CSyntaxPattern<GLSLUnary, GLSLBinary, GLSLFunction> = {
            Type: "Custom",
            Pattern: [],
            Convert(match) {
                const operand = MatchCSyntax([match["Operand"]], GLSLCSyntax)
                if (!operand) return undefined
                return {
                    Type: "Function",
                    Function: operatorType.ConstructorFunctions[i - 1],
                    Arguments: [{
                        Type: "Unary",
                        Operator: resultOperators[0],
                        Operand: operand
                    }]
                }
            }
        }

        for (let j = 0; j <= i; j++) {
            allSame.Pattern.push({
                Type: "Unary",
                Operator: operator,
                Operand: operatorType.ParameterFromName("Operand"),
            })
        }

        output.push(allSame)
    }

    for (let i = 0; i < 4; i++) {
        const allDifferent: CSyntaxPattern<GLSLUnary, GLSLBinary, GLSLFunction> = {
            Type: "Unary",
            Operator: resultOperators[i],
            Pattern: [],
            ResultOperand: []
        }

        for (let j = 0; j <= i; j++) {
            allDifferent.Pattern.push({
                Type: "Unary",
                Operator: operator,
                Operand: operatorType.ParameterFromName("XYZW".charAt(j))
            })

            allDifferent.ResultOperand.push(operatorType.ParameterFromName("XYZW".charAt(j)))
        }

        output.push(allDifferent)
    }
    return output
}

const GLSLUnaryPatterns: CSyntaxPattern<GLSLUnary, GLSLBinary, GLSLFunction>[] = GLSLUnaryPattern("NegateInteger", IntegerGLSLOperatorType, ["NegateInt", "NegateIVec2", "NegateIVec3", "NegateIVec4"])
    .concat(GLSLUnaryPattern("NegateFloat", FloatGLSLOperatorType, ["NegateFloat", "NegateVec2", "NegateVec3", "NegateVec4"]))