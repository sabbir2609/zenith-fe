"use client"

import { useState } from 'react';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

interface PaginationProps {
    totalPages: number;
    baseURL: string;
}

export default function PaginationComponent({ totalPages, baseURL }: PaginationProps) {
    const [active, setActive] = useState(1);

    const prevPage = active > 1 ? active - 1 : null;
    const nextPage = active < totalPages ? active + 1 : null;

    const startPage = active - 2 > 0 ? active - 2 : 1;
    const endPage = active + 2 <= totalPages ? active + 2 : totalPages;

    if (totalPages <= 1) {
        return null;
    }

    return (
        <Pagination>
            <PaginationContent>
                {prevPage && (
                    <PaginationItem>
                        <PaginationPrevious
                            href={`${baseURL}?page=${prevPage}`}
                            onClick={() => setActive(prevPage)}
                        />
                    </PaginationItem>
                )}

                {startPage > 1 && (
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                )}

                {[...Array(endPage - startPage + 1)].map((_, i) => (
                    <PaginationItem key={i}>
                        <PaginationLink
                            href={`${baseURL}?page=${startPage + i}`}
                            isActive={active === startPage + i}
                            onClick={() => setActive(startPage + i)}
                        >
                            {startPage + i}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                {endPage < totalPages && (
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                )}

                {nextPage && (
                    <PaginationItem>
                        <PaginationNext
                            href={`${baseURL}?page=${nextPage}`}
                            onClick={() => setActive(nextPage)}
                        />
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>
    );
}