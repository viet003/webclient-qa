import { Routes, Route, Navigate } from "react-router-dom";
import { Login, ForgotPass, Main, Profile, Employee, Department, Home, Account, Salary } from "./pages";
import { path } from "./ultils/containts";
import { useSelector } from "react-redux";

function App() {

  const { isLoggedIn, active } = useSelector(state => state.auth);

  return (
    <div>
      <Routes>
        <Route exact path={path.LOGIN} element={<Login />} />
        <Route path={path.MAIN} element={isLoggedIn ? <Main /> : <Navigate to={path.LOGIN}/>}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.PROFILE} element={<Profile />} />
          <Route path={path.ACCOUNT} element={<Account />} />
          <Route path={path.EMPLOYEE} element={<Employee />} />
          <Route path={path.DEPARTMENT} element={<Department />} />
          <Route path={path.SALARY} element={<Salary />} />
          <Route path={path.STAR} element={<Main />} />
        </Route>
        <Route path={path.FORGOTPASS} element={<ForgotPass />} /> 
      </Routes>
    </div>
  );
}

export default App;