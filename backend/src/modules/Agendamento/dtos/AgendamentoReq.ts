export default interface AgendamentoReq {
    usuarioId: string;
    quadraId: string;
    dataHoraInicio: Date;
    dataHoraFim: Date;
    status: string;
}