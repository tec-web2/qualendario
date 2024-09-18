import Image from 'next/image'
import logoFull from '/public/assets/qualendario-logo-full.png'
import LoginForm from './components/loginForm'

export default function Login(){
    return(
        <div className="h-full max-h-full rounded-3xl items-center flex flex-col">
            <div className="flex flex-col items-center h-full justify-center object-fit">
                <Image src={logoFull} alt="" layout='responsive' className='w-3/4' />
                <div className="bg-violet pt-10 pb-8 px-12 2xl:pt-14 2xl:pb-12 2xl:px-16 flex flex-col items-center rounded-2xl text-white">
                    <h3 className="mb-6 2xl:mb-14 text-3xl 2xl:text-4xl font-bold">Bem-Vindo(a)</h3>
                    <LoginForm/>
                </div>
                <div>
                    <button className="bg-yellow rounded-md text-white text-center content-center px-8 py-2 mt-7">
                        <a href="/auth/register">cadastrar-se</a>
                    </button>
                </div>
            </div>
        </div>
    )
}