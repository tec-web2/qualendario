import Frame from "@/components/Frame";

export default function Quadras() {
    return (
        <section className="flex flex-1  flex-col pt-8 pr-8 pl-10 2xl:pt-10 2xl:pr-10 2xl:pl-14 pb-2 content-center ">
            <div className="bg-white rounded-xl content- h-full drop-shadow-md">
                <div className="text-center pt-10 text-violet font-bold text-3xl 2xl:text-4xl">
                    <h2>Qual a quadra voce deseja reservar?</h2>
                </div>
                <div className="flex justify-center">
                    <div className="grid grid-cols-2 gap-10 2xl:gap-12 w-fit m-12">
                        <Frame numero={1}/>
                        <Frame numero={2}/>
                        <Frame numero={3}/>
                        <Frame numero={4}/>
                    </div>
                </div>
          </div>
        </section>
    );
  }
  