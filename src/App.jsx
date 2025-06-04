import React, { lazy, Suspense, useEffect } from "react";
import Login from "./Pages/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser, removerUser } from "../Redux/authSlice";
import { auth } from "./Firebase";
import { onAuthStateChanged } from "firebase/auth";
import LoaderScreen from "./utils/LoaderScreen";
import ErrorPage from "./utils/ErrorPage";

const App = () => {

  const UserAccount = lazy(()=>import("./Pages/UserAccount"))
  const Home =lazy(()=>import('./Pages/Home'))
  const Movies = lazy(()=>import("./Pages/Movies"))
  const Watch= lazy(()=>import("./Pages/Watch"))
  const Browse= lazy(()=>import("./Pages/Browse"))
  const Whislist= lazy(()=>import("./Pages/Whislist"))

  const dispatch = useDispatch();
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element:(<Suspense fallback={<LoaderScreen/>}>
        <Browse/>
      </Suspense>),
    },
    {
      path: "/login",
      element: <Login/>,
    },
    {
      path: "/home",
      element: (<Suspense fallback={<LoaderScreen/>}>
        <Home />
      </Suspense>),
    },
    {
      path: "/watch",
      element: (<Suspense fallback={<LoaderScreen/>}>
        <Watch />
      </Suspense>),
    },
    {
      path: "/movies",
      element: (<Suspense fallback={<LoaderScreen/>}>
        <Movies/>
      </Suspense>),
    },
    {
      path: "/user",
      element: (<Suspense fallback={<LoaderScreen/>}>
        <UserAccount/>
      </Suspense>),
    },
     {
      path: "/whislist",
      element:(<Suspense fallback={<LoaderScreen/>}>
        <Whislist />
      </Suspense>),
    },
    {
      path: "*",
      element:<ErrorPage/>,
    },
   
  ]);

  useEffect(() => {

    const unsubcribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setUser({
            name: user.displayName,
            photoUrl: user.photoURL,
            email: user.email,
            uid: user.uid
          }),
        );

        
      } else {
        dispatch(removerUser());
      }
    });

    return () => unsubcribe();
  }, []);

  return <RouterProvider router={appRouter} />;
};

export default App;
