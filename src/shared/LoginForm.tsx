import { Form, Input, Button, Card, Typography } from "antd";
import { Formik } from "formik";
import * as Yup from "yup";
import { useStore } from "../store/store-context";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
const { Title } = Typography;

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Некорректный email").required("Обязательное поле"),
  password: Yup.string()
    .min(5, "Пароль должен содержать минимум 5 символов")
    .required("Обязательное поле"),
});

const LoginForm = observer(() => {
  const userStore = useStore();
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    await userStore.login(values).then(() => {
      navigate("/");
    });
    console.log("Форма отправлена:", values);
    setTimeout(() => {
      setSubmitting(false);
    }, 1000);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems:'center', padding: "24px" }}>
      <Card style={{ width: 400 }}>
        <Title level={2} style={{ textAlign: "center", marginBottom: 24 }}>
          Вход в систему
        </Title>

        <Formik
          initialValues={initialValues}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <Form layout="vertical" onFinish={handleSubmit}>
              <Form.Item
                label="Email"
                help={touched.email && errors.email ? errors.email : ""}
                validateStatus={touched.email && errors.email ? "error" : ""}
              >
                <Input
                  name="email"
                  type="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  placeholder="Введите ваш email"
                />
              </Form.Item>

              <Form.Item
                label="Пароль"
                help={
                  touched.password && errors.password ? errors.password : ""
                }
                validateStatus={
                  touched.password && errors.password ? "error" : ""
                }
              >
                <Input.Password
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="Введите ваш пароль"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={isSubmitting}
                  disabled={isSubmitting}
                >
                  Войти
                </Button>
              </Form.Item>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
});

export default LoginForm;
