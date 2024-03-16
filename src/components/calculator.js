/**
 * @param {string} expression - Biểu thức cần đánh giá
 * @returns {string} - Kết quả của biểu thức
 */

export const calculate = (expression) => {
     expression = expression.replace(/\s+/g, '');

     expression = expression.replace(/\+\\-/g, '-');

     if (expression[0] === '+') {
          expression = expression.slice(1);
     }
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

/**
 *
 * @param {string} displayValue - Giá trị hiển thị trên màn hình
 * @returns {string} - Kết quả của biểu thức
 */

export const checkConditions = (displayValue) => {
     const conditions = [
          { check: (value) => !value, result: 'Error' },
          { check: (value) => value.includes('/0'), result: 'Infinity' },
     ];

     for (let condition of conditions) {
          if (condition.check(displayValue)) {
               return condition.result;
          }
     }

     return null;
};
