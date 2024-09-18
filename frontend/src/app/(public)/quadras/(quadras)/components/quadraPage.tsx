"use client";
import { useEffect, useState } from "react";
import { format } from 'date-fns';
import Image from "next/image";
import quadraImg from '/public/assets/bg-login.png';
import ButtonTime from "@/components/ButtonTime";
import Link from "next/link";
import { getUserData } from "@/services/showUser";

const BASE_API_URL = "http://localhost:3333";

type Props = {
    nomeQuadra: string,
    tipoQuadra: string
};

export default function QuadraPage({ nomeQuadra, tipoQuadra }: Props) {
    const quadraNome = nomeQuadra;
    const quadraTipo = tipoQuadra;
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedHorario, setSelectedHorario] = useState(null);
    const [agendamentos, setAgendamentos] = useState([]);

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0]; // Pega a data atual no formato YYYY-MM-DD
        setSelectedDate(today); // Define como valor inicial
    }, []);

    const getQuadraIdByName = async (quadraNome) => {
        try {
            const response = await fetch(`${BASE_API_URL}/quadra/list`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Erro ao buscar quadras');
            }

            const quadras = await response.json();
            const quadra = quadras.find((q) => q.nome === quadraNome);

            if (!quadra) {
                throw new Error('Quadra não encontrada');
            }

            return quadra._id; // Retorna o ID da quadra
        } catch (error) {
            console.error('Erro ao buscar o ID da quadra:', error);
            return null;
        }
    };

    const getFilteredAgendamentos = async (quadraId, selectedDate) => {
        try {
            const response = await fetch(`${BASE_API_URL}/agendamento/list`, {
                method: 'GET',
                headers: { 
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Erro ao buscar agendamentos');
            }

            const agendamentos = await response.json();

            // Filtrando pelos agendamentos da quadra
            const agendamentosQuadra = agendamentos.filter(
                (agendamento) => agendamento.quadraId === quadraId
            );

            // Filtrando pela data
            const filteredAgendamentos = agendamentosQuadra.filter((agendamento) => {
                let agendamentoData = new Date(agendamento.dataHoraInicio);
                
                // Se o horário for 00:00, subtrai um dia
                if (agendamentoData.getUTCHours() === 0) {
                    agendamentoData.setUTCDate(agendamentoData.getUTCDate() - 1);
                }

                // Comparando apenas a data
                return agendamentoData.toISOString().split('T')[0] === selectedDate;
            });

            return filteredAgendamentos;
        } catch (error) {
            console.error('Erro ao buscar agendamentos:', error);
            return [];
        }
    };

    useEffect(() => {
        const fetchAgendamentos = async () => {
            setLoading(true);
            try {
                const quadraId = await getQuadraIdByName(quadraNome);

                if (!quadraId) {
                    throw new Error('ID da quadra não encontrado');
                }

                const filteredAgendamentos = await getFilteredAgendamentos(quadraId, selectedDate);
                setAgendamentos(filteredAgendamentos);
            } catch (error) {
                console.error('Erro ao carregar agendamentos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAgendamentos();
    }, [selectedDate]); // Recarregar sempre que a data mudar

    if (loading) {
        return <div>Carregando...</div>;
    }

    const horarios = ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"];

    const handleHorarioClick = (horario) => {
        if (selectedHorario === horario) {
            setSelectedHorario(null); // Desmarca o horário se já estiver selecionado
        } else {
            setSelectedHorario(horario); // Seleciona o horário
        }
    };

    const handleConfirmarReserva = async () => {
        if (!selectedHorario) return;
        try {
            const userData = await getUserData(); // Obter os dados do usuário
            if (!userData || !userData._id) {
                console.error('ID do usuário não encontrado');
                return;
            }
    
            const userId = userData._id; // Obter o ID do usuário
            const quadraId = await getQuadraIdByName(quadraNome); // Obter o ID da quadra
    
            const selectedDateTime = new Date(`${selectedDate}T${selectedHorario}:00`);
            const dataHoraInicio = selectedDateTime.toISOString();
            const dataHoraFim = new Date(selectedDateTime.getTime() + 60 * 60 * 1000).toISOString(); // 1 hora depois

            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Token de autenticação não encontrado');
                return;
            }
    
            const response = await fetch(`${BASE_API_URL}/agendamento/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, 
                },
                body: JSON.stringify({
                    status: "ativo",
                    quadraId: quadraId,
                    dataHoraInicio: dataHoraInicio,
                    dataHoraFim: dataHoraFim,
                }),
            });
    
            if (!response.ok) {
                throw new Error('Erro ao criar reserva');
            }
    
            alert(`Reserva confirmada para o dia ${selectedDate} no horário: ${selectedHorario}`);
            setSelectedHorario(null);
            window.location.reload();
        } catch (error) {
            console.error('Erro ao confirmar reserva:', error);
        }
    };

    return (
        <section className="flex flex-1 flex-col pt-8 pr-8 pl-10 2xl:pt-10 2xl:pr-10 2xl:pl-14 pb-2 content-center font-bold">
            <div className="bg-white rounded-xl h-full drop-shadow-md p-6">
                <div className="text-center pt-4 text-violet text-3xl 2xl:text-4xl">
                    <h2>Qual a quadra você deseja reservar?</h2>
                </div>
                <div className="flex justify-center gap-10 mt-10">
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="bg-violet cursor-pointer text-white drop-shadow-md py-4 px-10 rounded-2xl border border-2 border-black"
                    />
                </div>
                <hr className="text-violet  mx-auto my-5"/>
                <div className="grid grid-cols-2 gap-4 justify-center text-violet">
                    <div className="text-center flex flex-col gap-4">
                        <h3 className="text-base">Quadra-{quadraNome} ({quadraTipo})</h3>
                        <div className=" grid grid-cols-4 gap-x-6 gap-y-10">
                            {horarios.map((horario) => {
                                const isReserved = agendamentos.some((agendamento) => {
                                    const agendamentoHoraInicio = new Date(agendamento.dataHoraInicio);
                                    let formattedHoraInicio = format(agendamentoHoraInicio, 'HH:mm');

                                    // Se for 00:00, ajusta para o horário correto do dia anterior
                                    if (agendamentoHoraInicio.getUTCHours() === 0) {
                                        agendamentoHoraInicio.setUTCDate(agendamentoHoraInicio.getUTCDate() - 1);
                                        formattedHoraInicio = "21:00"; // Ajusta manualmente para o horário correto
                                    }

                                    return formattedHoraInicio === horario;
                                });

                                return (
                                    <button
                                        key={horario}
                                        onClick={() => handleHorarioClick(horario)}
                                        disabled={isReserved}
                                        className={`rounded-lg drop-shadow-md px-6 py-3 transition-all duration-300 ${isReserved ? 'bg-violet text-white opacity-75 cursor-not-allowed' :'bg-yellow text-black'} ${selectedHorario === horario && !isReserved ? '!bg-violet text-white' : ''}`}
                                    >
                                        {horario}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                    <div>
                        <Image src={quadraImg} alt={""} height={300}></Image>
                    </div>
                </div>
                
                {selectedHorario && (
                    <div className="fixed bottom-4 right-4">
                        <button
                            onClick={handleConfirmarReserva}
                            className="fixed bottom-5 right-5 p-4 bg-yellow text-white rounded-lg drop-shadow-md border border-2 border-black"
                        >
                            Confirmar Reserva
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
