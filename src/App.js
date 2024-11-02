import { Routes, Route } from "react-router-dom";
import { Login, ForgotPass, Main, Profile, Employee, Department, Home, Account } from "./pages";
import { path } from "./ultils/containts";

function App() {
  return (
    <div>
      <Routes>
        <Route exact path={path.LOGIN} element={<Login />} />
        <Route path={path.MAIN} element={<Main />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.PROFILE} element={<Profile />} />
          <Route path={path.ACCOUNT} element={<Account />} />
          <Route path={path.EMPLOYEE} element={<Employee />} />
          <Route path={path.DEPARTMENT} element={<Department />} />
          {/* <Route path={path.COURSE} element={<Course />} />
          <Route path={path.TOPIC} element={<Topic />} />
          <Route path={`${path.TOPIC}/:topicid`} element={<Modules />}>
            <Route path={path.ANNOUNCEMENT} element={<Announcements />} />
            <Route path={path.PEOPLES} element={<Peoples />} />
            <Route path={`${path.ANNOUNCEMENT}/:id`} element={<Comments />} />
          </Route>
          <Route path={`${path.LOOKUP}/:topicid`} element={<Modules />}>
            <Route path={path.ANNOUNCEMENT} element={<Announcements />} />
            <Route path={path.PEOPLES} element={<Peoples />} />
            <Route path={`${path.ANNOUNCEMENT}/:id`} element={<Comments />} />
          </Route> */}
          {/* <Route path={path.USER} element={<User />} /> */}
        </Route>
        <Route path={path.FORGOTPASS} element={<ForgotPass />} /> 
      </Routes>
    </div>
  );
}

export default App;