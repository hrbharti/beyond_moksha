import Navbar from "../component/navbar";
import LegacyForgotPasswordForm from "../component/LegacyForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <div>
      <Navbar isNav={true} />
      <LegacyForgotPasswordForm />
    </div>
  );
}
