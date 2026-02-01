import { Suspense } from "react";
import TributeNavbar from "../../ComponentPages/TributeNavbar";
import LoginForm from "../../ComponentPages/LoginForm";

export default function page() {
  return (
    <div>
      <TributeNavbar />
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            Loading...
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}
