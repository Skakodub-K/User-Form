import { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Spin,
  Card,
  Typography,
  Switch,
} from "antd";
import { Formik } from "formik";
import * as Yup from "yup";
import { observer } from "mobx-react-lite";
import { useStore } from "../store/store-context";
import { useNavigate, useParams } from "react-router-dom";
import type { UserPatchDto } from "../types";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const { Title } = Typography;
const { TextArea } = Input;

const EditSchema = Yup.object().shape({
  name: Yup.string().required("Обязательное поле"),
  surName: Yup.string().required("Обязательное поле"),
  fullName: Yup.string(),
  birthDate: Yup.date().nullable(),
  telephone: Yup.string(),
  employment: Yup.string(),
  userAgreement: Yup.boolean(),
});

const EditForm = observer(() => {
  const userStore = useStore();
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const [initialValues, setInitialValues] = useState<UserPatchDto>({
    name: "",
    surName: "",
    fullName: "",
    birthDate: null,
    telephone: "",
    employment: "",
    userAgreement: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      if (userId) {
        setLoading(true);
        try {
          const user = await userStore.getUserById(userId);
          setInitialValues({
            name: user?.name || "",
            surName: user?.surName || "",
            fullName: user?.fullName || "",
            birthDate: user?.birthDate ? dayjs(user.birthDate) : null,
            telephone: user?.telephone || "",
            employment: user?.employment || "",
            userAgreement: user?.userAgreement || false,
          });
        } catch (error) {
          console.error("Ошибка загрузки пользователя:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadUserData();
  }, [userId, userStore]);

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const patchData = {
        ...values,
        birthDate: values.birthDate
          ? new Date(dayjs(values.birthDate).toISOString())
          : null,
      };

      if (userId) {
        await userStore.updateUser(userId, patchData);
      }
    } catch (error) {
      console.error("Ошибка при обновлении:", error);
    }
    navigate("/");
  };

  if (loading) {
    return <Spin size="large"></Spin>;
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "24px" }}>
      <Card style={{ width: 600 }}>
        <Title level={2} style={{ textAlign: "center", marginBottom: 24 }}>
          Редактирование пользователя
        </Title>

        <Formik
          initialValues={initialValues}
          validationSchema={EditSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            setFieldValue,
            handleSubmit,
            isSubmitting,
          }) => (
            <Form layout="vertical" onFinish={handleSubmit}>
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
                  value={values.birthDate ? dayjs(values.birthDate) : null}
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
                  Сохранить изменения
                </Button>
              </Form.Item>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
});

export default EditForm;
