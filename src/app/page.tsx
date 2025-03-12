import { Conversas } from "./components";

export default function Home() {
  return (
    <div className="grid grid-cols-5  h-screen bg-[#ed4742]">
      <div className="col-span-1 bg-amber-200 hidden md:block"></div>
      <Conversas/>
    </div>
  );
}
