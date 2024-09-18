"use client"
import Image from 'next/image'
import quack from '/public/assets/quack.png'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getUserData } from "@/services/showUser"


export default function Perfil(){
    const [user, setUser] = useState(null);

    useEffect(() => {
      // Busca os dados do usuário quando o componente monta
      const fetchData = async () => {
        const data = await getUserData();
        setUser(data); // Define os dados do usuário no estado
      };
  
      fetchData();
    }, []);
  
    if (!user) {
      return <p>Carregando...</p>; // Mostra um indicador de carregamento enquanto os dados não chegam
    }
    return(
        <section className="flex flex-1  flex-col pt-8 pr-8 pl-10 2xl:pt-10 2xl:pr-10 2xl:pl-14 pb-2 content-center ">
            <div className="bg-white rounded-xl content- h-full drop-shadow-md grid grid-cols-2  pt-12 ps-12 pb-16">
                <div className="text-violet font-bold grid gap-4">
                    <div className="flex items-center">
                        <h2 className='text-4xl'>Olá, {user.name}!</h2>
                        <Image src={quack} alt={''} className='w-1/12'></Image>
                    </div>
                    <div className='grid gap-6'>
                        <div className='grid gap-2'>
                            <div className='text-2xl'>Nome de Cadastro:</div>
                            <div className='bg-gray max-w-[500px] py-1 ps-2 text-base text-black border border-2 border-violet rounded-md drop-shadow-md'>{user.name}</div>
                        </div>
                        <div className='grid gap-2'>
                            <div className='text-2xl'>Email de Cadastro:</div>
                            <div className='bg-gray max-w-[500px] py-1 ps-2 text-base text-black border border-2 border-violet rounded-md drop-shadow-md'>{user.email}</div>
                        </div>
                        <div className='grid gap-2'>
                            <div className='text-2xl'>Cpf:</div>
                            <div className='bg-gray max-w-[500px] py-1 ps-2 text-base text-black border border-2 border-violet rounded-md drop-shadow-md'>{user.cpf}</div>
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
                </div>
            </div>
        </section>  
    )
}