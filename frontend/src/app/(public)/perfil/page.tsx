import Image from 'next/image'
import quack from '/public/assets/quack.png'

export default function Perfil(){
    return(
        <section className="flex flex-1  flex-col pt-8 pr-8 pl-10 2xl:pt-10 2xl:pr-10 2xl:pl-14 pb-2 content-center ">
            <div className="bg-white rounded-xl content- h-full drop-shadow-md grid grid-cols-2  pt-12 ps-12 pb-16">
                <div className="text-violet font-bold grid gap-4">
                    <div className="flex items-center">
                        <h2 className='text-4xl'>Olá, Usuario!</h2>
                        <Image src={quack} alt={''} className='w-1/12'></Image>
                    </div>
                    <div className='grid gap-6'>
                        <div className='grid gap-2'>
                            <div className='text-2xl'>Nome de Cadastro:</div>
                            <div className='bg-gray max-w-[500px] py-1 ps-2 text-base text-black border border-2 border-violet rounded-md drop-shadow-md'>Inacio corno</div>
                        </div>
                        <div className='grid gap-2'>
                            <div className='text-2xl'>Email de Cadastro:</div>
                            <div className='bg-gray max-w-[500px] py-1 ps-2 text-base text-black border border-2 border-violet rounded-md drop-shadow-md'>inaciolima@gmail.com</div>
                        </div>
                        <div className='grid gap-2'>
                            <div className='text-2xl'>Senha de Cadastro:</div>
                            <div className='bg-gray max-w-[500px] py-1 ps-2 text-base text-black border border-2 border-violet rounded-md drop-shadow-md'>inaciopeteca</div>
                        </div>
                        <div className='grid gap-2'>
                            <div className='text-2xl'>Telefone de Cadastro:</div>
                            <div className='bg-gray max-w-[500px] py-1 ps-2 text-base text-black border border-2 border-violet rounded-md drop-shadow-md'>99 9 9999-9999</div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col justify-between pt-12 me-auto'>
                    <div className='text-center w-fit'>
                        <span className='text-violet text-2xl'>Foto do Usuario:</span>
                        <div className='border border-2 border-violet rounded-lg w-fit'>
                            <Image src={quack} alt={''} width={250} height={250} ></Image>
                        </div>
                    </div>
                    <button className='self-center bg-yellow hover:bg-violet text-white px-2 py-1 w-fit rounded-md border border-2 border-violet drop-shadow-md'>Editar Cadastro</button>
                </div>
            </div>
        </section>  
    )
}