export default async function Page({ params }: { params: { id: string } }) {
  const resolveParams = await params;
  const id = resolveParams.id;
  console.log(id);

  return (
    <div className="container mx-auto py-6 space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Edit User</h1>
      <p>User ID: {id}</p>
      <p>Page to edit user information</p>
    </div>
  );
}
