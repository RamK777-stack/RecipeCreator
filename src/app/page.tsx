import { DropDownSelect } from "@/components/ui/DropdownSelect";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-10">
      <div className="w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h3 className="text-xl">Recipe creator</h3>
        <button className="bg-gray-600 px-8 py-3 rounded text-white">Login</button>
      </div>
      <div className="flex justify-center mt-10">
        <DropDownSelect />
      </div>
    </main>
  );
}
