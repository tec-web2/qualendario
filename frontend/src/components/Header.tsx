import Image from 'next/image'
import quack from '/public/assets/quack.png'
import logo from '/public/assets/qualendario-logo.png'
import profile from '/public/assets/profile-user.png'

export default function Header(){
    return(
        <header className="bg-white rounded-br-3xl px-2.5 flex justify-between items-center w-full z-10 drop-shadow-md">
            <div className="flex">
                <a href="/">
                    <Image src={quack} alt={''} className='w-3/4'></Image>
                </a>
                <Image src={logo} alt={''} className='w-1/2'></Image>
            </div>
            <div>
                <Image src={profile} alt={''} className='w-3/5'></Image>
            </div>
        </header>
    )
}