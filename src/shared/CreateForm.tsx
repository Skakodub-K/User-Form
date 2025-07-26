import { useState } from "react";
import {
  Form,
  Input,
  Button,
  Spin,
  Card,
  Typography,
  DatePicker,
  Switch,
} from "antd";
import { Formik } from "formik";
import * as Yup from "yup";
import { observer } from "mobx-react-lite";
import { useStore } from "../store/store-context";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;
const { TextArea } = Input;

const phoneRegExp = /^\+?[0-9\s\-\(\)]{10,15}$/;

const CreateSchema = Yup.object().shape({
  name: Yup.string().required("Обязательное поле"),
  surName: Yup.string().required("Обязательное поле"),
  email: Yup.string().email("Некорректный email").required("Обязательное поле"),
  password: Yup.string()
    .min(5, "Пароль должен содержать минимум 5 символов")
    .required("Обязательное поле"),
  fullName: Yup.string().required("Обязательное поле"),
  birthDate: Yup.date().nullable(),
  telephone: Yup.string().required("Обязательное поле")
    .matches(phoneRegExp, "Некорректный номер телефона"),
  employment: Yup.string(),
  userAgreement: Yup.boolean(),
});

const CreateForm = observer(() => {
  const userStore = useStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const initialValues = {
    name: "",
    surName: "",
    email: "",
    password: "",
    fullName: "",
    birthDate: null,
    telephone: "",
    employment: "",
    userAgreement: false,
  };

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      setLoading(true);
      await userStore.createUser(values).then(() => {
        navigate("/");
      });
    } catch (error) {
      console.error("Ошибка при создании:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "24px" }}>
      <Card style={{ width: 600 }}>
        <Title level={2} style={{ textAlign: "center", marginBottom: 24 }}>
          Создание нового пользователя
        </Title>

        <Formik
          initialValues={initialValues}
          validationSchema={CreateSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
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
                  placeholder="Введите email"
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
                  placeholder="Введите пароль"
                />
              </Form.Item>

              <Form.Item
                label="Имя"
                help={touched.name && errors.name ? errors.name : ""}
                validateStatus={touched.name && errors.name ? "error" : ""}
              >
                <Input
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  placeholder="Введите имя"
                />
              </Form.Item>

              <Form.Item
                label="Фамилия"
                help={touched.surName && errors.surName ? errors.surName : ""}
                validateStatus={
                  touched.surName && errors.surName ? "error" : ""
                }
              >
                <Input
                  name="surName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.surName}
                  placeholder="Введите фамилию"
                />
              </Form.Item>

              <Form.Item
                label="Полное имя"
                help={
                  touched.fullName && errors.fullName ? errors.fullName : ""
                }
                validateStatus={
                  touched.fullName && errors.fullName ? "error" : ""
                }
              >
                <Input
                  name="fullName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.fullName}
                  placeholder="Введите полное имя"
                />
              </Form.Item>

              <Form.Item
                label="Дата рождения"
                help={
                  touched.birthDate && errors.birthDate ? errors.birthDate : ""
                }
                validateStatus={
                  touched.birthDate && errors.birthDate ? "error" : ""
                }
              >
                <DatePicker
                  style={{ width: "100%" }}
                  value={values.birthDate}
                  onChange={(date) => setFieldValue("birthDate", date)}
                  format="DD.MM.YYYY"
                />
              </Form.Item>

              <Form.Item
                label="Телефон"
                help={
                  touched.telephone && errors.telephone ? errors.telephone : ""
                }
                validateStatus={
                  touched.telephone && errors.telephone ? "error" : ""
                }
              >
                <Input
                  name="telephone"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.telephone}
                  placeholder="Введите телефон"
                />
              </Form.Item>

              <Form.Item
                label="Место работы"
                help={
                  touched.employment && errors.employment
                    ? errors.employment
                    : ""
                }
                validateStatus={
                  touched.employment && errors.employment ? "error" : ""
                }
              >
                <TextArea
                  name="employment"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.employment}
                  placeholder="Введите место работы"
                  rows={3}
                />
              </Form.Item>

              <Form.Item
                label="Пользовательское соглашение"
                help={
                  touched.userAgreement && errors.userAgreement
                    ? errors.userAgreement
                    : ""
                }
                validateStatus={
                  touched.userAgreement && errors.userAgreement ? "error" : ""
                }
              >
                <Switch
                  checked={values.userAgreement}
                  onChange={(checked) =>
                    setFieldValue("userAgreement", checked)
                  }
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={isSubmitting}
                >
                  Создать пользователя
                </Button>
              </Form.Item>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
});

export default CreateForm;
