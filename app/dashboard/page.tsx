import { ActivePersonCard, AlertDisplay, CustomerSatisfaction, DateTimeDisplay, FeedbackDisplay, Footer, GoalAlert, NpsDataDisplay, ReservationDataDisplay, RevenueGraphDisplay, StatCards, WeatherDisplay } from "@/components/dashboard/home";

export default function Page() {
    return (
        <>
            <div className="flex flex-wrap justify-between items-center mb-2 rounded-sm border border-1 shadow-sm">
                <DateTimeDisplay />
                <ActivePersonCard />
            </div>
            <div className="grid sm:grid-cols-4 gap-2 mb-2">
                <div className="col-span-2 shadow-md">
                    <WeatherDisplay />
                </div>
                <div className="col-span-2">
                    <StatCards />
                </div>
            </div>
            <ReservationDataDisplay />
            <div className="mb-2 rounded-sm">
                <AlertDisplay />
            </div>
            <div className="grid grid-cols-1 mb-2 rounded-sm shadow-md">
                <RevenueGraphDisplay />
            </div>
            <div className="mb-2">
                <GoalAlert />
            </div>
            <div className="mb-2 rounded-sm border">
                <NpsDataDisplay />
            </div>
            <div className="grid lg:grid-cols-2 gap-2 mb-2">
                <div className="mb-2 rounded-sm shadow-md">
                    <CustomerSatisfaction />
                </div>
                <div className="mb-2 rounded-sm shadow-md">
                    <FeedbackDisplay />
                </div>
            </div>
            <Footer />
        </>
    )
}
