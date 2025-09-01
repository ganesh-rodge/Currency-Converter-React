import { useState } from "react";
import { InputBox } from "./components";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

export default function App(){

  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState('usd')
  const [to, setTo] = useState('inr')
  const [convertedAmount, setConvertedAmount] = useState(0) 

  const currencyInfo = useCurrencyInfo(from)
  const options = Object.keys(currencyInfo)

  const swap = () => {
  const temp = from;
  setFrom(to);
  setTo(temp);
  setAmount(convertedAmount);
  setConvertedAmount(amount);
};


  const convert = () =>{
    setConvertedAmount(amount * currencyInfo[to])
  }

  return(
    <>
      <div className="w-full h-screen flex justify-center items-center bg-cover bg-no-repeat "
      style={{backgroundImage: `url(https://images.pexels.com/photos/5746260/pexels-photo-5746260.jpeg)`}}> 
       <form
       className=" py-5 px-4 bg-blue-50" onSubmit={(e)=>{
        e.preventDefault()
        convert()
       }}>
        <div className="w-full mb-1">
          <InputBox 
          label="from"
          amount={amount}
          currencyOptions={options}
          onCurrencyChange={(currency)=>setFrom(currency)}
          onAmountChange={(amount)=>setAmount(amount)}
          selectedCurrency={from}
          />
        </div>
        <div className="relative w-full h-0.5">
          <button 
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
          onClick={swap}>Swap</button>
        </div>
        <div className="w-full mb-1">
          <InputBox 
          label="to"
          amount={convertedAmount}
          amountDisabled
          currencyOptions={options}
          onCurrencyChange={(currency)=>setTo(currency)}
          selectedCurrency={to}
          />
        </div>
        <button type="submit"
                 className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
          Convert {from.toUpperCase()} to {to.toUpperCase()}
        </button>


       </form>
      
      </div>
    </>
  );
}