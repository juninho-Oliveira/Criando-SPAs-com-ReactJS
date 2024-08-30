import {
    HomeContainer,
    StartCountdowButton,
    StopCountdowButton,
} from "./styles";

import { HandPalm, Play } from "phosphor-react";
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'


import { createContext, useState } from "react";
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
interface NewCycleFromData {
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
    activeCycleId: string | null;
    amountSecondsPassed: number;
    markCurrentCycleAsFinished: () => void;
    setSecondsPassed: ((seconds: number)=> void);

}

export const CyclesContext = createContext({} as CyclesContextType)

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod.number()
        .min(5, 'o ciclo precisa ser de no minimo 5 minutos. ')
        .max(60, 'o ciclo precisa ser de no máximo 60 minutos. '),
});

type NewCycleFromData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

    const newCycleForm = useForm<NewCycleFromData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    });

    const { handleSubmit, watch, reset } = newCycleForm

    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds)
    }

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

    function handleCreateNewCycle(data: NewCycleFromData) {
        const id = String (new Date().getTime())

        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        }

        setCycles((state)=> [...state, newCycle])
        setActiveCycleId(id)
        setAmountSecondsPassed(0)

        reset()
    }


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

    const task = watch('task')
    const isSubmitDisabled = !task;

    /*
       * Prop Drilling -> Quando a gente tem MUITAS propriedades APENAS para comunicação entre componentes
       * Context API -> Permite compartilharmos informções entre VÀRIOS componentes ao mesmo tempo 
    */

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
                <CyclesContext.Provider
                    value={{ 
                        activeCycle, 
                        activeCycleId, 
                        markCurrentCycleAsFinished,
                        amountSecondsPassed,
                        setSecondsPassed }}>
                    <FormProvider {...newCycleForm}>
                        <NewCycleForm />
                    </FormProvider>
                    < Countdown />
                </CyclesContext.Provider>

                {activeCycle ? (
                    <StopCountdowButton onClick={handleInterreuptCycle} type="button">
                        <HandPalm size={24} />
                        Interromper
                    </StopCountdowButton>
                ) : (
                    <StartCountdowButton disabled={isSubmitDisabled} type="submit">
                        <Play size={24} />
                        Começar
                    </StartCountdowButton>
                )}
            </form>
        </HomeContainer>
    )
}