export const DEMO_ME = {
  id: 1,
  name: "Mahmoud khamis",
  email: "admin@orthoai.com",
  role: "admin",
  image: null,
};

export const DEMO_CREDENTIALS = {
  email: "admin@orthoai.com",
  password: "admin123",
};

export const loginUser = async ({ identifier, password }) => {
  if (
    identifier === DEMO_CREDENTIALS.email &&
    password === DEMO_CREDENTIALS.password
  ) {
    return { access_token: "demo-static-token", user: DEMO_ME };
  }
  throw new Error("Invalid email or password");
};

export const getMe = async () => {
  return DEMO_ME;
};
