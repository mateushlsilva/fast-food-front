'use client'
import { useState, useRef, useEffect } from 'react';
import Image from "next/image";

export default function Conversas(){
    const [value, setValue] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  
    useEffect(() => {
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'; 
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    }, [value]);

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter'  && !event.shiftKey) {
          event.preventDefault(); 
          handleSubmit();         
        }
      };
    
      const handleSubmit = () => {
        console.log('Enviado:', value);
        setValue(''); 
      };

    return(
        <div className="flex-1 bg-[#f1ebe5] rounded-2xl p-4 col-span-5 m-6  flex flex-col  items-center shadow-2xl relative  justify-between md:col-span-4 sm:col-span-5 max-sm:col-span-6">
          <div className="self-start w-full">
          <div className="bg-amber-50 w-full flex items-center py-2 p-4 absolute inset-x-0 top-0 rounded-t-2xl">
            <Image 
              src="/pizza_ico.jpeg"           
              alt="Imagem redonda"
              width={100} 
              height={100} 
              className="rounded-full"
            />
            <h1 className="text-black text-2xl font-bold pl-4 ">Fast Food</h1>
          </div>
            
          </div>
          
            <textarea
                className="bg-[#ed4742] text-lg rounded-md w-1/2 mb-10 text-white p-2 focus:outline-none focus:ring-0 w-full"
                placeholder="Digite sua menssagem ... "
                ref={textareaRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={handleKeyPress} 
                style={{
                    minHeight: '60px', 
                    maxHeight: '180px', 
                    width: '80%',
                    resize: 'none',
                    overflow: 'auto',
                    transition: 'width 0.3s ease', 
                  }}
            />
        </div>
    )
}