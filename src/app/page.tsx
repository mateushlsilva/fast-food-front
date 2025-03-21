'use client'

import { Conversas } from "./components";

export default function Home() {

  return (
    <div className="grid grid-cols-6 h-screen bg-[#ed4742]">
      <div className="max-sm:hidden ">

      </div>
      <Conversas />
      
    </div>
  );
}
