import Navbar from "../component/navbar";
import LegacyLoginForm from "../component/LegacyLoginForm";

export default function LoginPage() {
  return (
    <div>
      <Navbar isNav={true} />
      <LegacyLoginForm />
    </div>
  );
}
