/// <reference path="CSyntax.ts" />
/// <reference path="GLSLCSyntaxBase.ts" />

function GLSLBinaryPattern(operator: TypedBinary, operatorType: GLSLOperatorType, resultOperators: [GLSLBinary, GLSLBinary, GLSLBinary, GLSLBinary]): CSyntaxPattern<GLSLUnary, GLSLBinary, GLSLFunction>[] {
    const output: CSyntaxPattern<GLSLUnary, GLSLBinary, GLSLFunction>[] = [{
        Type: "Binary",
        Operator: resultOperators[0],
        Pattern: [{
            Type: "Binary",
            Operator: operator,
            Left: operatorType.ParameterFromName("Left"),
            Right: operatorType.ParameterFromName(`Right`)
        }],
        ResultLeft: [operatorType.ParameterFromName("Left")],
        ResultRight: [operatorType.ParameterFromName("Right")]
    }]

    for (let i = 1; i < 4; i++) {
        const allSame: CSyntaxPattern<GLSLUnary, GLSLBinary, GLSLFunction> = {
            Type: "Custom",
            Pattern: [],
            Convert(match) {
                const left = MatchCSyntax([match["Left"]], GLSLCSyntax)
                if (!left) return undefined
                const right = MatchCSyntax([match["Right"]], GLSLCSyntax)
                if (!right) return undefined
                return {
                    Type: "Function",
                    Function: operatorType.ConstructorFunctions[i - 1],
                    Arguments: [{
                        Type: "Binary",
                        Operator: resultOperators[0],
                        Left: left,
                        Right: right
                    }]
                }
            }
        }

        for (let j = 0; j <= i; j++) {
            allSame.Pattern.push({
                Type: "Binary",
                Operator: operator,
                Left: operatorType.ParameterFromName("Left"),
                Right: operatorType.ParameterFromName("Right")
            })
        }

        output.push(allSame)

        if (!BinaryReversible[operator]) {
            const allLeftSame: CSyntaxPattern<GLSLUnary, GLSLBinary, GLSLFunction> = {
                Type: "Binary",
                Operator: resultOperators[i],
                Pattern: [],
                ResultLeft: [operatorType.ParameterFromName("Left")],
                ResultRight: []
            }

            for (let j = 0; j <= i; j++) {
                allLeftSame.Pattern.push({
                    Type: "Binary",
                    Operator: operator,
                    Left: operatorType.ParameterFromName("Left"),
                    Right: operatorType.ParameterFromName(`Right ${"XYZW".charAt(j)}`)
                })

                allLeftSame.ResultRight.push(operatorType.ParameterFromName(`Right ${"XYZW".charAt(j)}`))
            }

            output.push(allLeftSame)
        }

        const allRightSame: CSyntaxPattern<GLSLUnary, GLSLBinary, GLSLFunction> = {
            Type: "Binary",
            Operator: resultOperators[i],
            Pattern: [],
            ResultLeft: [],
            ResultRight: [operatorType.ParameterFromName("Right")]
        }

        for (let j = 0; j <= i; j++) {
            allRightSame.Pattern.push({
                Type: "Binary",
                Operator: operator,
                Left: operatorType.ParameterFromName(`Left ${"XYZW".charAt(j)}`),
                Right: operatorType.ParameterFromName("Right")
            })

            allRightSame.ResultLeft.push(operatorType.ParameterFromName(`Left ${"XYZW".charAt(j)}`))
        }

        output.push(allRightSame)

        const allDifferent: CSyntaxPattern<GLSLUnary, GLSLBinary, GLSLFunction> = {
            Type: "Binary",
            Operator: resultOperators[i],
            Pattern: [],
            ResultLeft: [],
            ResultRight: []
        }

        for (let j = 0; j <= i; j++) {
            allDifferent.Pattern.push({
                Type: "Binary",
                Operator: operator,
                Left: operatorType.ParameterFromName(`Left ${"XYZW".charAt(j)}`),
                Right: operatorType.ParameterFromName(`Right ${"XYZW".charAt(j)}`)
            })

            allDifferent.ResultLeft.push(operatorType.ParameterFromName(`Left ${"XYZW".charAt(j)}`))
            allDifferent.ResultRight.push(operatorType.ParameterFromName(`Right ${"XYZW".charAt(j)}`))
        }

        output.push(allDifferent)
    }
    return output
}

const GLSLBinaryPatterns: CSyntaxPattern<GLSLUnary, GLSLBinary, GLSLFunction>[] = GLSLBinaryPattern("AddInteger", IntegerGLSLOperatorType, ["AddInt", "AddIVec2", "AddIVec3", "AddIVec4"])
    .concat(GLSLBinaryPattern("SubtractInteger", IntegerGLSLOperatorType, ["SubtractInt", "SubtractIVec2", "SubtractIVec3", "SubtractIVec4"]))
    .concat(GLSLBinaryPattern("MultiplyInteger", IntegerGLSLOperatorType, ["MultiplyInt", "MultiplyIVec2", "MultiplyIVec3", "MultiplyIVec4"]))
    .concat(GLSLBinaryPattern("AddFloat", FloatGLSLOperatorType, ["AddFloat", "AddVec2", "AddVec3", "AddVec4"]))
    .concat(GLSLBinaryPattern("SubtractFloat", FloatGLSLOperatorType, ["SubtractFloat", "SubtractVec2", "SubtractVec3", "SubtractVec4"]))
    .concat(GLSLBinaryPattern("MultiplyFloat", FloatGLSLOperatorType, ["MultiplyFloat", "MultiplyVec2", "MultiplyVec3", "MultiplyVec4"]))
    .concat(GLSLBinaryPattern("DivideFloat", FloatGLSLOperatorType, ["DivideFloat", "DivideVec2", "DivideVec3", "DivideVec4"]))