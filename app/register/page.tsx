import RegisterComponent from "./registerComponent";

import "../styles.css";

export default async function Register({
  searchParams,
}: {
  searchParams: { uid: string; name: string };
}) {
  return <RegisterComponent id={searchParams.uid} name={searchParams.name} />;
}
