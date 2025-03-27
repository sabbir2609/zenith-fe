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
    capitalizeLinks?: boolean
}

const Breadcrumb = ({
    homeElement,
    separator = "/",
    containerClasses,
    listClasses,
    activeClasses = "font-medium text-foreground",
    capitalizeLinks = false
}: Props) => {
    const paths = usePathname()
    const pathNames = paths.split('/').filter(path => path)

    return (
        <div className={containerClasses}>
            <BreadcrumbRoot>
                <BreadcrumbList className={listClasses}>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">{homeElement}</BreadcrumbLink>
                    </BreadcrumbItem>

                    {pathNames.length > 0 && <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>}

                    {pathNames.map((link, index) => {
                        const href = `/${pathNames.slice(0, index + 1).join('/')}`;
                        const isActive = paths === href;
                        const itemLink = capitalizeLinks
                            ? link[0].toUpperCase() + link.slice(1)
                            : link;

                        return (
                            <React.Fragment key={index}>
                                <BreadcrumbItem>
                                    {isActive ? (
                                        <BreadcrumbPage className={activeClasses}>
                                            {itemLink}
                                        </BreadcrumbPage>
                                    ) : (
                                        <BreadcrumbLink href={href}>
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
                </BreadcrumbList>
            </BreadcrumbRoot>
        </div>
    )
}

export default Breadcrumb