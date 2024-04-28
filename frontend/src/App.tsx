import { createBrowserRouter } from 'react-router-dom';
import './App.css';
import { Blog } from './pages/Blog';
import { Blogs } from './pages/Blogs';
import { Signin } from './pages/Signin';
import { Signup } from './pages/Signup';

const router = createBrowserRouter([
    {
        path: '/:id',
        element: <Blog />
    },
    {
        path: 'signup',
        element: <Signup />
    },
    {
        path: 'signin',
        element: <Signin />
    },
    {
        path: 'blogs',
        element: <Blogs />
    }
]);

export default router;
