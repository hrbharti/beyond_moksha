import Navbar from "../component/navbar";
import LegacyResetPasswordForm from "../component/LegacyResetPasswordForm";
import { Suspense } from "react";

export default function ResetPasswordPage() {
  return (
    <div>
      <Navbar isNav={true} />
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            Loading...
          </div>
        }
      >
        <LegacyResetPasswordForm />
      </Suspense>
    </div>
  );
}
