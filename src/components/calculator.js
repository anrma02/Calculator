export const calculate = (expression) => {
     expression = expression.replace(/\s+/g, '');

     const numbers = [];
     const operators = [];

     let currentNumber = '';
     for (let i = 0; i < expression.length; i++) {
          const char = expression[i];
          if (!isNaN(char) || char === '.') {
               currentNumber += char;
          } else {
               if (currentNumber) {
                    numbers.push(parseFloat(currentNumber));
                    currentNumber = '';
               }
               operators.push(char);
          }
     }

     if (currentNumber) {
          numbers.push(parseFloat(currentNumber));
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

     return result;
};
