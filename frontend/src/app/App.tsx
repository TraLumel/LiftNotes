import { Link, Route, Routes } from 'react-router-dom'
import { DiaryPage } from '../pages/DiaryPage'
import { ProgressPage } from '../pages/ProgressPage'
import { RecommendationsPage } from '../pages/RecommendationsPage'
import { WorkoutPage } from '../pages/WorkoutPage'
import { AppLayout } from './AppLayout'

export function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<DiaryPage />} />
        <Route path="workouts/:id" element={<WorkoutPage />} />
        <Route path="progress" element={<ProgressPage />} />
        <Route path="recommendations" element={<RecommendationsPage />} />
        <Route path="*" element={
          <>
            <h1>Страница не найдена</h1>
            <p><Link to="/">К дневнику</Link></p>
          </>
        } />
      </Route>
    </Routes>
  )
}
