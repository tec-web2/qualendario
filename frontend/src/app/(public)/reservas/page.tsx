"use client"
import Image from 'next/image'
import quack from '/public/assets/quack.png'
import { useEffect, useState } from 'react';
import { getUserAgendamentos } from "@/services/showAgendamentos"
import { getUserData } from '@/services/showUser';
import { listQuadras } from '@/services/quadras'; // Importando a função que lista as quadras

export default function Perfil() {
    const [agendamentos, setAgendamentos] = useState([]);
    const [quadras, setQuadras] = useState([]); // Estado para armazenar as quadras
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchUserDataAndAgendamentos = async () => {
            try {
                const userData = await getUserData(); // Obtém os dados do usuário
                if (userData && userData._id) {
                    setUserId(userData._id); // Armazena o ID do usuário

                    // Agora que temos o ID do usuário, podemos buscar os agendamentos
                    const userAgendamentos = await getUserAgendamentos(userData._id);
                    setAgendamentos(userAgendamentos); // Armazena os agendamentos do usuário

                    // Buscar a lista de quadras
                    const quadraList = await listQuadras();
                    setQuadras(quadraList); // Armazena a lista de quadras
                }
            } catch (error) {
                console.error('Erro ao buscar dados ou agendamentos do usuário:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserDataAndAgendamentos();
    }, []);

    if (loading) {
        return <p>Carregando...</p>;
    }

    // Função para obter o nome e o tipo da quadra a partir do quadraId
    const getQuadraInfo = (quadraId) => {
        const quadra = quadras.find((q) => q._id === quadraId);
        return quadra ? `${quadra.nome} (${quadra.tipo})` : 'Quadra não encontrada';
    };


    return (
        <section className="flex flex-1 flex-col pt-8 pr-8 pl-10 2xl:pt-10 2xl:pr-10 2xl:pl-14 pb-2 content-center ">
            <div className="bg-white rounded-xl h-full drop-shadow-md grid px-12 pb-10">
                <div className="text-center pt-10 text-violet font-bold text-3xl 2xl:text-4xl">
                    <h2>Minhas Reservas</h2>
                </div>
                <div className='bg-light-gray p-4 rounded-lg max-h-[471px] overflow-y-auto'>
                    {agendamentos.length > 0 ? (
                        <ul className='grid grid-cols-3 gap-4'>
                            {agendamentos.map((agendamento) => {
                                const dataFim = new Date(agendamento.dataHoraFim);
                                const agora = new Date();
                                const statusReserva = agora > dataFim ? 'Utilizado' : 'Não utilizado';

                                return (
                                    <li key={agendamento._id} className={`text-white p-4 shadow-md rounded-lg ${statusReserva === 'Utilizado' ? 'bg-violet' : 'bg-yellow'}`}>
                                        <p>
                                            <strong>Quadra -</strong> {getQuadraInfo(agendamento.quadraId)}
                                        </p>
                                        <p>
                                            <strong>Data Início:</strong> {new Date(agendamento.dataHoraInicio).toLocaleString()}
                                        </p>
                                        <p>
                                            <strong>Data Fim:</strong> {new Date(agendamento.dataHoraFim).toLocaleString()}
                                        </p>
                                        <p>
                                            <strong>Status:</strong> <span className={statusReserva === 'Utilizado' ? 'text-yellow' : 'text-violet'}>{statusReserva}</span>
                                        </p>
                                    </li>
                                );
                            })}
                        </ul>
                    ) : (
                        <p className='text-center text-gray-500'>Nenhum agendamento encontrado.</p>
                    )}
                </div>

            </div>
        </section>
    );
}
