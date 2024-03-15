export default async function Page({ params }: { params: { id: number } }) {
    return (
        <div>
            <h1>Dashboard Devices</h1>
            <h3>
                Device Id is {params.id}
            </h3>
        </div>
    )
}