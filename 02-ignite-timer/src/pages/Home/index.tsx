import { HandPalm, Play } from "phosphor-react";
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { differenceInSeconds } from 'date-fns'

import {
    HomeContainer,
    StartCountdowButton,
    StopCountdowButton,
} from "./styles";
import { createContext, useEffect, useState } from "react";
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";

// controlled / uncontrolled

/*
    function register (name: string) {

    return (
        onChange: () => void,
        onBlur: () => void,
        onFocus: () => void,
    )
    
    }

*/




/*interface NewCycleFromData {
    task: string
    minutesAmount: number
} */



interface Cycle {
    id: string,
    task: string,
    minutesAmount: number,
    startDate: Date,
    interrupteDate?: Date,
    finisheDate?: Date,

}
interface CyclesContextType {
    activeCycle: Cycle | undefined;
    activeCycleID: string | null;
    markCurrentCycleAsFinished: () => void;

}

export const CyclesContext = createContext({} as CyclesContextType)

export function Home() {
    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)


    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

    function markCurrentCycleAsFinished() {
        setCycles((state) => 
            state.map((cycle) => {
            if (cycle.id === activeCycleId) {
                return { ...cycle, finisheDate: new Date() }
            } else {
                return cycle
            }
        }),
    )
    }

    // function handleCreateNewCycle(data: NewCycleFromData) {

    //     const id = String(new Date().getTime())

    //     const newCycle: Cycle = {
    //         id,
    //         task: data.task,
    //         minutesAmount: data.minutesAmount,
    //         startDate: new Date(),
    //     }

    //     //sempre que um estado depender do anterior fazer nesse 
    //     //formato arrow function setCycles((state) => [...state, newCycle])
    //     setCycles((state) => [...state, newCycle])
    //     setActiveCycleId(id)
    //     setAmountSecondsPassed(0)

    //     reset();
    // }

    function handleInterreuptCycle() {


        setCycles((state) =>
            state.map((cycle) => {
                if (cycle.id === activeCycleId) {
                    return { ...cycle, interrupteDate: new Date() }
                } else {
                    return cycle
                }
            }),
        )

        setActiveCycleId(null)
    }





    // const task = watch('task')
    // const isSubmitDisabled = !task;

    /*
       * Prop Drilling -> Quando a gente tem MUITAS propriedades APENAS para comunicação entre componentes
       * Context API -> Permite compartilharmos informções entre VÀRIOS componentes ao mesmo tempo 
    */

    return (
        <HomeContainer>
            <form /*onSubmit={handleSubmit(handleCreateNewCycle)}*/ action="">
                <CyclesContext.Provider 
                value={{activeCycle, activeCycleID, markCurrentCycleAsFinished}}>
                    {/* <NewCycleForm /> */}
                    < Countdown />
                </CyclesContext.Provider>

                {activeCycle ? (
                    <StopCountdowButton onClick={handleInterreuptCycle} type="button">
                        <HandPalm size={24} />
                        Interromper
                    </StopCountdowButton>
                ) : (
                    <StartCountdowButton /*disabled={isSubmitDisabled}*/ type="submit">
                        <Play size={24} />
                        Começar
                    </StartCountdowButton>
                )}
            </form>
        </HomeContainer>
    )
}