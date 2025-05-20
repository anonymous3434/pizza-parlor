import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy } from 'react';
import Cart from './features/cart/Cart';
import Menu, { loader as menuLoader } from './features/menu/Menu';
import CreateOrder, {
  action as createOrderAction,
} from './features/order/CreateOrder';
import { action as updateOrderAction } from './features/order/UpdateOrder';
import Order, { loader as orderLoader } from './features/order/Order';
import AppLyout from './ui/AppLyout';
import Error from './ui/Error';
const Home = lazy(() => import('./ui/Home'));
function App() {
  const router = createBrowserRouter([
    {
      element: <AppLyout />,
      fallbackElement: <div>Loading...</div>, // ✅ This is the HydrateFallback
      errorElement: <Error />,
      children: [
        { path: '/', element: <Home /> },
        {
          path: '/menu',
          element: <Menu />,
          loader: menuLoader,
          errorElement: <Error />,
        },
        { path: '/cart', element: <Cart /> },
        {
          path: '/order/new',
          element: <CreateOrder />,
          action: createOrderAction,
        },
        {
          path: '/order/:orderId',
          element: <Order />,
          loader: orderLoader,
          errorElement: <Error />,
          action: updateOrderAction,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
