import ProfileNavbar from "../../ComponentPages/ProfileNavbar";

export default function ProfileLayout({
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
