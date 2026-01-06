import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom';
import HomePage from './pages/HomePage';
import MainLayout from './layouts/MainLayout';
import AlgorithmsPage from './pages/AlgorithmsPage';
import NotFoundPage from './pages/NotFoundPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout />} >
      <Route index element={<HomePage />}/>
      <Route path='/algorithms' element={<AlgorithmsPage/>}/>
      <Route path='*' element={<NotFoundPage/>}/>
    </Route>
  )
);

const App = () => {
  return < RouterProvider router={router} />;
};
export default App;
