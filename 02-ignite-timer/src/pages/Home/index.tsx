import { Play } from "phosphor-react";
import {
    CountdownContainer,
    FormConatiner,
    HomeContainer,
    MinutesAmountInput,
    Separator,
    StartCountdowButton,
    TaskInput
} from "./styles";



export function Home() {
    return (
        <HomeContainer>
            <form action="">
                <FormConatiner>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput
                        id="task"
                        list="task-suggestions"
                        placeholder="Dê um nome para o seu projeto" />

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
                        max={60}/>

                    <span>minutos.</span>
                </FormConatiner>

                <CountdownContainer>
                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span>
                    <span>0</span>
                </CountdownContainer>

                <StartCountdowButton type="submit">
                    <Play size={24} />
                    Começar
                </StartCountdowButton>
            </form>
        </HomeContainer>
    )
}