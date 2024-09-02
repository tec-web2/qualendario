import Image from 'next/image'
import logoFull from '/public/assets/qualendario-logo-full.png'

export default function Page(){
    return(
        <div className=" bg-img-login bg-no-repeat bg-cover bg-center h-full max-h-full rounded-3xl items-center flex flex-col">
            <div className="flex flex-col items-center h-full justify-center object-fit">
                <Image src={logoFull} alt="" layout='responsive' />
                <div className="bg-violet pt-10 pb-8 px-12 2xl:pt-14 2xl:pb-12 2xl:px-16 flex flex-col items-center rounded-2xl text-white">
                    <h3 className="mb-6 2xl:mb-14 text-3xl 2xl:text-4xl font-bold">Bem-Vindo(a)</h3>
                    <form action="/" className="flex flex-col items-center gap-6 2xl:gap-14 w-full max-w-xs">
                        <div className="flex flex-col items-center gap-3 w-full">
                            <label htmlFor="" className="text-2xl 2xl:text-3xl">login:</label>
                            <input type="text" className="placeholder-violet text-sm rounded-md ps-4 py-4 w-full text-black" placeholder="Digite seu login" />
                        </div>
                        <div className="flex flex-col items-center gap-3 w-full">
                            <label htmlFor="" className="text-2xl 2xl:text-3xl">senha:</label>
                            <input type="password" placeholder="Digite sua senha" className="placeholder-violet text-sm rounded-md ps-4 py-4 w-full text-black"/>
                        </div>
                        <button type="submit" className="bg-yellow rounded-md text-center content-center px-8 py-2">entrar</button>
                    </form>
                </div>
                <div>
                    <button className="bg-yellow rounded-md text-white text-center content-center px-8 py-2 mt-7">cadastrar-se</button>
                </div>
            </div>
        </div>
    )
}