import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const MovieList = lazy(() => import('./components/MovieList'));
const MovieForm = lazy(() => import('./components/MovieForm'));

export default function App() {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes >
        <Route path="/" element={<MovieList />} />
        <Route path="/form" element={<MovieForm />} />
      </Routes>
    </Suspense>
  )
}