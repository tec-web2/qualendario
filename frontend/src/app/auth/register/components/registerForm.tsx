import { registerUser } from "@/services/register";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function RegisterForm(){
    const [formData, setFormData] = useState({ name: '', email: '', password: '' , cpf: ''});
    const router = useRouter(); // Instancia o useRouter
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await registerUser(formData);
            if (data?.id) {
                // Redireciona para a página de login
                router.push('/auth/login');
            } else {
                console.log('Erro no cadastro');
            }
        } catch (error) {
            console.error('Erro na requisição de cadastro:', error);
        }
    };
    
    return(
        <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-4 2xl:gap-14 w-full max-w-xs"
          >
            <div className="flex flex-col items-center gap-3 w-full">
              <label htmlFor="name" className="text-2xl 2xl:text-3xl">
                Nome:
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="placeholder-violet text-sm rounded-md ps-4 py-4 w-full text-black"
                placeholder="Digite seu nome"
                required
              />
            </div>
            <div className="flex flex-col items-center gap-3 w-full">
              <label htmlFor="cpf" className="text-2xl 2xl:text-3xl">
                Cpf:
              </label>
              <input
                type="text"
                id="cpf"
                value={formData.cpf}
                onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                className="placeholder-violet text-sm rounded-md ps-4 py-4 w-full text-black"
                placeholder="Digite seu cpf"
                required
              />
            </div>
            <div className="flex flex-col items-center gap-3 w-full">
              <label htmlFor="email" className="text-2xl 2xl:text-3xl">
                Email:
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="placeholder-violet text-sm rounded-md ps-4 py-4 w-full text-black"
                placeholder="Digite seu email"
                required
              />
            </div>
            <div className="flex flex-col items-center gap-3 w-full">
              <label htmlFor="password" className="text-2xl 2xl:text-3xl">
                senha:
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                id="password"
                placeholder="Digite sua senha"
                className="placeholder-violet text-sm rounded-md ps-4 py-4 w-full text-black"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-violet rounded-md text-center content-center px-8 py-2"
            >
              Cadastrar-se
            </button>
          </form>
    )
}