import {Route, createHashRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom';
import HomePage from './pages/HomePage';
import MainLayout from './layouts/MainLayout';
import AlgorithmsPage from './pages/AlgorithmsPage';
import NotFoundPage from './pages/NotFoundPage';
import SelectionSortPage from './pages/SelectionSortPage';
import HeapSortPage from './pages/HeapSortPage';
import InsertionSortPage from './pages/InsertionSortPage';

const router = createHashRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout />} >
      <Route index element={<HomePage />}/>
      <Route path='/algorithms' element={<AlgorithmsPage homepage='false'/>}/>
      <Route path='/practice-SelectionSort' element={<SelectionSortPage />}/>
      <Route path='/practice-HeapSort' element={<HeapSortPage />}/>
      <Route path='/practice-InsertionSort' element={<InsertionSortPage />}/>
      <Route path='*' element={<NotFoundPage/>}/>
    </Route>
  )
);

const App = () => {
  return < RouterProvider router={router} />;
};
export default App;
