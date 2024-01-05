import Image from "next/image";

export default function Page() {
    return (
        <section>
            <h1 className="text-3xl font-bold tracking-tight">Guest List:</h1>
            <div className="m-3 border rounded">
                <ul role="list" className="divide-y py-1 px-6">
                    <li className="py-3 sm:py-4">
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                                <Image className="rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-1.jpg" alt="Neil image" width={50} height={50} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">
                                    Neil Sims
                                </p>
                                <p className="text-sm truncate">
                                    email@windster.com
                                </p>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold">

                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
    )
}