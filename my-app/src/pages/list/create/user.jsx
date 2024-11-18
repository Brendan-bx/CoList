import { Button } from "@/components/Button";
import { Form } from "@/components/Form";
import { FormField } from "@/components/FormField";
import { useRouter } from "next/router";
import { nameValidator, emailValidator, passwordValidator } from "@/validators";
import axios from "axios";
import { Formik } from "formik";
import * as yup from "yup";

const initialValues = {
  name: "",
  email: "",
  password: "",
};
const validationSchema = yup.object({
  name: nameValidator,
  email: emailValidator,
  password: passwordValidator,
});
const CreateUserPage = () => {
  const router = useRouter();
  const handleSubmit = async (values) => {
    await axios.post("http://localhost:3000/api/users/create/user", values);
    router.push("/");
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form className="flex justify-center">
          <p className="text-3xl m-4">Sign up</p>
          <FormField
            className="w-80 text-neutral-950"
            name="name"
            placeholder="Type name ..."
            label="Name"
          />
          <FormField
            className="w-80 text-neutral-950"
            name="email"
            placeholder="Type email ..."
            label="Email"
          />
          <FormField
            type="password"
            className="w-80 text-neutral-950"
            name="password"
            placeholder="Type password ..."
            label="Password"
          />

          <Button type="submit">Sign up</Button>
        </Form>
      </Formik>
    </>
  );
};

export default CreateUserPage;
