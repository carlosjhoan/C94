import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from './components/Layout';
import { HomePage, MainCollectionPage, Catalogue } from './pages/Pages';
import { AnyCollection } from './components/Collection';
import { JerseyBuy } from './components/Tshirt';
// import Home from './pages/Home/Home';
// import Products from './pages/Products/Products';
// import ProductDetails from './pages/ProductDetails/ProductDetails';
// import Cart from './pages/Cart/Cart';
// import Checkout from './pages/Checkout/Checkout';
// import Account from './pages/Account/Account';
// import NotFound from './pages/404';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: 'home',
        element: <HomePage />
      },
      {
        path: 'colecciones',
        element: <MainCollectionPage />
      },
      {
        path: 'catalogo',
        element: <Catalogue />
      },
      {
        path: 'colecciones/:collectionId',
        element: <AnyCollection />
      },
      {
        path: 'lienzo/:collectionName/:playerName/:teamName/:season/:tshirtId',
        element: <JerseyBuy />
      },
      // {
      //   path: 'cart',
      //   element: <Cart />
      // },
      // {
      //   path: 'checkout',
      //   element: <Checkout />
      // },
      // {
      //   path: 'account',
      //   element: <Account />
      // },
      // {
      //   path: '*',
      //   element: <NotFound />
      // }
    ]
  }
]);

export default router;