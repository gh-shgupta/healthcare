import { lazy } from 'react';

// project imports
import AuthGuard from 'utils/route-guard/AuthGuard';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// seller page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));
const ListedProducts = Loadable(lazy(() => import('views/pages/seller-pages/listed-products')));
const ListedItems = Loadable(lazy(() => import('views/pages/seller-pages/booked-items')));
const AddProducts = Loadable(lazy(() => import('views/pages/seller-pages/add-product')));
const ProductsRatings = Loadable(lazy(() => import('views/pages/seller-pages/products-ratings')));

// buyer page routing
const BuyProducts = Loadable(lazy(() => import('views/pages/buyer-pages/products')));
const BuyNow = Loadable(lazy(() => import('views/pages/buyer-pages/buy-now')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
        // ============== || SELLER ROUTING || ===============//
        {
            path: '/',
            element: <ListedProducts />
        },
        {
            path: '/sample-page',
            element: <SamplePage />
        },
        {
            path: '/listed-products',
            element: <ListedProducts />
        },
        {
            path: '/listed-products',
            element: <ListedItems />
        },
        {
            path: '/product-ratings',
            element: <ProductsRatings />
        },
        {
            path: '/add-products',
            element: <AddProducts />
        },

        // ============== || BUYER ROUTING || ===============//
        {
            path: '/buy-products',
            element: <BuyProducts />
        },
        {
            path: '/product-sammary-page',
            element: <BuyNow />
        }
    ]
};

export default MainRoutes;
