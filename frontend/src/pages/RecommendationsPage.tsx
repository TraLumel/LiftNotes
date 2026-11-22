import { Link } from 'react-router-dom'
import { workouts } from '../data/workouts'
import { benchHistory, formatDate, formatNumber } from '../data/summary'

export function RecommendationsPage() {
  const recent = benchHistory(workouts).slice(-2)
  const latest = recent.at(-1)
  return (
    <>
      <h1>Рекомендации</h1>
      <p className="subline">Демонстрационная рекомендация</p>
      {recent.length < 2 || !latest ? (
        <p className="panel note">Для сравнения нужны два занятия с жимом штанги лёжа.</p>
      ) : (
        <section className="panel">
          <div className="note">
            <h2>Сравни следующий жим с тренировкой {formatDate(latest.workout.date)}</h2>
            <p>Запиши вес и повторы каждого подхода. Тогда можно будет сравнить их с двумя последними занятиями.</p>
          </div>
          <table aria-label="Тренировки для сравнения">
            <thead><tr><th>Тренировка</th><th>Подходы в жиме</th></tr></thead>
            <tbody>{recent.map(({ workout, exercise }) => (
              <tr key={workout.id}>
                <td><Link to={'/workouts/' + workout.id}>{formatDate(workout.date)}</Link></td>
                <td>{exercise.sets.map(set => formatNumber(set.weight) + ' кг × ' + set.reps).join(', ')}</td>
              </tr>
            ))}</tbody>
          </table>
        </section>
      )}
    </>
  )
}
