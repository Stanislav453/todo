import { USERS_API_URL } from "../url";

export const PostUser = async ({ first }) => {
  try {
    const response = await fetch(`${USERS_API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
        fullName: values.fullName,
        password: values.password,
      }),
    });
    if (response.ok) {
      console.log("Post user is succesfull");
    } else {
      console.log("Failed to post user");
    }
  } catch (e) {
    console.log(e);
  }
};
