import { Link } from 'react-router-dom'
import { benchPress, workouts } from '../data/workouts'
import { benchHistory, formatDate, formatNumber, groupByWeek, weekLabel } from '../data/summary'

export function ProgressPage() {
  const history = benchHistory(workouts)
  const weeks = groupByWeek(workouts)
  const first = history[0]
  const last = history.at(-1)
  const difference = last && first ? last.maxWeight - first.maxWeight : 0

  return (
    <>
      <h1>Прогресс и нагрузка</h1>
      <section>
        <h2>{benchPress}</h2>
        <div className="panel">
          <table aria-label="Рабочий вес в жиме">
            <thead><tr><th>Тренировка</th><th className="numeric">Макс. вес, кг</th></tr></thead>
            <tbody>
              {history.map(({ workout, maxWeight }) => (
                <tr key={workout.id}>
                  <td><Link to={'/workouts/' + workout.id}>{formatDate(workout.date)}</Link></td>
                  <td className="numeric">{formatNumber(maxWeight)}</td>
                </tr>
              ))}
              {!history.length && <tr><td colSpan={2}>Пока нет тренировок для сравнения.</td></tr>}
            </tbody>
          </table>
          {history.length > 1 && <p className="summary">Изменение за период · {difference > 0 ? '+' : ''}{formatNumber(difference)} кг</p>}
        </div>
      </section>
      <section>
        <h2>Тренировки по неделям</h2>
        <div className="panel">
          <table aria-label="Количество и длительность тренировок за неделю">
            <thead><tr><th>Неделя</th><th className="numeric">Занятия</th><th className="numeric">Время, мин</th></tr></thead>
            <tbody>
              {Array.from(weeks, ([start, records]) => (
                <tr key={start}>
                  <td>{weekLabel(start)}</td><td className="numeric">{records.length}</td>
                  <td className="numeric">{formatNumber(records.reduce((sum, item) => sum + item.minutes, 0))}</td>
                </tr>
              ))}
              {!weeks.size && <tr><td colSpan={3}>Записей пока нет.</td></tr>}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}
