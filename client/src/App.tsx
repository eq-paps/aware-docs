import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import { AuthProvider } from './auth/AuthProvider'
import { DocsShell } from './components/DocsShell'
import { docs } from './data/docs'
import { internalNav } from './data/internalNav'
import { DocPage } from './pages/DocPage'
import { Overview } from './pages/Overview'
import { ProtectedDocPage } from './pages/ProtectedDocPage'
import './App.css'

function App() {
  return (
    <AuthProvider>
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
            {internalNav.map((item) => (
              <Route
                element={<ProtectedDocPage item={item} />}
                key={item.path}
                path={item.path.slice(1)}
              />
            ))}
            <Route path="*" element={<Navigate replace to="/" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
