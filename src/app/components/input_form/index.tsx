interface PropsInput{
    input: string;
    setInput: React.Dispatch<React.SetStateAction<string>>;
    placeholder: string;
}

export default function InputForm({input, setInput, placeholder}:PropsInput){
    return (
        <div className="relative flex justify-center items-center pt-[7%] ">
        <div className="relative w-[80%]">
            <input 
                type="text" 
                id="input"
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                className="
                    w-full h-12 px-4 text-black 
                    border border-gray-300 rounded-lg 
                    shadow-md focus:outline-none 
                    focus:ring-2 focus:ring-[#ed4742]
                    focus:border-[#ed4742] 
                    transition-all duration-300
                    placeholder-transparent peer bg-[#f1ebe5]
                "
                placeholder={placeholder} 
            />
            <label 
                htmlFor="input"
                className={`
                    absolute left-4 top-3 text-gray-500 
                    transition-all duration-300 
                    peer-placeholder-shown:top-3 peer-placeholder-shown:text-base 
                    peer-placeholder-shown:text-gray-400
                    peer-focus:top-[-10px] peer-focus:text-sm 
                    peer-focus:text-[#ed4742] bg-[#f1ebe5] px-1
                    ${input ? 'top-[-10px] text-sm text-[#ed4742]' : 'top-3 text-base text-[#f1ebe5] bg-[#f1ebe5]'} 
                    ${input && !document.activeElement ? 'hidden' : ''}
                `}
            >
                {placeholder}
            </label>
        </div>
    </div>
    )
}

{/*
    className={`
            absolute left-4 top-3 text-gray-500
            transition-all duration-300 
            ${input ? 'top-[-10px] text-sm text-[#ed4742]' : 'top-3 text-base text-gray-400'} 
            ${input && !document.activeElement ? 'hidden' : ''}
            bg-[#f1ebe5] px-1
          `}
    */}