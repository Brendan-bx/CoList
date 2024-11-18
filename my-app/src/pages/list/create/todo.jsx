import { Button } from "@/components/Button";
import { Form } from "@/components/Form";
import { FormField } from "@/components/FormField";
import { useRouter } from "next/router";
import { nameValidator, contentValidator, descValidator } from "@/validators";
import axios from "axios";
import { Formik } from "formik";
import * as yup from "yup";

const initialValues = {
  name: "",
  content: "",
};
const validationSchema = yup.object({
  name: nameValidator,
  content: contentValidator,
  description: descValidator,
});
const CreateTodoPage = () => {
  const router = useRouter();
  const handleSubmit = async (values, { resetForm }) => {
    await axios.post("http://localhost:3000/api/todos/create/todo", values);
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
          <p className="text-3xl m-4">Add a todo</p>
          <FormField
            className="w-80 text-neutral-950"
            name="name"
            placeholder="Type the todo name ..."
            label="Name"
          />
          <FormField
            className="w-80 text-neutral-950"
            name="description"
            placeholder="Type the todo description ..."
            label="Description"
          />
          <FormField
            className="w-80 text-neutral-950"
            name="content"
            placeholder="Type the todo content ..."
            label="Content"
          />

          <Button type="submit">Create</Button>
        </Form>
      </Formik>
    </>
  );
};

export default CreateTodoPage;
