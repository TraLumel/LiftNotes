import { Link } from 'react-router-dom'
import { workouts } from '../data/workouts'
import { formatDate, groupByWeek, weekLabel } from '../data/summary'

export function DiaryPage() {
  const weeks = groupByWeek(workouts)
  return (
    <>
      <h1>Дневник тренировок</h1>
      <p className="subline">История занятий · Демонстрационные данные</p>
      {weeks.size === 0 && <p>В дневнике пока нет тренировок.</p>}
      {Array.from(weeks, ([start, records]) => (
        <section key={start}>
          <h2>{weekLabel(start)}</h2>
          <div className="panel">
            {records.map(workout => (
              <div className="diary-row" key={workout.id}>
                <time dateTime={workout.date}>{formatDate(workout.date)}</time>
                <div>
                  <Link to={'/workouts/' + workout.id} aria-label={workout.title + ', ' + formatDate(workout.date)}>
                    {workout.title}
                  </Link>
                  <small>{workout.exercises.map(exercise => exercise.name).join(', ')}</small>
                </div>
                <div className="duration">{workout.minutes} мин<small>Упражнений: {workout.exercises.length}</small></div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </>
  )
}
