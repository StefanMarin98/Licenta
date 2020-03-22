import Login from "./components/pages/login";
import Register from "./components/pages/register";

const routes = [
    {
        path: "/login",
        exact: true,
        component: Login
    },
    {
        path: "/signup",
        exact: true,
        component: Register
    }
];

export default routes;