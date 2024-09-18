import Image from 'next/image'
import quack from '/public/assets/quack.png'

export default function Frame(props: { nome : any, tipo : any}){
    return(
        <div className="bg-yellow hover:bg-violet hover:text-yellow text-center text-violet border-4 border-violet rounded-2xl h-[12.5rem] w-[18.125rem] flex flex-col justify-center items-center drop-shadow-md">
            <div>
                Quadra-{props.nome}
                <br />
                ({props.tipo})
            </div>
            <div>
                <Image src={quack} alt={''}></Image>
            </div>
        </div>
    )
}