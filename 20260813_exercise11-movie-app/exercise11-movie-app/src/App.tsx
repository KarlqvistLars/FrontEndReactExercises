import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
const NewMovieForm = lazy(() => import('./components/NewMovieForm'));
const MovieList = lazy(() => import('./components/MovieList'));
const MovieForm = lazy(() => import('./components/MovieForm'));

export default function App() {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes >
        <Route path="/" element={<MovieList />} />
        <Route path="/form" element={<MovieForm />} />
        <Route path="/new-movie" element={<NewMovieForm />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Suspense>
  )
}