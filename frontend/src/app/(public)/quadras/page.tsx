import Frame from "@/components/Frame";
import Link from "next/link";

export default function Quadras() {
    return (
        <section className="flex flex-1  flex-col pt-8 pr-8 pl-10 2xl:pt-10 2xl:pr-10 2xl:pl-14 pb-2 content-center ">
            <div className="bg-white rounded-xl content-center h-full drop-shadow-md">
                <div className="text-center pt-10 text-violet font-bold text-3xl 2xl:text-4xl">
                    <h2>Qual a quadra voce deseja reservar?</h2>
                </div>
                <div className="flex justify-center">
                    <div className="grid grid-cols-2 gap-10 2xl:gap-12 w-fit m-12">
                        <Link href={"/quadras/1"}>                        
                            <Frame numero={1}/>
                        </Link>
                        <Link href={"/quadras/2"}>                        
                            <Frame numero={2}/>
                        </Link>
                        <Link href={"/quadras/3"}>                        
                            <Frame numero={3}/>
                        </Link>
                        <Link href={"/quadras/4"}>                        
                            <Frame numero={4}/>
                        </Link>
                    </div>
                </div>
          </div>
        </section>
    );
  }
  