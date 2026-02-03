import ProfileNavbar from "../../ComponentPages/ProfileNavbar";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <ProfileNavbar />
      <main>{children}</main>
    </div>
  );
}
