import React from "react";
import { Menu, Dropdown, Button } from "antd";
import { UserAddOutlined, LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/store-context";
import { observer } from "mobx-react-lite";

const AppMenu: React.FC = observer(() => {
  const navigate = useNavigate();
  const { logout } = useStore();
  const menu = (
    <Menu>
      <Menu.Item
        key="createUser"
        icon={<UserAddOutlined />}
        onClick={() => {
          navigate("/create");
        }}
      >
        Создать пользователя
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item
        key="logout"
        icon={<LogoutOutlined />}
        onClick={async () => {
          await logout().then(() => {
            navigate("/login");
          });
        }}
      >
        Выйти
      </Menu.Item>
    </Menu>
  );

  return (
    <div style={{ padding: "20px" }}>
      <Dropdown overlay={menu} trigger={["click"]}>
        <Button type="primary" shape="round">
          Меню
        </Button>
      </Dropdown>
    </div>
  );
});

export default AppMenu;
