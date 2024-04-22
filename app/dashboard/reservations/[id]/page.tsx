interface Reservation {
    id: number
    user: string
    room: string
    start_date: string
    end_date: string
    payment_status: string
    total_amount: number
}


export default function Page({ params }: { params: { id: string } }) {
    const reservation: Reservation = {
        id: parseInt(params.id),
        user: 'John Doe',
        room: 'A101',
        start_date: '2021-01-01',
        end_date: '2021-01-03',
        payment_status: 'pending',
        total_amount: 10000
    }
    return (
        <div>
            <h1>Reservation {reservation.id}</h1>
            <p>User: {reservation.user}</p>
            <p>Room: {reservation.room}</p>
            <p>Start Date: {reservation.start_date}</p>
            <p>End Date: {reservation.end_date}</p>
            <p>Payment Status: {reservation.payment_status}</p>
            <p>Total Amount: {reservation.total_amount}</p>
        </div>
    );
}