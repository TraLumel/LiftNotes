import { ListItemButton } from '@mui/material'
import { Link, Outlet, useLocation } from 'react-router-dom'
import './layout.css'

const sections = [
  { path: '/', label: 'Дневник' },
  { path: '/progress', label: 'Прогресс и нагрузка' },
  { path: '/recommendations', label: 'Рекомендации' },
]

export function AppLayout() {
  const { pathname } = useLocation()
  const currentSection = pathname.startsWith('/workouts/') ? '/' : pathname

  return (
    <div className="workspace">
      <aside className="sidebar">
        <Link to="/" className="brand" aria-label="LiftNotes — дневник тренировок">
          <span className="book-mark" aria-hidden="true" />LiftNotes
        </Link>
        <nav aria-label="Разделы дневника">
          {sections.map(section => (
            <ListItemButton key={section.path} component={Link} to={section.path}
              selected={currentSection === section.path}
              aria-current={currentSection === section.path ? 'location' : undefined}>
              {section.label}
            </ListItemButton>
          ))}
        </nav>
      </aside>
      <main className="content"><Outlet /></main>
    </div>
  )
}
