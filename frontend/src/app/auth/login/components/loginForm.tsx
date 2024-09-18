"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { loginUser} from "@/services/signin"

export default function LoginForm(){
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await loginUser(credentials);
        const token = response.token || response.bearer || response

        if (token) {
            // Armazena o token JWT no localStorage
            localStorage.setItem('token', token);
            // Redireciona para a página principal ou outra página protegida
            router.push('/');
        } else {
            console.log('Erro no login');
        }
    };
    
    return(
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6 2xl:gap-14 w-full max-w-xs">
            <div className="flex flex-col items-center gap-3 w-full">
                <label htmlFor="" className="text-2xl 2xl:text-3xl">email:</label>
                <input type="email"
                    className="placeholder-violet text-sm rounded-md ps-4 py-4 w-full text-black"
                    placeholder="Digite seu email"
                    value={credentials.email}
                    onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                   />
            </div>
            <div className="flex flex-col items-center gap-3 w-full">
                <label htmlFor="" className="text-2xl 2xl:text-3xl">senha:</label>
                <input type="password"
                    placeholder="Digite sua senha"
                    className="placeholder-violet text-sm rounded-md ps-4 py-4 w-full text-black"
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  />
            </div>
            <button type="submit" className="bg-yellow rounded-md text-center content-center px-8 py-2">entrar</button>
        </form>
    )
}