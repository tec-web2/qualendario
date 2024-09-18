"use client"
import { useEffect, useState } from "react";
import { format } from 'date-fns';
import Image from "next/image";
import quadraImg from '/public/assets/bg-login.png';
import { getUserData } from "@/services/showUser";

const BASE_API_URL = "http://localhost:3333";

export default function QuadrasOverview() {
    const quadraNomes = ['1', '2', '3', '4'];
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState('');
    const [agendamentos, setAgendamentos] = useState([]);
    const [selectedHorarios, setSelectedHorarios] = useState({}); // Armazena o horário selecionado para cada quadra
    const [confirmingQuadra, setConfirmingQuadra] = useState(null); // Armazena a quadra em que o usuário está confirmando a reserva
    const [quadraIds, setQuadraIds] = useState({});

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        setSelectedDate(today);
    }, []);

    useEffect(() => {
        const fetchQuadraIds = async () => {
            const ids = {};
            for (const quadraNome of quadraNomes) {
                const quadraId = await getQuadraIdByName(quadraNome);
                ids[quadraNome] = quadraId;
            }
            setQuadraIds(ids);
        };
    
        fetchQuadraIds();
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

            return quadra._id;
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
            const agendamentosQuadra = agendamentos.filter(
                (agendamento) => agendamento.quadraId === quadraId
            );

            const filteredAgendamentos = agendamentosQuadra.filter((agendamento) => {
                const agendamentoData = new Date(agendamento.dataHoraInicio).toISOString().split('T')[0];
                return agendamentoData === selectedDate;
            });

            return filteredAgendamentos;
        } catch (error) {
            console.error('Erro ao buscar agendamentos:', error);
            return [];
        }
    };

    useEffect(() => {
        const fetchAllAgendamentos = async () => {
            setLoading(true);
            try {
                const allAgendamentos = [];

                for (const quadraNome of quadraNomes) {
                    const quadraId = await getQuadraIdByName(quadraNome);
                    if (quadraId) {
                        const agendamentosQuadra = await getFilteredAgendamentos(quadraId, selectedDate);
                        allAgendamentos.push(...agendamentosQuadra);
                    }
                }

                setAgendamentos(allAgendamentos);
            } catch (error) {
                console.error('Erro ao carregar agendamentos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllAgendamentos();
    }, [selectedDate]);

    const handleHorarioClick = (quadraNome, horario) => {
        setSelectedHorarios((prev) => ({
            ...prev,
            [quadraNome]: prev[quadraNome] === horario ? null : horario,
        }));
        setConfirmingQuadra(quadraNome);
    };

    const confirmarReserva = async (quadraNome) => {
        try {
            const user = await getUserData();
            const quadraId = await getQuadraIdByName(quadraNome);
            const horarioSelecionado = selectedHorarios[quadraNome];
            const dataHoraInicio = new Date(`${selectedDate}T${horarioSelecionado}:00`);
            const dataHoraFim = new Date(dataHoraInicio);
            dataHoraFim.setHours(dataHoraInicio.getHours() + 1); // Duração de 1 hora

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
                    dataHoraInicio: dataHoraInicio.toISOString(),
                    dataHoraFim: dataHoraFim.toISOString(),
                }),
            });

            if (response.ok) {
                alert(`Reserva confirmada para o dia ${selectedDate} no horário: ${selectedHorarios[quadraNome]} `);
                setConfirmingQuadra(null); // Remove o estado de confirmação
                setSelectedHorarios((prev) => ({
                    ...prev,
                    [quadraNome]: null,
                }));
                // Atualiza a lista de agendamentos após a reserva
                const updatedAgendamentos = await getFilteredAgendamentos(quadraId, selectedDate);
                setAgendamentos((prev) => [...prev, ...updatedAgendamentos]);
            } else {
                alert('Erro ao confirmar a reserva.');
            }
        } catch (error) {
            console.error('Erro ao confirmar reserva:', error);
        }
    };

    if (loading) {
        return <div>Carregando...</div>;
    }

    const horarios = ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"];

    return (
        <section className="flex flex-1 flex-col pt-8 pr-8 pl-10 2xl:pt-10 2xl:pr-10 2xl:pl-14 pb-2 content-center font-bold">
            <div className="bg-white rounded-xl h-full drop-shadow-md p-6">
                <div className="text-center pt-4 text-violet text-3xl 2xl:text-4xl">
                    <h2>Horários disponíveis para todas as quadras</h2>
                </div>
                <div className="flex justify-center gap-10 mt-10">
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="bg-violet cursor-pointer text-white drop-shadow-md py-4 px-10 rounded-2xl border border-2 border-black"
                    />
                </div>
                <hr className="text-violet mx-auto my-5"/>
                <div className="grid grid-cols-4 gap-4 justify-center text-violet">
                    {quadraNomes.map((quadraNome) => {
                        const quadraId = quadraIds[quadraNome]; // Usar o ID da quadra pré-carregado

                        return (
                            <div key={quadraNome} className="text-center flex flex-col gap-4">
                                <h3 className="text-base">Quadra-{quadraNome}</h3>
                                <div className="grid grid-cols-4 gap-y-10 gap-x-2">
                                    {horarios.map((horario) => {
                                        const isReserved = agendamentos.some((agendamento) => {
                                            const agendamentoHoraInicio = new Date(agendamento.dataHoraInicio);
                                            const formattedHoraInicio = format(agendamentoHoraInicio, 'HH:mm');
                                            return formattedHoraInicio === horario && agendamento.quadraId === quadraId;
                                        });

                                        return (
                                            <button
                                                key={horario}
                                                onClick={() => handleHorarioClick(quadraNome, horario)}
                                                disabled={isReserved}
                                                className={`rounded-lg drop-shadow-md px-2 py-3 transition-all duration-300 ${isReserved ? 'bg-violet text-white opacity-75 cursor-not-allowed' : 'bg-yellow text-black'} ${selectedHorarios[quadraNome] === horario && !isReserved ? '!bg-violet text-white' : ''}`}
                                            >
                                                {horario}
                                            </button>
                                        );
                                    })}
                                </div>
                                {confirmingQuadra === quadraNome && selectedHorarios[quadraNome] && (
                                    <button
                                        className="fixed bottom-4 right-5 p-4 bg-yellow text-white rounded-lg drop-shadow-md border border-2 border-black"
                                        onClick={() => confirmarReserva(quadraNome)}
                                    >
                                        Confirmar Reserva
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
