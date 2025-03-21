'use client'
import Image from 'next/image';
interface Pedidos{
    id: string
    nome: string
}

interface HistoricoConversasProps {
    lista: Pedidos[]; // Define a propriedade 'lista' como um array de objetos do tipo Pedido
    isColumnVisible: boolean;
  }

export default function Historico_conversas({lista, isColumnVisible}: HistoricoConversasProps){
    const  handleClick = (id: string) => {
        console.log(id);
        
    }
    return(
        <div className={`col-span-1  ${isColumnVisible ? "block" : "hidden"} md:block bg-amber-200 overflow-y-auto `}>

            {lista.map((pedido) => {
                return (
                    <div key={pedido.id} className="bg-[#ed4742] m-4 p-4 rounded-2xl text-center text-lg" onClick={() => handleClick(pedido.id)}>
                        <Image 
                            src="/pizza.webp"           
                            alt="Imagem redonda"
                            width={100} 
                            height={100} 
                            className='m-auto'
                        />
                        <p>{pedido.nome}</p>
                    </div>
                )
            })}

       
            
        </div>
    )
}