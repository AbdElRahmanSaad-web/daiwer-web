import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1>Login</h1>
      <button
        onClick={() => {
          navigate("/register");
        }}
      >
        Register
      </button>
    </>
  );
};
