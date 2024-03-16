export const calculate = (expression) => {
     expression = expression.replace(/\s+/g, '');

     const numbers = [];
     const operators = [];

     let currentNumber = '';
     for (let i = 0; i < expression.length; i++) {
          const char = expression[i];
          if (
               !isNaN(char) ||
               char === '.' ||
               (char === '-' && (i === 0 || isNaN(expression[i - 1])))
          ) {
               currentNumber += char;
          } else {
               if (currentNumber) {
                    numbers.push(parseFloat(currentNumber));
                    currentNumber = '';
               } else {
                    throw new Error('Invalid expression');
               }
               operators.push(char);
          }
     }

     if (currentNumber) {
          numbers.push(parseFloat(currentNumber));
     } else {
          throw new Error('Invalid expression');
     }

     let result = numbers[0];
     for (let i = 0; i < operators.length; i++) {
          const operator = operators[i];
          const nextNumber = numbers[i + 1];
          switch (operator) {
               case '+':
                    result += nextNumber;
                    break;
               case '-':
                    result -= nextNumber;
                    break;
               case '*':
                    result *= nextNumber;
                    break;
               case '/':
                    if (nextNumber === 0) {
                         throw new Error('Divide by zero error');
                    }
                    result /= nextNumber;
                    break;
               default:
                    throw new Error('Unknown operator');
          }
     }
     const formattedResult = String(result).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1 ');

     return formattedResult;
};
