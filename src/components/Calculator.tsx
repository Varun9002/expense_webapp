import { Delete } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

const buttons = [
    ["+", "7", "8", "9"],
    ["-", "4", "5", "6"],
    ["*", "1", "2", "3"],
    ["÷", "0", ".", "="],
];

export default function Calculator({
    value,
    setValue,
}: {
    value: number;
    setValue: React.Dispatch<React.SetStateAction<number>>;
}) {
    const [currentInput, setCurrentInput] = useState(value.toString());
    const [lastResult, setLastResult] = useState<number | "Error" | null>(null);
    const [pendingOperator, setPendingOperator] = useState<string | null>(null);
    const [isNewInput, setIsNewInput] = useState(false);

    const handleNumber = (num: string) => {
        if (isNewInput || currentInput === "0") {
            setCurrentInput(num);
            setIsNewInput(false);
        } else {
            setCurrentInput(currentInput + num);
        }
        const evaluated = evalExpression();
        if (evaluated !== "Error") setValue(evaluated);
    };

    const handleOperator = (operator: string) => {
        const evaluated = evalExpression();

        setLastResult(evaluated);
        if (evaluated !== "Error") setValue(evaluated);
        setPendingOperator(operator);
        setCurrentInput(evaluated.toString());
        setIsNewInput(true);
    };

    const evalExpression = () => {
        const lhs = lastResult !== null ? lastResult : parseFloat(currentInput);
        const rhs = parseFloat(currentInput);

        switch (pendingOperator) {
            case "+":
                return +lhs + +rhs;
            case "-":
                return +lhs - +rhs;
            case "×":
                return +lhs * +rhs;
            case "÷":
                return rhs !== 0 ? +lhs / +rhs : "Error";
            default:
                return lhs;
        }
    };

    const handleEquals = () => {
        const result = evalExpression();
        if (result !== "Error") setValue(result);
        setCurrentInput(result.toString());
        setLastResult(null);
        setPendingOperator(null);
        setIsNewInput(true);
    };

    const handleClear = () => {
        setCurrentInput("0");
        setLastResult(null);
        setPendingOperator(null);
        setIsNewInput(false);
    };

    const handleClick = (value: string) => {
        if (!isNaN(+value)) {
            handleNumber(value);
        } else if (value === ".") {
            if (!currentInput.includes(".")) {
                setCurrentInput(currentInput + ".");
            }
        } else if (value === "=") {
            handleEquals();
        } else {
            handleOperator(value);
        }
    };
    // const clearInput = () => {
    //     setInput(input.slice(0, -1));
    // };

    return (
        <div className="w-full p-4 bg-accent rounded-lg shadow-md text-accent-foreground">
            <div className="text-4xl! text-right mb-2 bg-background flex items-center">
                <span className="grow mr-1">{currentInput}</span>{" "}
                <Button
                    className="px-2! py-9!"
                    variant={"ghost"}
                    onClick={handleClear}>
                    <Delete className="size-8" />
                </Button>
            </div>
            <div className="grid grid-cols-4 gap-2">
                {buttons.flat().map((btn, index) => (
                    <button
                        key={index}
                        className="p-4 bg-background rounded text-xl font-bold"
                        onClick={() => {
                            handleClick(btn);
                        }}>
                        {btn}
                    </button>
                ))}
            </div>
        </div>
    );
}

// import { Button } from "@/components/ui/button";
// import { useState } from "react";

// export default function Calculator() {
//     const [display, setDisplay] = useState("0");
//     const [firstOperand, setFirstOperand] = useState({ isSet: false, num: 0 });
//     const [operator, setOperator] = useState("");
//     const [waitingForSecondOperand, setWaitingForSecondOperand] =
//         useState(false);

//     const inputDigit = (digit: number) => {
//         if (waitingForSecondOperand) {
//             setDisplay(String(digit));
//             setWaitingForSecondOperand(false);
//         } else {
//             setDisplay(display === "0" ? String(digit) : display + digit);
//         }
//     };

//     const inputDecimal = () => {
//         if (!display.includes(".")) {
//             setDisplay(display + ".");
//         }
//     };

//     const clear = () => {
//         setDisplay("0");
//         setFirstOperand({ isSet: false, num: 0 });
//         setOperator("");
//         setWaitingForSecondOperand(false);
//     };

//     const performOperation = (nextOperator: string) => {
//         const inputValue = parseFloat(display);

//         if (!firstOperand.isSet) {
//             setFirstOperand({ isSet: true, num: inputValue });
//         } else if (operator != "" && nextOperator === "=") {
//             const result = calculate(firstOperand.num, inputValue, operator);
//             setDisplay(String(result));
//             setFirstOperand({ isSet: true, num: result });
//         }

//         setWaitingForSecondOperand(true);
//         setOperator(nextOperator);
//     };

//     const calculate = (
//         firstOperand: number,
//         secondOperand: number,
//         operator: string
//     ) => {
//         switch (operator) {
//             case "+":
//                 return firstOperand + secondOperand;
//             case "-":
//                 return firstOperand - secondOperand;
//             case "*":
//                 return firstOperand * secondOperand;
//             case "/":
//                 return firstOperand / secondOperand;
//             default:
//                 return secondOperand;
//         }
//     };

//     return (
//         <div className="w-64 mx-auto mt-10 bg-gray-100 rounded-lg shadow-lg p-4">
//             <div className="bg-white h-16 mb-4 flex items-center justify-end px-4 text-3xl font-bold rounded">
//                 {display}
//             </div>
//             <div className="grid grid-cols-4 gap-2">
//                 <Button onClick={() => inputDigit(7)}>7</Button>
//                 <Button onClick={() => inputDigit(8)}>8</Button>
//                 <Button onClick={() => inputDigit(9)}>9</Button>
//                 <Button onClick={() => performOperation("/")}>/</Button>
//                 <Button onClick={() => inputDigit(4)}>4</Button>
//                 <Button onClick={() => inputDigit(5)}>5</Button>
//                 <Button onClick={() => inputDigit(6)}>6</Button>
//                 <Button onClick={() => performOperation("*")}>*</Button>
//                 <Button onClick={() => inputDigit(1)}>1</Button>
//                 <Button onClick={() => inputDigit(2)}>2</Button>
//                 <Button onClick={() => inputDigit(3)}>3</Button>
//                 <Button onClick={() => performOperation("-")}>-</Button>
//                 <Button onClick={() => inputDigit(0)}>0</Button>
//                 <Button onClick={inputDecimal}>.</Button>
//                 <Button onClick={() => performOperation("=")}>=</Button>
//                 <Button onClick={() => performOperation("+")}>+</Button>
//                 <Button onClick={clear} className="col-span-4">
//                     Clear
//                 </Button>
//             </div>
//         </div>
//     );
// }
