"use client";
import Image from 'next/image'
import menu from '../public/assets/menu.png'
import calendar from '../public/assets/calendar.png'
import tickets from '../public/assets/ticket.png'
import logout from '/public/assets/logout.png'
import Link from 'next/link';
import { usePathname } from 'next/navigation'; 


export default function Sidebar(){
    const pathname = usePathname();

    const links = [
        {href: '/quadras', img:'/assets/menu.png', alt:'menu'},
        {href: '/calendar', img:'/assets/calendar.png', alt:'menu'},
        {href: '/tickets', img:'/assets/ticket.png', alt:'menu'},
    ]

    return(
        <aside className="bg-white max-w-24 h-[calc(100vh-80px)] rounded-br-3xl pt-6 pb-2.5 px-2.5 flex flex-1 flex-col justify-between items-center drop-shadow-md">
            <ul className="grid gap-4">
                {links.map((link)=>{
                    const isActive = pathname === link.href;
                    return(
                        <li key={link.href} className='relative'>
                            <Link href={link.href}>
                            <Image src={link.img} alt={link.alt} width={35} height={35} className='relative z-10'></Image>
                            </Link>
                        </li>
                    );
                })}
                {/* <li className={pathname === '/quadras' ? 'bg-onFocus bg-no-repeat bg-cover bg-center' : ''}>
                    <Link href="/quadras"> 
                        <Image src={menu} alt={''} width={35}></Image>
                    </Link>
                </li>
                <li>
                    <a href="/calendar">
                        <Image src={calendar} alt={''} width={35}></Image>
                    </a>
                </li>
                <li>
                    <a href="./tickets">
                    <Image src={tickets} alt={''} width={35}></Image>
                    </a>
                </li> */}
            </ul>
            <div>
                <a href="./tickets">
                <Image src={logout} alt={''} width={35}></Image>
                </a>
            </div>
      </aside>
    )
}