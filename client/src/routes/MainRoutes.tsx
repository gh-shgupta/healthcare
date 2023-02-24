import { lazy } from 'react';

// project imports
import AuthGuard from 'utils/route-guard/AuthGuard';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));
const ListedProducts = Loadable(lazy(() => import('views/pages/seller-pages/booked-items')));
const ListedItems = Loadable(lazy(() => import('views/pages/seller-pages/listed-products')));
const AddProducts = Loadable(lazy(() => import('views/pages/seller-pages/add-product')));
const ProductsRatings = Loadable(lazy(() => import('views/pages/seller-pages/products-ratings')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
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
        }
    ]
};

export default MainRoutes;
