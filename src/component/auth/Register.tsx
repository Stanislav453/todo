import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CustomButton } from "../CustomButton";
import { API_URL } from "../../api/url";
import { FormType } from "../../type";

export default function Register() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const passwordLength = 30;
  const passwordPower = 3;
  const minletterName = 3;
  const minletterNameError = `Name must have min ${minletterName} characters or less`;
  const onlyLetterError = "Only letters";
  const nameError = "Name must be 20 characters or less";
  const emailError = "Invalid email address";
  const required = "Is required";
  const passwordError = `Password must have min ${passwordPower} characters or less`;
  const confirmPasswordError = "Passwords must match";
  const failed = "Register is failed";
  const succesfull = "Register is succesfull";

  const formik = useFormik<FormType>({
    initialValues: {
      firstName: "",
      secondName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(minletterName, minletterNameError)
        .max(passwordLength, nameError)
        .matches(/^[A-Za-z]+$/, onlyLetterError)
        .required(required),
      secondName: Yup.string()
        .max(passwordLength, nameError)
        .matches(/^[A-Za-z]+$/, onlyLetterError)
        .required(required),
      email: Yup.string().email(emailError).required(required),
      password: Yup.string()
        .min(passwordPower, passwordError)
        .required(required),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], confirmPasswordError)
        .required(required),
    }),
    onSubmit: async (values, { resetForm }) => {
      if (
        !values.email ||
        !values.password ||
        !values.firstName ||
        !values.secondName ||
        !values.confirmPassword
      ) {
        setError(failed);

        return;
      }

      try {
        const response = await fetch(`${API_URL}users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: values.firstName,
            secondName: values.secondName,
            email: values.email,
            password: values.confirmPassword,
          }),
        });
        if (response.ok) {
          setSuccess(succesfull);
        } else {
          setError(failed);
        }
      } catch (e) {
        console.log(e);
      }

      resetForm();
    },
  });

  return (
    <main className="min-h-screen flex items-center justify-center bg-basicBg">
      <div className="bg-basicBox m-5 p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        {error && <p className="text-error mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="firstName"
              className={`${
                formik.touched.firstName && formik.errors.firstName
                  ? "text-error"
                  : "text-secondDefault"
              }`}
            >
              {formik.touched.firstName && formik.errors.firstName
                ? formik.errors.firstName
                : "First name"}
            </label>
            <input
              className="w-full px-3 py-2 border rounded-md"
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></input>
          </div>
          <div className="mb-4">
            <label
              htmlFor="secondName"
              className={`${
                formik.touched.secondName && formik.errors.secondName
                  ? "text-error"
                  : "text-secondDefault"
              }`}
            >
              {formik.touched.secondName && formik.errors.secondName
                ? formik.errors.secondName
                : "Second name"}
            </label>
            <input
              className="w-full px-3 py-2 border rounded-md"
              type="text"
              name="secondName"
              placeholder="Second Name"
              value={formik.values.secondName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></input>
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className={`${
                formik.touched.email && formik.errors.email
                  ? "text-error"
                  : "text-secondDefault"
              }`}
            >
              {formik.touched.email && formik.errors.email
                ? formik.errors.email
                : "Email"}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className={`${
                formik.touched.password && formik.errors.password
                  ? "text-error"
                  : "text-secondDefault"
              }`}
            >
              {formik.touched.password && formik.errors.password
                ? formik.errors.password
                : "Password"}
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Create password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className={`${
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? "text-error"
                  : "text-secondDefault"
              }`}
            >
              {formik.touched.confirmPassword && formik.errors.confirmPassword
                ? formik.errors.confirmPassword
                : "Confirm Password"}
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <CustomButton
            buttonName="register"
            customStyle="w-full rounded-md bg-formButton"
            action={formik.submitForm}
          />
        </form>
      </div>
    </main>
  );
}
