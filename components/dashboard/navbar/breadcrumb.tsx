'use client'

import React, { ReactNode } from 'react'
import { usePathname } from 'next/navigation'

import {
    Breadcrumb as BreadcrumbRoot,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface Props {
    homeElement: ReactNode,
    separator?: ReactNode,
    containerClasses?: string,
    listClasses?: string,
    activeClasses?: string,
    capitalizeLinks?: boolean,
    maxDisplayedOnMobile?: number
}

const Breadcrumb = ({
    homeElement,
    separator = "/",
    containerClasses,
    listClasses,
    activeClasses = "font-medium text-foreground",
    capitalizeLinks = false,
    maxDisplayedOnMobile = 2
}: Props) => {
    const paths = usePathname()
    const pathNames = paths.split('/').filter(path => path)

    // For mobile view, we may want to limit the number of breadcrumbs shown
    const isMobileView = maxDisplayedOnMobile > 0 && pathNames.length > maxDisplayedOnMobile
    const mobilePathNames = isMobileView
        ? [...pathNames.slice(0, 1), ...pathNames.slice(-maxDisplayedOnMobile + 1)]
        : pathNames

    return (
        <div className={`overflow-x-auto max-w-full ${containerClasses || ''}`}>
            <BreadcrumbRoot>
                <BreadcrumbList className={`flex-wrap text-sm md:text-base ${listClasses || ''}`}>
                    {/* Home element is always visible */}
                    <BreadcrumbItem>
                        <BreadcrumbLink className="whitespace-nowrap" href="/">{homeElement}</BreadcrumbLink>
                    </BreadcrumbItem>

                    {pathNames.length > 0 && <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>}

                    {/* Show ellipsis on mobile if we're truncating */}
                    {isMobileView && (
                        <>
                            <BreadcrumbItem className="md:hidden">
                                <BreadcrumbPage>...</BreadcrumbPage>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="md:hidden">{separator}</BreadcrumbSeparator>
                        </>
                    )}

                    {/* Desktop view - all breadcrumbs */}
                    <div className="hidden md:contents">
                        {pathNames.map((link, index) => {
                            const href = `/${pathNames.slice(0, index + 1).join('/')}`;
                            const isActive = paths === href;
                            const itemLink = capitalizeLinks
                                ? link[0].toUpperCase() + link.slice(1)
                                : link;

                            return (
                                <React.Fragment key={`desktop-${index}`}>
                                    <BreadcrumbItem>
                                        {isActive ? (
                                            <BreadcrumbPage className={`truncate max-w-[160px] ${activeClasses}`}>
                                                {itemLink}
                                            </BreadcrumbPage>
                                        ) : (
                                            <BreadcrumbLink href={href} className="truncate max-w-[120px]">
                                                {itemLink}
                                            </BreadcrumbLink>
                                        )}
                                    </BreadcrumbItem>

                                    {index < pathNames.length - 1 && (
                                        <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </div>

                    {/* Mobile view - truncated breadcrumbs */}
                    <div className="contents md:hidden">
                        {mobilePathNames.map((link, index) => {
                            // Calculate the actual index in the full path array
                            const actualIndex = isMobileView && index >= 1
                                ? pathNames.length - mobilePathNames.length + index
                                : index;

                            const href = `/${pathNames.slice(0, actualIndex + 1).join('/')}`;
                            const isActive = paths === href;
                            const itemLink = capitalizeLinks
                                ? link[0].toUpperCase() + link.slice(1)
                                : link;

                            return (
                                <React.Fragment key={`mobile-${index}`}>
                                    <BreadcrumbItem>
                                        {isActive ? (
                                            <BreadcrumbPage className={`truncate max-w-[120px] ${activeClasses}`}>
                                                {itemLink}
                                            </BreadcrumbPage>
                                        ) : (
                                            <BreadcrumbLink href={href} className="truncate max-w-[100px]">
                                                {itemLink}
                                            </BreadcrumbLink>
                                        )}
                                    </BreadcrumbItem>

                                    {index < mobilePathNames.length - 1 && (
                                        <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </div>
                </BreadcrumbList>
            </BreadcrumbRoot>
        </div>
    )
}

export default Breadcrumb