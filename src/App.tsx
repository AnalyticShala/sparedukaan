import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ModelPage from './pages/ModelPage';
import { SelectionProvider } from './store/selection';
import { SmoothScrollProvider } from './lib/smoothScroll';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'parts/:brandId/:modelId', element: <ModelPage /> },
      { path: '*', element: <Home /> },
    ],
  },
]);

export default function App() {
  return (
    <SelectionProvider>
      <SmoothScrollProvider>
        <RouterProvider router={router} />
      </SmoothScrollProvider>
    </SelectionProvider>
  );
}
