import { ActivePersonCard, AlertDisplay, CustomerSatisfaction, DateTimeDisplay, FeedbackDisplay, Footer, GoalAlert, NpsDataDisplay, RevenueGraphDisplay, StatCards, WeatherDisplay } from "@/components/dashboard/home";

export default function Page() {
    return (
        <>

            {/* <!-- 1st Row --> */}
            <div className="flex flex-wrap justify-between items-center mb-2 rounded-sm border border-1 shadow-sm">
                <DateTimeDisplay />
                <ActivePersonCard />
            </div>
            {/* first row ends here  */}


            {/* <!-- 2nd Row --> */}
            <div className="grid sm:grid-cols-4 gap-2 mb-2">
                <div className="col-span-2 shadow-md">
                    <WeatherDisplay />
                </div>
                <div className="col-span-2">
                    <StatCards />
                </div>
            </div>
            {/* 2nd row ends here */}


            {/* <!-- 3rd Row --> */}
            <div className="mb-2 rounded-sm">
                <AlertDisplay />
            </div>
            {/* 3rd row ends here */}

            {/* <!-- 4th Row --> */}
            <div className="grid grid-cols-1 mb-2 rounded-sm shadow-md">
                <RevenueGraphDisplay />
            </div>
            {/* 4th row ends here */}


            {/* <!-- 5th Row --> */}
            <div className="mb-2">
                <GoalAlert />
            </div>
            {/* 5th row ends here */}

            {/* <!-- 6th Row --> */}
            <div className="mb-2 rounded-sm shadow-md">
                <NpsDataDisplay />
            </div>

            {/* 6th row ends here */}

            {/* <!-- 7th Row --> */}
            <div className="grid lg:grid-cols-2 gap-2 mb-2">
                <div className="mb-2 rounded-sm shadow-md">
                    <CustomerSatisfaction />
                </div>
                <div className="mb-2 rounded-sm shadow-md">
                    <FeedbackDisplay />
                </div>
            </div>

            {/* <!-- 8th Row --> */}
            <Footer />

        </>
    )
}
