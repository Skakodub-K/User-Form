import React, { useEffect } from "react";
import { Spin } from "antd";
import { useStore } from "../store/store-context";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import UserList from "../shared/UsersList";
const HomePage = observer(() => {
  const userStore = useStore();
  const navigate = useNavigate();

  const loadData = async () => {
    try {
      await userStore.getCurrentUser().then(async () => {
        await userStore.loadUsers();
      });
    } catch (error) {
      console.log(error);
      if (error instanceof Error && error.message.includes("status: 401")) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "24px" }}>
      {userStore.isLoading ? <Spin size="large"></Spin> : <UserList />}
    </div>
  );
});

export default HomePage;
