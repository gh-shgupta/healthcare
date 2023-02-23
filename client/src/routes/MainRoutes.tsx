import { lazy } from 'react';

// project imports
import AuthGuard from 'utils/route-guard/AuthGuard';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));
const BookedItems = Loadable(lazy(() => import('views/pages/seller-pages/booked-items')));
const ListedItems = Loadable(lazy(() => import('views/pages/seller-pages/listed-products')));

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
            element: <BookedItems />
        },
        {
            path: '/sample-page',
            element: <SamplePage />
        },
        {
            path: '/booked-items',
            element: <BookedItems />
        },
        {
            path: '/listed-products',
            element: <ListedItems />
        },
        {
            path: '/product-ratings',
            element: <ListedItems />
        },
        {
            path: '/add-products',
            element: <ListedItems />
        }
    ]
};

export default MainRoutes;
