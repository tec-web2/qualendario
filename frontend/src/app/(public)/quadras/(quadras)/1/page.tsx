"use client"
import Image from "next/image"
import quadra from '/public/assets/bg-login.png'
import ButtonTime from "@/components/ButtonTime"
import Link from "next/link"
import { useState } from "react"

export default function Quadra1(){
  
    return(
        <section className="flex flex-1  flex-col pt-8 pr-8 pl-10 2xl:pt-10 2xl:pr-10 2xl:pl-14 pb-2 content-center font-bold">
            <div className="bg-white rounded-xl content- h-full drop-shadow-md p-6">
                <div className="text-center pt-4 text-violet text-3xl 2xl:text-4xl">
                    <h2>Qual a quadra voce deseja reservar?</h2>
                </div>
                <div className="flex justify-center gap-10 mt-10">
                    <select name="day-select" id="day-select" className="bg-violet text-white drop-shadow-md py-4 px-10 rounded-2xl border border-2 border-black">
                        <option value="" selected>
                            Selecione o dia
                        </option>                    
                    </select>
                    <select name="shift-select" id="shift-select" className="bg-violet text-white drop-shadow-md py-4 px-10 rounded-2xl border border-2 border-black">
                        <option value="" selected>
                            Selecione o turno
                        </option> 
                    </select>
                </div>
                <hr className="text-violet  mx-auto my-5"/>
                <div className="grid grid-cols-2 gap-4 justify-center text-violet">
                    <div className="text-center flex flex-col gap-4">
                        <h3 className="text-base">Quadra-1 (Futsal)</h3>
                        <div className="flex flex-col gap-1">
                            <span>Manhã</span>
                            <div className="flex justify-center gap-6">
                                <ButtonTime horario={"08:00h"}/>
                                <ButtonTime horario={"09:00h"}/>
                                <ButtonTime horario={"10:00h"}/>
                                <ButtonTime horario={"11:00h"}/>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span>Tarde</span>
                            <div className="flex justify-center gap-6">
                                <ButtonTime horario={"14:00h"}/>
                                <ButtonTime horario={"15:00h"}/>
                                <ButtonTime horario={"16:00h"}/>
                                <ButtonTime horario={"17:00h"}/>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span>Noite</span>
                            <div className="flex justify-center gap-6">
                                <ButtonTime horario={"18:00h"}/>
                                <ButtonTime horario={"19:00h"}/>
                                <ButtonTime horario={"20:00h"}/>
                                <ButtonTime horario={"21:00h"}/>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Image src={quadra} alt={""} height={300}></Image>
                    </div>
                </div>   
            </div>
        </section>
    )
}