import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import { DocsShell } from './components/DocsShell'
import { docs } from './data/docs'
import { DocPage } from './pages/DocPage'
import { Overview } from './pages/Overview'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DocsShell />}>
          <Route index element={<Overview />} />
          {docs.map((doc) => (
            <Route
              element={<DocPage doc={doc} />}
              key={doc.path}
              path={doc.path.slice(1)}
            />
          ))}
          <Route path="*" element={<Navigate replace to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
