import Image from 'next/image'
import quack from '/public/assets/quack.png'
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode } from 'react'

export default function Frame(props: { numero: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined }){
    return(
        <div className="bg-yellow hover:bg-violet hover:text-yellow text-violet border-4 border-violet rounded-2xl h-[12.5rem] w-[18.125rem] flex flex-col justify-center items-center drop-shadow-md">
            <div>
              quadra-{props.numero}
            </div>
            <div>
                <Image src={quack} alt={''}></Image>
            </div>
        </div>
    )
}