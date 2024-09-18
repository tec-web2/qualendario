import { useRouter } from 'next/navigation';

export function logoutUser() {
    const router = useRouter();
    
    const handleLogout = () => {
        // Remove o token do localStorage
        localStorage.removeItem('token');

        // Redireciona o usuário para a página de login
        router.push('/auth/login');
    };

    return handleLogout;
}
