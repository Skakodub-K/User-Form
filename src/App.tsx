import "./App.css";
import LoginForm from "./shared/LoginForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserStoreContext } from "./store/store-context";
import UserStore from "./store/store";
import { observer } from "mobx-react-lite";
import HomePage from "./pages/HomePage";
import EditForm from "./shared/EditForm";
import CreateForm from "./shared/CreateForm";
import AppLayout from "./shared/Layout";

const App = observer(() => {
  const userStore = new UserStore();

  return (
    <UserStoreContext.Provider value={userStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/user/:userId" element={<EditForm />} />
            <Route path="/create" element={<CreateForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserStoreContext.Provider>
  );
});

export default App;