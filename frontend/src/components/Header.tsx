"use client"
import { useAuth } from '@/hooks/useAuth'
import Image from 'next/image'
import quack from '/public/assets/quack.png'
import logo from '/public/assets/qualendario-logo.png'
import profile from '/public/assets/profile-user.png'
import Link from 'next/link';

export default function Header(){
    const authenticated = useAuth(); // Verifica se o usuário está autenticado

    if (!authenticated) {
        return <div>Redirecionando para login...</div>; // Exibe um loading enquanto redireciona
    }
    return(
        <header className="bg-white rounded-br-3xl px-2.5 flex justify-between items-center w-full z-10 drop-shadow-md">
            <div className="flex">
                <a href="/">
                    <Image src={quack} alt={''} className='w-3/4'></Image>
                </a>
                <Image src={logo} alt={''} className='w-1/2'></Image>
            </div>
            <div>
                <Link href={'/perfil'}>
                    <Image src={profile} alt={''} className='w-3/5'></Image>
                </Link>
            </div>
        </header>
    )
}