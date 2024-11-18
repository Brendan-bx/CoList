import { Button } from "@/components/Button";
import { Form } from "@/components/Form";
import { FormField } from "@/components/FormField";

import axios from "axios";
import { Formik } from "formik";
import { useRouter } from "next/router";
import * as yup from "yup";
import {
  contentValidator,
  nameValidator,
  descValidator,
} from "../../../validators";

export const getServerSideProps = async ({ query: { todoId } }) => {
  const { data: todo } = await axios.get(
    `http://localhost:3000/api/todos/${todoId}`
  );
  return { props: { todo } };
};

const validationSchema = yup.object({
  name: nameValidator,
  description: descValidator,
  content: contentValidator,
});

const TodoEditPage = ({ todo }) => {
  const router = useRouter();
  const initialValues = todo;

  const handleSubmit = async (values) => {
    await axios.patch(`http://localhost:3000/api/todos/${todo._id}`, values);
    router.push("/");
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="flex justify-center">
          <p className="text-3xl m-4">Edit todo</p>
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
          <Button type="submit">Edit</Button>
        </Form>
      </Formik>
    </>
  );
};

export default TodoEditPage;
