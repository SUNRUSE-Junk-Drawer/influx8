/// <reference path="CSyntax.ts" />
/// <reference path="GLSLCSyntaxBase.ts" />

function GLSLBinaryPattern(operator: TypedBinary, parameterFactory: (name: string) => Pattern, resultOperators: [GLSLBinary, GLSLBinary, GLSLBinary, GLSLBinary]): CSyntaxPattern<GLSLUnary, GLSLBinary, GLSLFunction>[] {
    const output: CSyntaxPattern<GLSLUnary, GLSLBinary, GLSLFunction>[] = [{
        Type: "Binary",
        Operator: resultOperators[0],
        Pattern: [{
            Type: "Binary",
            Operator: operator,
            Left: parameterFactory("Left"),
            Right: parameterFactory(`Right`)
        }],
        ResultLeft: [parameterFactory("Left")],
        ResultRight: [parameterFactory("Right")]
    }]

    for (let i = 1; i < 4; i++) {
        if (!BinaryReversible[operator]) {
            const allLeftSame: CSyntaxPattern<GLSLUnary, GLSLBinary, GLSLFunction> = {
                Type: "Binary",
                Operator: resultOperators[i],
                Pattern: [],
                ResultLeft: [parameterFactory("Left")],
                ResultRight: []
            }

            for (let j = 0; j <= i; j++) {
                allLeftSame.Pattern.push({
                    Type: "Binary",
                    Operator: operator,
                    Left: parameterFactory("Left"),
                    Right: parameterFactory(`Right ${"XYZW".charAt(j)}`)
                })

                allLeftSame.ResultRight.push(parameterFactory(`Right ${"XYZW".charAt(j)}`))
            }

            output.push(allLeftSame)
        }

        const allRightSame: CSyntaxPattern<GLSLUnary, GLSLBinary, GLSLFunction> = {
            Type: "Binary",
            Operator: resultOperators[i],
            Pattern: [],
            ResultLeft: [],
            ResultRight: [parameterFactory("Right")]
        }

        for (let j = 0; j <= i; j++) {
            allRightSame.Pattern.push({
                Type: "Binary",
                Operator: operator,
                Left: parameterFactory(`Left ${"XYZW".charAt(j)}`),
                Right: parameterFactory("Right")
            })

            allRightSame.ResultLeft.push(parameterFactory(`Left ${"XYZW".charAt(j)}`))
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
                Left: parameterFactory(`Left ${"XYZW".charAt(j)}`),
                Right: parameterFactory(`Right ${"XYZW".charAt(j)}`)
            })

            allDifferent.ResultLeft.push(parameterFactory(`Left ${"XYZW".charAt(j)}`))
            allDifferent.ResultRight.push(parameterFactory(`Right ${"XYZW".charAt(j)}`))
        }

        output.push(allDifferent)
    }
    return output
}

function IntegerParameterFactory(name: string): AnyIntegerPattern {
    return {
        Type: "AnyInteger",
        Name: name
    }
}

function FloatParameterFactory(name: string): AnyFloatPattern {
    return {
        Type: "AnyFloat",
        Name: name
    }
}

const GLSLBinaryPatterns: CSyntaxPattern<GLSLUnary, GLSLBinary, GLSLFunction>[] = GLSLBinaryPattern("AddInteger", IntegerParameterFactory, ["AddInt", "AddIVec2", "AddIVec3", "AddIVec4"])
    .concat(GLSLBinaryPattern("SubtractInteger", IntegerParameterFactory, ["SubtractInt", "SubtractIVec2", "SubtractIVec3", "SubtractIVec4"]))
    .concat(GLSLBinaryPattern("MultiplyInteger", IntegerParameterFactory, ["MultiplyInt", "MultiplyIVec2", "MultiplyIVec3", "MultiplyIVec4"]))
    .concat(GLSLBinaryPattern("AddFloat", FloatParameterFactory, ["AddFloat", "AddVec2", "AddVec3", "AddVec4"]))
    .concat(GLSLBinaryPattern("SubtractFloat", FloatParameterFactory, ["SubtractFloat", "SubtractVec2", "SubtractVec3", "SubtractVec4"]))
    .concat(GLSLBinaryPattern("MultiplyFloat", FloatParameterFactory, ["MultiplyFloat", "MultiplyVec2", "MultiplyVec3", "MultiplyVec4"]))
    .concat(GLSLBinaryPattern("DivideFloat", FloatParameterFactory, ["DivideFloat", "DivideVec2", "DivideVec3", "DivideVec4"]))