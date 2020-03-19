import Home from "./components/pages/home";
import Login from "./components/pages/login";
import Register from "./components/pages/register";
import Courses from "./components/pages/courses";

const routes = [
    {
        path: "/",
        exact: true,
        component: Home
    },
    {
        path: "/login",
        exact: true,
        component: Login
    },
    {
        path: "/signup",
        exact: true,
        component: Register
    },
    {
        path: "/courses",
        exact: true,
        component: Courses
    }
];

export default routes;
