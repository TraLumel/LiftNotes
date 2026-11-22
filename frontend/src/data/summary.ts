import { benchPress } from './workouts'
import type { Workout } from './workouts'

export function formatDate(date: string) {
  return new Date(date + 'T12:00:00').toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })
}

export function formatNumber(value: number) {
  return value.toLocaleString('ru-RU')
}

export function groupByWeek(records: Workout[]) {
  const groups = new Map<string, Workout[]>()
  const newestFirst = [...records].sort((a, b) => b.date.localeCompare(a.date))
  for (const workout of newestFirst) {
    const monday = new Date(workout.date + 'T12:00:00Z')
    const daysSinceMonday = (monday.getUTCDay() + 6) % 7
    monday.setUTCDate(monday.getUTCDate() - daysSinceMonday)
    const key = monday.toISOString().slice(0, 10)
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key)?.push(workout)
  }
  return groups
}

export function weekLabel(start: string) {
  const monday = new Date(start + 'T12:00:00Z')
  const sunday = new Date(monday)
  sunday.setUTCDate(monday.getUTCDate() + 6)
  const first = monday.getUTCMonth() === sunday.getUTCMonth() ? monday.getUTCDate() : formatDate(start)
  return first + '–' + formatDate(sunday.toISOString().slice(0, 10))
}

export function benchHistory(records: Workout[]) {
  const rows = []
  for (const workout of records) {
    const exercise = workout.exercises.find(item => item.name === benchPress)
    if (exercise && exercise.sets.length > 0) {
      const maxWeight = Math.max(...exercise.sets.map(set => set.weight))
      rows.push({ workout, exercise, maxWeight })
    }
  }
  return rows.sort((a, b) => a.workout.date.localeCompare(b.workout.date))
}
