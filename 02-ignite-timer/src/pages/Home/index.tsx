import {
    HomeContainer,
    StartCountdowButton,
    StopCountdowButton,
} from "./styles";

import { HandPalm, Play } from "phosphor-react";
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";
import { useContext } from "react";
import { CyclesContext } from "../../contexts/CyclesContext";

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


const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod.number()
        .min(5, 'o ciclo precisa ser de no minimo 5 minutos. ')
        .max(60, 'o ciclo precisa ser de no máximo 60 minutos. '),
});

type NewCycleFromData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {

    const { activeCycle, createNewCycle, interreuptCurrentCycle } = useContext((CyclesContext))

    const newCycleForm = useForm<NewCycleFromData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    });

    const { handleSubmit, watch, reset } = newCycleForm
    
    function handleCreateNewCycle (data: NewCycleFromData) {
        createNewCycle(data)
        reset()
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
                
                    <FormProvider {...newCycleForm}>
                        <NewCycleForm />
                    </FormProvider>
                    < Countdown />
                

                {activeCycle ? (
                    <StopCountdowButton onClick={interreuptCurrentCycle} type="button">
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