import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import Input from "./common/Input";
import RadioInput from "./common/RadioInput";
import Select from "./common/SelectComponent";

const radioOptions = [
  { label: "male", value: "0" },
  { label: "female", value: "1" },
];

const selectOptions = [
  { label: "select nationality", value: "" },
  { label: "Iran", value: "IR" },
  { label: "Germany", value: "GER" },
  { label: "USA", value: "US" },
];

const SignUpform = () => {
  const [formValues, setFormValues] = useState(null);

  const formik = useFormik({
    initialValues: formValues || {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
      passwordConfirm: "",
      gender: "",
      nationality: "",
    },
    onSubmit: (values) => console.log(values),
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Name is required")
        .min(6, "Name length is not valid"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      phoneNumber: Yup.string()
        .required("Phone Number is required")
        .matches(/^[0-9]{11}$/, "Invalid Phone Number")
        .nullable(),
      password: Yup.string()
        .required("Password is required")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        ),
      passwordConfirm: Yup.string()
        .required("Password Confirmation is required")
        .oneOf([Yup.ref("password"), null], "Password must match"),
      gender: Yup.string().required("Gender is required"),
      nationality: Yup.string().required("Select Nationality !"),
    }),
    validateOnMount: true,
    enableReinitialize: true,
  });
  console.log("form errors", formik.values);

  useEffect(() => {
    try {
      const getData = async () => {
        const { data } = await axios.get("http://localhost:3001/users/1");
        setFormValues(data);
      };
      getData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Input formik={formik} name="name" label="Name" />
        <Input formik={formik} name="email" label="Email" />
        <Input formik={formik} name="phoneNumber" label="Phone Number" />
        <Input
          formik={formik}
          name="password"
          label="Password"
          type="password"
        />
        <Input
          formik={formik}
          name="passwordConfirm"
          label="Password Confirmation"
          type="password"
        />
        <RadioInput radioOptions={radioOptions} formik={formik} name="gender" />
        <Select
          selectOptions={selectOptions}
          name="nationality"
          formik={formik}
        />
        <button type="submit" disabled={!formik.isValid}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignUpform;
