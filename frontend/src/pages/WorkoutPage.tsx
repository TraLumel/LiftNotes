import { Link, useParams } from 'react-router-dom'
import { workouts } from '../data/workouts'
import { formatNumber } from '../data/summary'

export function WorkoutPage() {
  const { id } = useParams()
  const workout = workouts.find(item => item.id === id)
  const back = <Link className="detail-back" to="/">← К дневнику</Link>
  if (!workout) return <>{back}<h1>Тренировка не найдена</h1></>

  const date = new Date(workout.date + 'T12:00:00')
  return (
    <>
      {back}
      <h1>{workout.title}</h1>
      <p className="subline">{date.toLocaleDateString('ru-RU', { dateStyle: 'long' })} · {workout.minutes} мин</p>
      {workout.exercises.map(exercise => (
        <section key={exercise.name}>
          <h2>{exercise.name}</h2>
          <div className="panel">
            <table aria-label={exercise.name}>
              <thead><tr><th>Подход</th><th className="numeric">Вес, кг</th><th className="numeric">Повторы</th></tr></thead>
              <tbody>{exercise.sets.map((set, index) => (
                <tr key={index}><td>{index + 1}</td><td className="numeric">{formatNumber(set.weight)}</td><td className="numeric">{set.reps}</td></tr>
              ))}</tbody>
            </table>
          </div>
        </section>
      ))}
      <section>
        <h2>Заметка</h2>
        <div className="panel note">
          <div className="muted">{workout.note ?? 'Нет записи'}</div>
        </div>
      </section>
    </>
  )
}
