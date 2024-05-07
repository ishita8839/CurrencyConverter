import React, { useState } from 'react';
import { Input } from './components/index';
import useCurrencyInfo from './hooks/useCurrencyInfo';

function App() {
    const [amount, setAmount] = useState("");
    const [from, setFrom] = useState("usd");
    const [to, setTo] = useState("inr");
    const [convertedAmount, setConvertedAmount] = useState(0);

    const currencyInfo = useCurrencyInfo(from) || {};
    const options = Object.keys(currencyInfo);
    const onAmountChange = (newAmount) => {
        if (amount === 0) {
            setAmount("Amount");
        }
         else {
            setAmount(newAmount);
        }
    };
    
    

    const swap = () => {
        setFrom(to);
        setTo(from);
        setConvertedAmount(amount);
        setAmount(convertedAmount);
    };

    const convert = () => {
        setConvertedAmount(amount * currencyInfo[to]);
    };

    return (
        <div
            className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
            style={{
                backgroundImage: `url('https://img.freepik.com/free-photo/wealthy-investment-metal-coins-pays-off-generated-by-ai_188544-19981.jpg?t=st=1715091771~exp=1715095371~hmac=75ac678c90e31f8a1ab47514e151b332b42a1092b860e8ce56c1d9c9568a45b0&w=826')`,
            }}
        >
            <div className="w-full">
                <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            convert();
                        }}
                    >
                        <div className="w-full mb-1">
                            <Input
                                label="From"
                                amount={amount}
                                currencyOptions={options}
                                onCurrencyChange={(currency) => setFrom(currency)}
                                selectCurrency={from}
                                onAmountChange={(newAmount) => onAmountChange(newAmount)}
                            />
                        </div>
                        <div className="relative w-full h-0.5">
                            <button
                                type="button"
                                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-black text-white px-2 py-0.5"
                                onClick={swap}
                            >
                                swap
                            </button>
                        </div>
                        <div className="w-full mt-1 mb-4">
                            <Input
                                label="To"
                                amount={convertedAmount}
                                currencyOptions={options}
                                onCurrencyChange={(currency) => setTo(currency)}
                                selectCurrency={to}
                                amountDisable
                            />
                        </div>
                        <button type="submit" className="w-full bg-black text-white px-4 py-3 rounded-lg">
                            Convert {from.toUpperCase()} to {to.toUpperCase()}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default App;
