"use client";
import Image from "next/image";
import logoFull from "/public/assets/qualendario-logo-full.png";
import { registerUser } from "@/services/register";
import { useState } from "react";
import { useRouter } from "next/navigation";
import RegisterForm from "./components/registerForm";

export default function Cadastro() {
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


  return (
    <div className=" h-full max-h-full rounded-3xl items-center flex flex-col">
      <div className="flex flex-col items-center h-full justify-center object-fit">
        <Image src={logoFull} className="w-3/4"/>
        <div className="bg-yellow pt-8 pb-6 px-20 2xl:pt-14 2xl:pb-12 2xl:px-16 flex flex-col items-center rounded-2xl text-white">
          <h3 className="mb-6 2xl:mb-14 text-3xl 2xl:text-4xl font-bold">
            Digite seus dados 
          </h3>
          <RegisterForm/>
        </div>
      </div>
    </div>
  );
}
