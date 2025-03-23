'use client'
import { useState, useRef, useEffect } from 'react';
import Image from "next/image";
import { Chatbot } from '../../service'

interface Message {
  usuario: string;
  chat: string;
}


export default function Conversas(){
    const [value, setValue] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [messages, setMessages] = useState<Message[]>([]);

    const getHistoric = async () => {
        const res = await Chatbot.conversaHistoric()
        setMessages(res.conversa)
    }
  
    useEffect(() => {
      getHistoric()
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'; 
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    }, [value]);

    
    const handleSubmit = async () => {
      try {
        const res = await Chatbot.conversar(value);
        setMessages((prevMessages) => [...prevMessages, { usuario: res.question, chat: res.response }]);
        setValue(''); // Limpar o campo após o envio
      } catch (error) {
        console.error("Erro ao enviar mensagem:", error);
      }
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
          <div>
          <div className="flex flex-col items-center w-full mt-16 mb-8">
            <div className="overflow-y-auto max-h-[500px] w-[100%] ">
              {messages.map((message, index) => (
                <div key={index} className="flex flex-col">
                  <div className="bg-[#f7be97] w-[45%] rounded m-3 p-2 ml-auto">
                    <p className="text-white font-light">{message.usuario}</p>
                  </div>
                  <div className="bg-[#ed4742] w-[45%] rounded m-3 p-2">
                    <p className="text-white font-light">{message.chat}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          </div>
          <div className=' text-lg rounded-md  mb-0 text-white p-2 focus:outline-none focus:ring-0 w-full justify-between flex '>
 
            <textarea
                  className="bg-[#ed4742] text-lg rounded-md w-1/2 mb-10 text-white p-2 focus:outline-none focus:ring-0 "
                  placeholder="Digite sua menssagem ... "
                  ref={textareaRef}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  style={{
                      minHeight: '60px', 
                      maxHeight: '180px', 
                      width: '80%',
                      resize: 'none',
                      overflow: 'auto',
                      transition: 'width 0.3s ease', 
                    }}
              />
            <button className='bg-[#ed4742] rounded-full  w-18 h-18 ml-2 flex items-center justify-center active:scale-90 active:bg-red-700 transition-transform shadow-2xl' onClick={handleSubmit}>
              <Image 
                src="/seta.png"           
                alt="Imagem redonda"
                width={50} 
                height={50} 
                className="rounded-full"
              />
            </button>
          </div>
          
        </div>
    )
}
