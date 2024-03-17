'use client' // Error components must be Client Components

import { useEffect } from 'react'
import Image from 'next/image'
import { errorImage } from '@/public/static'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <Image className="mx-auto w-auto" src={errorImage} alt="Workflow" />
                    <h2 className="mt-6 text-center text-3xl font-extrabold">
                        Something went wrong!
                    </h2>
                </div>
                <div>
                    <button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={
                            () => reset()
                        }
                    >
                        Try again
                    </button>
                </div>
            </div>
        </div>
    )
}