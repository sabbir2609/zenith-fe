import { ActivePersonCard, DateTimeDisplay, Hero, StatCards, WeatherDisplay } from "@/components/dashboard/home";

export default function Page() {
    return (
        <>

            {/* <!-- 1st Row --> */}
            <div className="grid grid-cols-2 gap-2 mb-2">

                <DateTimeDisplay />

                <ActivePersonCard />

            </div>

            {/* first row ends here  */}


            {/* <!-- 2nd Row --> */}

            <div className="grid sm:grid-cols-4 gap-2 mb-2">

                {/* sub col 1 */}
                <div className="col-span-2 shadow-md">
                    <WeatherDisplay />
                </div>

                {/* sub col 2 */}

                <div className="col-span-2 shadow-md">

                    <StatCards />

                </div>

            </div>

            {/* 2nd row ends here */}


            {/* <!-- 3rd Row --> */}
            <div className="mb-2 border border-red-700">

                <div className="grid grid-cols-2 mb-1">
                    <div className="bg-pink-500 p-2">
                        <p className="font-bold">Header</p>
                    </div>
                    <div className="bg-yellow-500 p-2">
                        <p className="font-bold">Dropdown</p>
                    </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-2">

                    <div className="card">
                        <div className="bg-indigo-500 p-2">
                            <p className="font-bold">3rd Row - Card 1 </p>
                        </div>
                    </div>

                    <div className="card">
                        <div className="bg-indigo-500 p-2">
                            <p className="font-bold">3rd Row - Card 2 </p>
                        </div>
                    </div>

                    <div className="card">
                        <div className="bg-indigo-500 p-2">
                            <p className="font-bold">3rd Row - Card 3 </p>
                        </div>
                    </div>

                </div>

            </div>

            {/* 3rd row ends here */}

            {/* <!-- 4th Row --> */}
            <div className="grid grid-cols-1 mb-2">
                <div className="bg-blue-500 p-4">
                    <p className="font-bold">4th Row - Card</p>
                </div>
            </div>

            {/* <!-- 5th Row --> */}
            <div className="mb-2 border border-orange-500">

                <div className="grid grid-cols-2">
                    <div className="bg-pink-500 p-2">
                        <p className="font-bold">Header</p>
                    </div>
                    <div className="bg-yellow-500 p-2">
                        <p className="font-bold">Dropdown</p>
                    </div>
                </div>

                <div className="card">
                    <div className="bg-indigo-500 p-2">
                        <p className="font-bold">5th Row Card</p>
                    </div>
                </div>

            </div>

            {/* 5th row ends here */}

            {/* <!-- 6th Row --> */}
            <div className="mb-2">
                <div className="bg-yellow-500 p-4 ">
                    <p className="font-bold">6th Row - Card</p>
                </div>
            </div>

            {/* 6th row ends here */}

            {/* <!-- 7th Row --> */}
            <div className="grid grid-cols-2 gap-2 mb-2">
                <div>
                    <div className="bg-purple-500 p-4 ">
                        <p className="font-bold">7th Row - 1st Column</p>
                    </div>
                </div>
                <div>
                    <div className="bg-pink-500 p-4 ">
                        <p className="font-bold">7th Row - 2nd Column</p>
                    </div>
                </div>
            </div>

            {/* <!-- 8th Row --> */}
            <div className="mb-2">
                <div className="bg-indigo-500 p-4 ">
                    <p className="font-bold">8th Row - Card</p>
                </div>
            </div>

        </>
    )
}
