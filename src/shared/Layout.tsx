import { useNavigate } from "react-router-dom";
import { Flex, Typography } from "antd";
import AppMenu from "./Menu";
import { Outlet } from "react-router-dom";
import { observer } from "mobx-react-lite";
const { Text } = Typography;

const AppLayout: React.FC = observer(() => {
  const navigate = useNavigate();
  return (
    <>
        <Flex
          justify="space-between"
          align="center"
          style={{ position: "relative" }}
        >
          <AppMenu />
          <Text
            style={{ color: "#fff", fontSize: "32px", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            <b>Users Manager</b>
          </Text>
        </Flex>
        <Outlet />
    </>
  );
});

export default AppLayout;
