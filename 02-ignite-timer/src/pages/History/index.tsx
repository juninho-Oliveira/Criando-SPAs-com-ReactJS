import { useContext } from "react";
import { formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { HistoryContainer, HistoryList, Status } from "./style";
import { CyclesContext } from "../../contexts/CyclesContext";

export function History() {

  const { cycles } = useContext(CyclesContext)


  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>
      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Inicio</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {
              cycles.map(cycle => {
                return (
                  <tr key={cycle.id}>
                    <td>{cycle.task}</td>
                    <td>{cycle.minutesAmount} minutos</td>
                    <td>{formatDistanceToNow(cycle.startDate, {
                      addSuffix: true,
                      locale: ptBR,
                    })}</td>
                    <td>
                      {cycle.finisheDate && (
                        <Status statusColor="green">Concluído</Status>
                      )}

                      {cycle.interrupteDate && (
                        <Status statusColor="red">Interrompido</Status>
                      )}

                      {!cycle.finisheDate && !cycle.interrupteDate && (
                        <Status statusColor="yellow">Em andamento</Status>
                      )}
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}