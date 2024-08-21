import { Play } from "phosphor-react";
import { useForm } from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import * as zod from 'zod'

import {
    CountdownContainer,
    FormConatiner,
    HomeContainer,
    MinutesAmountInput,
    Separator,
    StartCountdowButton,
    TaskInput
} from "./styles";

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
    .min(5,  'o ciclo precisa ser de no minimo 5 minutos. ')
    .max(60, 'o ciclo precisa ser de no máximo 60 minutos. '),
})


/*interface NewCycleFromData {
    task: string
    minutesAmount: number
} */

    type NewCycleFromData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
    const { register, handleSubmit, watch, formState} = useForm({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0, 
        }
    })

    function handleCreateNewCycle(data: NewCycleFromData) {
        console.log(data)
    }

    console.log(formState.errors)

    const task = watch('task')
    const isSubmitDisabled = !task;

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)}>
                <FormConatiner>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput
                        id="task"
                        list="task-suggestions"
                        placeholder="Dê um nome para o seu projeto"
                        {...register('task')} />

                    <datalist id ='task-suggestions'>
                        <option value="Projeto 1"/>
                        <option value="Projeto 2"/>
                        <option value="Projeto 3"/>
                        <option value="Banana"/>

                    </datalist>

                    <label htmlFor="minutesAmount">durante</label>
                    <MinutesAmountInput
                        type="number"
                        id="minutesAmount"
                        placeholder="00"
                        step={5} 
                        min={5}
                        //max={60}
                        {...register('minutesAmount', {valueAsNumber: true})}
                        />

                    <span>minutos.</span>
                </FormConatiner>

                <CountdownContainer>
                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span>
                    <span>0</span>
                </CountdownContainer>

                <StartCountdowButton  disabled={isSubmitDisabled} type="submit">
                    <Play size={24} />
                    Começar
                </StartCountdowButton>
            </form>
        </HomeContainer>
    )
}