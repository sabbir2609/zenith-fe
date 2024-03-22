"use client"

import Link from 'next/link';
import { useState } from 'react';

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
        <div className="join">
            {prevPage && (
                <Link href={`${baseURL}?page=${prevPage}`}>
                    <div className="join-item btn btn-square btn-sm lg:btn-md" onClick={() => setActive(prevPage)}>
                        «
                    </div>
                </Link>
            )}

            {startPage > 1 && <div className="join-item btn btn-square btn-sm lg:btn-md">...</div>}

            {[...Array(endPage - startPage + 1)].map((_, i) => (
                <Link href={`${baseURL}?page=${startPage + i}`} key={i}>
                    <div className={`join-item btn btn-square btn-sm lg:btn-md ${active === startPage + i ? 'btn-active' : ''}`} onClick={() => setActive(startPage + i)}>
                        {startPage + i}
                    </div>
                </Link>
            ))}

            {endPage < totalPages && <div className="join-item btn btn-square btn-sm lg:btn-md">...</div>}

            {nextPage && (
                <Link href={`${baseURL}?page=${nextPage}`}>
                    <div className="join-item btn btn-square btn-sm lg:btn-md" onClick={() => setActive(nextPage)}>
                        »
                    </div>
                </Link>
            )}
        </div>
    );
};