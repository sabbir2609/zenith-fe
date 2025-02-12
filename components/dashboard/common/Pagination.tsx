"use client"

import Link from 'next/link';
import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

interface PaginationProps {
    totalPages: number;
    baseURL: string;
}

export default function Pagination({ totalPages, baseURL }: PaginationProps) {
    const [active, setActive] = useState(1);

    const prevPage = active > 1 ? active - 1 : null;
    const nextPage = active < totalPages ? active + 1 : null;

    const startPage = active - 2 > 0 ? active - 2 : 1;
    const endPage = active + 2 <= totalPages ? active + 2 : totalPages;

    return (
        <div className="flex items-center justify-center space-x-2">
            {prevPage && (
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setActive(prevPage)}
                    asChild
                >
                    <Link href={`${baseURL}?page=${prevPage}`}>
                        <ChevronLeft className="h-4 w-4" />
                    </Link>
                </Button>
            )}

            {startPage > 1 && (
                <Button variant="outline" size="icon" disabled>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            )}

            {[...Array(endPage - startPage + 1)].map((_, i) => (
                <Button
                    key={i}
                    variant={active === startPage + i ? "default" : "outline"}
                    size="icon"
                    onClick={() => setActive(startPage + i)}
                    asChild
                >
                    <Link href={`${baseURL}?page=${startPage + i}`}>
                        {startPage + i}
                    </Link>
                </Button>
            ))}

            {endPage < totalPages && (
                <Button variant="outline" size="icon" disabled>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            )}

            {nextPage && (
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setActive(nextPage)}
                    asChild
                >
                    <Link href={`${baseURL}?page=${nextPage}`}>
                        <ChevronRight className="h-4 w-4" />
                    </Link>
                </Button>
            )}
        </div>
    );
}