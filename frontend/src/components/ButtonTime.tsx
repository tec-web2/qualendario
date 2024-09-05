"use client"
import { useState } from "react"
type Props ={
    horario: string
}

export default function ButtonTime({ horario }: Props){
    const [selecionado, setselecionado] = useState(false)
    const handleButtonClick = () =>{
        setselecionado(!selecionado)
    }

    return(
        <>
        <button className={`rounded-lg drop-shadow-md px-6 py-3 transition-all duration-300
            ${ selecionado ? 'bg-violet text-white' : 'bg-yellow'}`} onClick={handleButtonClick}>{ horario }</button>
        {selecionado && (
            <button
                className="fixed bottom-5 right-5 p-4 bg-red-500 text-white rounded"
                onClick={() => alert('Reserva Confirmada!')}>
                Confirmar Reserva
            </button>
        )}
        </>
    )
}