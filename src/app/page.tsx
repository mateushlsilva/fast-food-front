'use client'
import { useState } from "react";
import { Conversas, Historico_conversas } from "./components";

export default function Home() {
  const [isColumnVisible, setIsColumnVisible] = useState(true); // Controla se a coluna está visível ou não

  const toggleColumn = () => {
    setIsColumnVisible(!isColumnVisible); // Alterna a visibilidade da coluna
  };
  const lista_ex = [
    {
        'id': '2fds212321-4234',
        'nome': 'Pizza de Calabresa'
    },
    {
        'id': '2fds212321-489-2',
        'nome': 'Pizza de Frango'
    },
    {
        'id': '2fds212321-489-3',
        'nome': 'Pizza de Presunto e Queijo'
    },
    {   
        'id': '6fds212371-489-4',
        'nome': 'Pizza de Banana'
    },
    {
        'id': '0976s212321-489-5',
        'nome': 'Pizza de Milho'
    },
    {
        'id': '75kls212321-489-9',
        'nome': 'Pizza de Alho'
    }
]

  return (
    <div className="grid grid-cols-6 h-screen bg-[#ed4742]">
      {/* <button
          className="absolute top-4 left-4 p-2 bg-gray-800 text-white rounded-full z-10 md:hidden"
          onClick={toggleColumn}
        >
          {isColumnVisible ? '←' : '→'}
        </button> */}
      <div className="max-sm:hidden ">

      </div>
      {/* <Historico_conversas lista={lista_ex} isColumnVisible={isColumnVisible}/> */}
      <Conversas />
      {/* <div className={`md:hidden absolute top-0 left-0 right-0 bottom-0 ${isColumnVisible ? "block" : "hidden"}`}>
        <Historico_conversas lista={lista_ex} isColumnVisible={isColumnVisible}/>
      </div> */}
    </div>
  );
}
