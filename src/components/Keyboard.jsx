import { LuDelete } from "react-icons/lu";
import { FiMinus } from "react-icons/fi";
import { useState } from "react";

const Keyboard = () => {
     const [displayValue, setDisplayValue] = useState('');

     const handleButtonClick = (num) => {
          setDisplayValue(displayValue.concat(num.target?.name || num));
          console.log(num);
     };
     const handleClearButtonClick = () => {
          setDisplayValue('');

     };

     const handleDeleteButtonClick = () => {
          if (displayValue === 'Error') {
               setDisplayValue('');
          } else {
               setDisplayValue(prevValue => prevValue.slice(0, -1));
          }
     };

     const handleEqualButtonClick = () => {
          if (!displayValue) {
               setDisplayValue('Error');
               return;
          }
          if (displayValue.includes('/0')) {
               setDisplayValue('Error: Divide by zero');
               return;
          }
          try {
               let result = eval(displayValue);
               if (displayValue.includes('/')) {
                    result = parseFloat(result.toFixed(4));
               }
               setDisplayValue(result.toString());
          } catch (error) {
               setDisplayValue('Error');
          }
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
                                   className="bg-white p-3 rounded text-xl"
                                   onClick={() => handleButtonClick(num)}
                              >
                                   {num}
                              </button>
                         ))}
                         <button className="bg-[#efefeff3] p-3 rounded w-[80px] text-xl" onClick={handleClearButtonClick}>C</button>
                         <button className="bg-white p-3 rounded w-[80px] text-xl" name="0" onClick={() => handleButtonClick(0)}>0</button>
                         <button className="bg-[#efefeff3] p-3 rounded w-[80px] text-xl" name="+" onClick={handleButtonClick}>+</button>
                    </div>
                    <div className="grid grid-rows-5 gap-1 ml-2 text-[#676767] ">
                         <button className="bg-[#efefeff3] p-3 rounded w-[80px] flex justify-center items-center text-xl" onClick={handleDeleteButtonClick}>
                              <LuDelete />
                         </button>
                         <button className="bg-[#efefeff3] p-3 rounded w-[80px] text-2xl" name="/" onClick={handleButtonClick} >÷</button>
                         <button className="bg-[#efefeff3] p-3 rounded w-[80px] text-2xl" name="*" onClick={handleButtonClick} >x</button>
                         <button className="bg-[#efefeff3] p-3 rounded w-[80px] flex justify-center items-center text-xl" name="-" onClick={handleButtonClick} >
                              <FiMinus />
                         </button>
                         <button className="bg-blue-800 p-3 rounded text-xl text-white" onClick={handleEqualButtonClick}>=</button>
                    </div>
               </div>
          </>
     );
}

export default Keyboard;
