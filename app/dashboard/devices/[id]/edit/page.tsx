export default async function Page({ params }: { params: { id: string } }) {
    return (
        <div className="container">
            <h1>Edit Device</h1>
            <p>Device ID: {params.id}</p>
        </div>
    );
}