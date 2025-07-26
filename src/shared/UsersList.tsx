import React from "react";
import { List, Card, Avatar, Space, Typography, Button, Flex } from "antd";
import {
  MailOutlined,
  IdcardOutlined,
  UserOutlined,
  PhoneOutlined,
  HomeOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import { useStore } from "../store/store-context";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
const { Text } = Typography;

const UserList: React.FC = observer(() => {
  const { items, deleteUser } = useStore();
  const navigate = useNavigate();

  return (
    <div style={{ padding: "24px", width: "70vw" }}>
      <List
        dataSource={items}
        renderItem={(user) => (
          <List.Item>
            <Card
              onClick={(e) => {
                e.preventDefault();
                navigate(`user/${user.id}`);
              }}
            >
              <Space
                direction="vertical"
                size="middle"
                style={{ width: "100%" }}
              >
                <Flex justify="space-between">
                  <Space>
                    <Avatar icon={<UserOutlined />} />
                    <Text strong>
                      {user.name || `Пользователь #${user.id}`}
                    </Text>
                  </Space>
                  <Button
                    style={{ zIndex: 2 }}
                    onClick={async (e) => {
                      e.stopPropagation();
                      await deleteUser(user.id).then(() => {
                        navigate("/");
                      });
                    }}
                  >
                    <DeleteOutlined />
                  </Button>
                </Flex>

                <Space align="start" direction="vertical">
                  <Space>
                    <IdcardOutlined />
                    <Text>ID: {user.id}</Text>
                  </Space>

                  <Space>
                    <MailOutlined />
                    <Text>{user.email}</Text>
                  </Space>

                  {user.telephone && (
                    <Space>
                      <PhoneOutlined />
                      <Text>{user.telephone}</Text>
                    </Space>
                  )}

                  {user.birthDate && (
                    <Space>
                      <HomeOutlined />
                      <Text>
                        Дата рождения:{" "}
                        {dayjs(user.birthDate).format("DD.MM.YYYY")}
                      </Text>
                    </Space>
                  )}
                </Space>
              </Space>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
});

export default UserList;
