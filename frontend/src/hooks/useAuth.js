import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function useAuth() {
    const [authenticated, setAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token'); // Verifica se o token existe

        if (!token) {
            router.push('/auth/login'); // Redireciona para login se não houver token
        } else {
            setAuthenticated(true); // Define como autenticado
        }
    }, [router]);

    return authenticated; // Retorna o estado de autenticação
}
