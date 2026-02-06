import Navbar from "../component/navbar";
import LegacySignupForm from "../component/LegacySignupForm";

export default function SigninPage() {
  return (
    <div>
      <Navbar isNav={true} />
      <LegacySignupForm />
    </div>
  );
}
