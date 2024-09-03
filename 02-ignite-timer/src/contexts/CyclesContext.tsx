import { createContext, ReactNode, useState } from "react";

interface CreateCycleDate {
    task: string;
    minutesAmount: number;
}

interface Cycle {
    id: string,
    task: string,
    minutesAmount: number,
    startDate: Date,
    interrupteDate?: Date,
    finisheDate?: Date,

}

interface CyclesContextType {
    cycles: Cycles[];
    activeCycle: Cycle | undefined;
    activeCycleId: string | null;
    amountSecondsPassed: number;
    markCurrentCycleAsFinished: () => void;
    setSecondsPassed: ((seconds: number)=> void);
    createNewCycle: (data: CreateCycleDate) => void;
    interreuptCurrentCycle: () => void;

}

export const CyclesContext = createContext({} as CyclesContextType)

interface CyclesContextProviderProps {
    children: ReactNode
}


export function CyclesContextProvider({ children }: CyclesContextProviderProps) {
    
    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

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

    function createNewCycle(data: CreateCycleDate) {
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

        //reset()
    }


    function interreuptCurrentCycle() {


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

    return (
        <CyclesContext.Provider
          value={{
            activeCycle,
            activeCycleId,
            markCurrentCycleAsFinished,
            amountSecondsPassed,
            setSecondsPassed,
            createNewCycle,
            interreuptCurrentCycle,
            cycles,
          }}>
            {children}
          </CyclesContext.Provider>
    )
}