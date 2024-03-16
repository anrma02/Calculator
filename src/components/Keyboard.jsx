import { LuDelete } from "react-icons/lu";

import { useState } from "react";
import { calculate, checkConditions } from "./calculator";

const Keyboard = () => {
     const [displayValue, setDisplayValue] = useState("");

     const handleButtonClick = (num) => {
          setDisplayValue(displayValue.concat(num.target?.name || num));

          console.log(num);
     };

     // Function xử lý toán tử + - * /

     const handleOperatorButtonClick = (operator) => {
          console.log("🚀 ~ handleOperatorButtonClick ~ operator:", operator);
          const lastCharIsOperator = displayValue.slice(-1).match(/[+\-*/]/);
          setDisplayValue(prevValue => lastCharIsOperator ? prevValue.slice(0, -1) + operator : prevValue + operator);
          const test = /[+\-*/]/.test(displayValue);
          console.log("🚀 ~ handleOperatorButtonClick ~ test", test);
     };


     const handleClearButtonClick = () => {
          setDisplayValue('');

     };


     // Function handle xoa 1 ki tu
     const handleDeleteButtonClick = () => {
          if (displayValue === 'Error') {
               setDisplayValue('');
          } else {
               setDisplayValue(prevValue => prevValue.slice(0, -1));
          }

     };


     // Function xử lý khi bấm dấu bằng
     const handleEqualButtonClick = () => {
          const errorResult = checkConditions(displayValue) || '';
          const calculateResult = errorResult || calculate(displayValue);
          setDisplayValue(calculateResult);
     };


     return (
          <>
               <div className="bg-[#f1f1f1] h-[80px] overflow-hidden relative">
                    <div className="text-[30px] absolute bottom-[-20px] right-0 p-2 font-black" id="display">
                         <span className="inline-block max-w-full truncate">{displayValue || "0"}</span>
                    </div>
               </div>

               <div className=" bg-white h-6 mb-3 "></div>
               <div className="flex ">
                    <div className="grid grid-cols-3 grid-rows-5 gap-1  text-[#6d6d6d] ">
                         {[7, 8, 9, 4, 5, 6, 1, 2, 3].map((num) => (
                              <button
                                   key={num}
                                   className={`bg-white p-3 rounded text-xl `}
                                   onClick={() => handleButtonClick(num)}

                              >
                                   {num}
                              </button>
                         ))}
                         <button className={`bg-[#efefeff3] p-3 rounded w-[80px] text-xl  `} onClick={handleClearButtonClick}>C</button>
                         <button className={`bg-white p-3 rounded w-[80px] text-xl  `} name="0" onClick={() => handleButtonClick(0)}>0</button>
                         <button className={`bg-[#efefeff3] p-3 rounded w-[80px] text-xl `} name="+" onClick={() => handleOperatorButtonClick('+')}>+</button>
                    </div>
                    <div className="grid grid-rows-5 gap-1 ml-2 text-[#676767] ">
                         <button className={`bg-[#efefeff3] p-3 rounded w-[80px] flex justify-center items-center text-xl `} onClick={handleDeleteButtonClick}>
                              <LuDelete />
                         </button>
                         <button className={`bg-[#efefeff3] p-3 rounded w-[80px] text-2xl `} name="/" onClick={() => handleOperatorButtonClick('/')} >÷</button>
                         <button className={`bg-[#efefeff3] p-3 rounded w-[80px] text-2xl `} name="*" onClick={() => handleOperatorButtonClick("*")} >x</button>
                         <button className={`bg-[#efefeff3] p-3 rounded w-[80px] flex justify-center items-center text-xl `} name="-" onClick={() => handleOperatorButtonClick('-')} >
                              -
                         </button>
                         <button className={`bg-blue-800 p-3 rounded text-xl text-white `} onClick={handleEqualButtonClick}>=</button>
                    </div>
               </div>
          </>
     );
}

export default Keyboard;
