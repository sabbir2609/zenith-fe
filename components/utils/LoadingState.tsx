export default function LoadingState() {
    return (
        <div className="h-screen justify-center items-center text-center flex mx-4">
            <div className="flex flex-col gap-4 w-full">
                <div className="skeleton h-28 w-full"></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="font-bold text-4xl">
                    Loading...
                </div>
                <p>
                    If it&apos;s takes too long try reloading the page.
                </p>
                <div className="skeleton h-28 w-full"></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
            </div>
        </div>
    );
}