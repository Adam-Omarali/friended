"use client";

function OnBoard({
  searchParams,
}: {
  searchParams?: { uid: string; name: string; email: string };
}) {
  console.log(searchParams);
  return <div>OnBoard</div>;
}

export default OnBoard;
