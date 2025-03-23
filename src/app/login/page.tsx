'use client'

import Image from "next/image";
import { InputForm } from '../components'
import { useState } from "react";
import { useAuth } from '../hook'
import { useRouter } from "next/navigation";


export default function Login(){
    const [ email, setEmail ] = useState('')
    const [ senha, setSenha ] = useState('')
    const router = useRouter()
    const { login } = useAuth()
   const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        try {
            await login(email, senha)
        } catch (error) {
            console.log(error)
        }
   }
    return (
        <div className="grid grid-cols-2 h-screen bg-[#ed4742] m-auto justify-center items-center">
            <div className="max-sm:hidden justify-center col-span-1 ml-[5%]">
                 <Image 
                    src="/fast-food.webp"           
                    alt="Imagem redonda"
                    width={1000} 
                    height={1000} 
                    className="justify-center"
                    />
            </div>
            <div className="flex-1 bg-[#f1ebe5] rounded-2xl  col-span-1 m-6 ml-[10%] h-[80%] w-[60%]  flex-col  
            items-center shadow-2xl relative  justify-between max-sm:col-span-2 max-sm:w-[80%] ">
                <h1 className="text-black text-2xl pt-7 font-medium italic text-center ml-1 mr-1">Rápido, saboroso e do jeito que você gosta! </h1>
                <h2 className="text-black text-center text-xl font-light italic mt-1  ml-1 mr-1">Entre e faça seu pedido em instantes!</h2>
                <form className="mt-20" onSubmit={handleSubmit}>
                    <InputForm placeholder="Email" input={email} setInput={setEmail}/>
                    <InputForm placeholder="Senha" input={senha} setInput={setSenha}/>
                    <button className="text-white bg-[#ed4742] w-[80%] h-10 rounded-lg active:scale-90 active:bg-red-700 transition-transform shadow-2xl
                    mt-5 mr-auto ml-auto flex justify-center items-center
                    "
                    >Entrar</button>
                </form>
                <p className="text-[#423f32] text-center mt-10">Não tem uma conta?</p>
                <button className="text-white bg-[#ed4742] w-[80%] h-10 rounded-lg active:scale-90 active:bg-red-700 transition-transform shadow-2xl
                    mt-5 mr-auto ml-auto flex justify-center items-center
                    " onClick={() => router.push('/cadastro')}>Cadastrar</button>
            </div>
              
        </div>
    )
}