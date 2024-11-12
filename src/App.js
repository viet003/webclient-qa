import { Routes, Route, Navigate } from "react-router-dom";
import { Login, ForgotPass, Main, Profile, Employee, Department, Home, Account, Salary, SalaryTax } from "./pages";
import { path } from "./ultils/containts";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

function App() {

  const { isLoggedIn, token } = useSelector(state => state.auth);
  const type = token ? jwtDecode(token)?.type : 0

  return (
    <div>
      <Routes>
        <Route exact path={path.LOGIN} element={<Login />} />
        <Route path={path.MAIN} element={isLoggedIn ? <Main /> : <Navigate to={path.LOGIN} />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.PROFILE} element={<Profile />} />
          <Route path={path.TAX} element={<SalaryTax />} />
          <Route path={path.ACCOUNT} element={type === 2 ? <Account /> : <Home /> } />
          <Route path={path.EMPLOYEE} element={type !== 0 ? <Employee /> : <Home /> } />
          <Route path={path.DEPARTMENT} element={type === 2 ? <Department /> : <Home /> } />
          <Route path={path.SALARY} element={type === 2 ? <Salary /> : <Home /> } />
          <Route path={path.STAR} element={<Home />} />
        </Route>
        <Route path={path.FORGOTPASS} element={<ForgotPass />} />
        <Route path={path.STAR} element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;