/**
 * Func để xóa khoảng trắng và chuẩn hóa biểu thức
 * @param {string} expression - Biểu thức cần chuẩn hóa
 * @returns {string} - Biểu thức sau khi chuẩn hóa
 */
const cleanExpression = (expression) => {
     return expression.replace(/\s+/g, '').replace(/\+\\-/g, '-');
};

/**
 * Func để kiểm tra xem ký tự có phải là số hay không
 * @param {string} char - Ký tự cần kiểm tra
 * @returns {boolean} - Kết quả kiểm tra
 */
const isNumeric = (char) => {
     return !isNaN(char) || char === '.';
};

/**
 * Func để phân tách biểu thức thành các số và toán tử
 *  @param {string} expression - Biểu thức cần phân tách
 * @returns {object} - Một object chứa mảng các số và mảng các toán tử
 */
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
 *  Func cộng 2 số
 * @param {number[]} numbers - Mảng chứa các số
 * @param {string[]} operators - Mảng chứa các toán tử
 * @returns {number} - Kết quả của biểu thức
 */
const add = (a, b) => a + b;

/**
 * Func trừ 2 số.
 * @param {number} a - Số bị trừ.
 * @param {number} b - Số trừ đi.
 * @returns {number} - Hiệu của a và b.
 */
const subtract = (a, b) => a - b;

/**
 * Func nhân 2 số.
 * @param {number} a - Số thứ nhất.
 * @param {number} b - Số thứ hai.
 * @returns {number} - Tích của a và b.
 */
const multiply = (a, b) => a * b;

/**
 * Func chia 2 số.
 * @param {number} a - Số bị chia.
 * @param {number} b - Số chia.
 * @returns {number} - Thương của a và b.
 * @throws {Error} Nếu b là 0.
 */
const divide = (a, b) => {
     if (b === 0) {
          throw new Error('Divide by zero error');
     }
     return parseFloat((a / b).toFixed(3));
};

/**
 * Một object chứa các Func tính toán
 * @type {object} - Một object chứa các Func tính toán
 * @property {function} add - Func cộng 2 số
 * @property {function} subtract - Func trừ 2 số
 * @property {function} multiply - Func nhân 2 số
 * @property {function} divide - Func chia 2 số
 */
const operations = {
     '+': add,
     '-': subtract,
     '*': multiply,
     '/': divide,
};

/**
 * Func để tính toán kết quả của biểu thức
 * @param {number[]} numbers - Mảng chứa các số
 * @param {string[]} operators - Mảng chứa các toán tử
 * @returns {number} - Kết quả của biểu thức
 * @throws {Error} Nếu có toán tử không hợp lệ
 */

const computeResult = (numbers, operators) => {
     let result = numbers[0];
     for (let i = 0; i < operators.length; i++) {
          const operator = operators[i];
          const nextNumber = numbers[i + 1];
          if (!operations[operator]) {
               throw new Error('Unknown operator');
          }
          result = operations[operator](result, nextNumber);
     }
     return result;
};

/**
 * Func để tính toán kết quả của biểu thức
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
 * Func để kiểm tra các điều kiện đặc biệt của biểu thức
 *  @param {string} displayValue - Giá trị hiển thị trên màn hình
 *  @returns {string} - Kết quả của biểu thức
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
