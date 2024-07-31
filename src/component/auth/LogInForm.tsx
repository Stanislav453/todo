import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { USERS_API_URL } from "../../api/url";
import { FormTypeLogIn } from "../../type";
import { UserType } from "../../type";
import { CustomButton } from "../CustomButton";
import { useUserData } from "../../stores/useUserData";
import { useNavigate } from "react-router-dom";

export default function LogInForm() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const setUser = useUserData((state) => state.updateUserData);
  const navigate = useNavigate();

  const emailError = "Invalid email address";
  const emailRequired = "Email is required";
  const passwordRequired = "Password is required";
  const incorectFill = "You enter an incorrect password or name";

  const formik = useFormik<FormTypeLogIn>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email(emailError).required(emailRequired),
      password: Yup.string().required(passwordRequired),
    }),
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      setSubmitting(false);

      const url = new URL(`${USERS_API_URL}users`);
      url.searchParams.append("email", values.email);

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data: UserType[] = await response.json();

          const activeUser = {
            id: data[0].id,
            name: `${data[0].firstName} ${data[0].secondName} `,
          };

          localStorage.setItem("activeUser", JSON.stringify(activeUser));

          setUser(data);
          setSuccess("LogIn success");

          navigate("/");
          location.reload();
        } else {
          setError(incorectFill);
        }
      } catch (e) {
        console.log(e);
      }
      resetForm();
    },
  });

  return (
    <main className="min-h-screen flex items-center justify-center bg-basicBg">
      <div className="bg-basicBox p-8 m-5 rounded m shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <p className="text-error mb-4 text-center">{incorectFill}</p>}
        {success && <p className=" text-success mb-4 text-center">{success}</p>}
        <form onSubmit={formik.handleSubmit}>
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
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-6">
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
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <CustomButton
            buttonName="logIn"
            customStyle="w-full rounded-md bg-formButton"
            action={formik.submitForm}
          />
        </form>
      </div>
    </main>
  );
}
