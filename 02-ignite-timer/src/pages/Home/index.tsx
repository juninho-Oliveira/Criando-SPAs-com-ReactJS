import { Play } from "phosphor-react";
import { CountdownContainer, FormConatiner, HomeContainer, Separator } from "./styles";



export function Home() {
    return (
        <HomeContainer>
            <form action="">
                <FormConatiner>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <input id="task" />

                    <label htmlFor="minutesAmount">durante</label>
                    <input type="number" id="minutesAmount" />

                    <span>minutos.</span>
                </FormConatiner>

                <CountdownContainer>
                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span>
                    <span>0</span>
                </CountdownContainer>

                <button type="submit">
                    <Play size={24}/>
                    Começar
                </button>
            </form>
        </HomeContainer>
    )
}