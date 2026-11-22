export interface WorkoutSet {
  weight: number
  reps: number
}

export interface Exercise {
  name: string
  sets: WorkoutSet[]
}

export interface Workout {
  id: string
  date: string
  title: string
  minutes: number
  exercises: Exercise[]
  note?: string
}

export const benchPress = 'Жим штанги лёжа'

function twoSets(name: string, weight: number, reps: number): Exercise {
  return { name, sets: [{ weight, reps }, { weight, reps }] }
}

export const workouts: Workout[] = [
  {
    id: 'upper-11', date: '2026-11-11', title: 'Верх тела', minutes: 40,
    exercises: [twoSets(benchPress, 40, 8), twoSets('Тяга блока', 30, 10)],
  },
  {
    id: 'lower-14', date: '2026-11-14', title: 'Ноги', minutes: 35,
    exercises: [twoSets('Присед со штангой', 50, 8), twoSets('Румынская тяга', 30, 6)],
  },
  {
    id: 'upper-18', date: '2026-11-18', title: 'Верх тела', minutes: 45,
    exercises: [twoSets(benchPress, 42.5, 8), twoSets('Тяга блока', 30, 10)],
    note: 'В жиме сохранил по восемь повторений в обоих подходах.',
  },
  {
    id: 'lower-21', date: '2026-11-21', title: 'Ноги', minutes: 40,
    exercises: [twoSets('Присед со штангой', 52.5, 8), twoSets('Румынская тяга', 30, 6)],
  },
]
