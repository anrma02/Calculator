// Hàm để loại bỏ khoảng trắng và chuyển đổi "+-" thành "-"
const cleanExpression = (expression) => {
     return expression.replace(/\s+/g, '').replace(/\+\\-/g, '-');
};

// Hàm để kiểm tra xem một ký tự có phải là một số hay không
const isNumeric = (char) => {
     return !isNaN(char) || char === '.';
};

/**
 *
 *  @param {string} expression - Biểu thức cần phân tách
 * @returns {object} - Một object chứa mảng các số và mảng các toán tử
 */

// Hàm để phân tách biểu thức thành các số và toán tử

const parseExpression = (expression) => {
     const numbers = [];
     const operators = [];
     let currentNumber = '';

     for (let i = 0; i < expression.length; i++) {
          const char = expression[i];

          if (isNumeric(char) || (char === '-' && (i === 0 || isNaN(expression[i - 1])))) {
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

     return { numbers, operators };
};

/**
 *
 * @param {array} numbers - Mảng chứa các số
 * @param {array} operators - Mảng chứa các toán tử
 * @returns {number} - Kết quả của biểu thức
 * @throws {Error} - Nếu có lỗi trong quá trình tính toán
 *
 */

// Hàm để tính toán kết quả từ các số và toán tử
const computeResult = (numbers, operators) => {
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
                    result = parseFloat((result / nextNumber).toFixed(3));
                    break;
               default:
                    throw new Error('Unknown operator');
          }
     }

     return result;
};

/**
 * @param {string} expression - Biểu thức cần tính toán
 * @returns {string} - Kết quả của biểu thức
 */

export const calculate = (expression) => {
     expression = cleanExpression(expression);
     const { numbers, operators } = parseExpression(expression);
     const result = computeResult(numbers, operators);
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
