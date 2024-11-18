import { Button } from "@/components/Button";
import { Form } from "@/components/Form";
import { FormField } from "@/components/FormField";
import { useRouter } from "next/router";
import { emailValidator, passwordValidator } from "@/validators";
import axios from "axios";
import { Formik } from "formik";
import * as yup from "yup";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = yup.object({
  email: emailValidator,
  password: passwordValidator,
});

const LoginPage = () => {
  const router = useRouter();

  const handleSubmit = async (
    values,
    { setSubmitting, resetForm, setErrors }
  ) => {
    try {
      const response = await axios.post("/api/users/login", values);
      localStorage.setItem("token", response.data.token);
      router.push("/");
    } catch (error) {
      if (error.response?.status === 401) {
        setErrors({
          email: "Invalid credentials",
          password: "Invalid credentials",
        });
        resetForm();
      } else {
        console.error("Unexpected error:", error);
        alert("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ isSubmitting }) => (
        <Form className="flex justify-center">
          <p className="text-3xl m-4">Login</p>
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

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginPage;
