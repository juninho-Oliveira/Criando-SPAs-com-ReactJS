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
import { useEffect, useState } from "react";
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

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod.number()
        .min(5, 'o ciclo precisa ser de no minimo 5 minutos. ')
        .max(60, 'o ciclo precisa ser de no máximo 60 minutos. '),
})


/*interface NewCycleFromData {
    task: string
    minutesAmount: number
} */

type NewCycleFromData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
    id: string,
    task: string,
    minutesAmount: number,
    startDate: Date,
    interrupteDate?: Date,
    finisheDate?: Date,

}

export function Home() {
    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)


    const { register, handleSubmit, watch, reset } = useForm({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    })

    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);


    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

    useEffect(() => {

        let interval: number;

        if (activeCycle) {
            
            interval = setInterval(() => {
                const secondsDifference = differenceInSeconds(
                    new Date(),
                     activeCycle.startDate,
                    )

                    if(secondsDifference >= totalSeconds) {
                        setCycles((state) => 
                            state.map((cycle) => {
                            if (cycle.id === activeCycleId) {
                                return { ...cycle, finisheDate: new Date() }
                            } else {
                                return cycle
                            }
                        }),
                    )


                    setAmountSecondsPassed(totalSeconds)

                    clearInterval(interval)
                    } else {
                        setAmountSecondsPassed(secondsDifference)
                    }
                        
            }, 1000)
        }

        return () => {
            clearInterval(interval)
        }

    }, [activeCycle, totalSeconds, activeCycleId])


    function handleCreateNewCycle(data: NewCycleFromData) {

        const id = String(new Date().getTime())

        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        }

        //sempre que um estado depender do anterior fazer nesse 
        //formato arrow function setCycles((state) => [...state, newCycle])
        setCycles((state) => [...state, newCycle])
        setActiveCycleId(id)
        setAmountSecondsPassed(0)

        reset();
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



    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

    const minutesAmount = Math.floor(currentSeconds / 60)
    const secondsAmount = currentSeconds % 60

    const minutes = String(minutesAmount).padStart(2, '0')
    const seconds = String(secondsAmount).padStart(2, '0')

    useEffect(() => {
        if (activeCycle) {
            document.title = `${minutes}:${seconds}`
        }
    }, [minutes, seconds, activeCycle])

    const task = watch('task')
    const isSubmitDisabled = !task;

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)}>
                <NewCycleForm />
                < Countdown />
                
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