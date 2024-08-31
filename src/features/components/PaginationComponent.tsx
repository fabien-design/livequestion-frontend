"use client";

import {
    PaginationContent,
    PaginationItem,
    PaginationPrevious,
    PaginationLink,
    PaginationEllipsis,
    PaginationNext,
    Pagination,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

type PaginationProps = {
    pagesNumber: number;
    currentPageNumber: number;
    className?: string;
};

export const PaginationComponent = ({
    pagesNumber,
    currentPageNumber,
    className,
}: PaginationProps) => {
    const currentPage = usePathname();

    const hasPreviousPage = currentPageNumber > 1;
    const hasNextPage = currentPageNumber < pagesNumber;

    const getPaginationItems = () => {
        const items = [];
        items.push(1);

        // Show left ellipsis if needed
        if (currentPageNumber > 3) {
            items.push("left-ellipsis");
        }

        // Show pages around the current page
        const startPage = Math.max(2, currentPageNumber - 1);
        const endPage = Math.min(pagesNumber - 1, currentPageNumber + 1);

        for (let i = startPage; i <= endPage; i++) {
            items.push(i);
        }

        // Show right ellipsis if needed
        if (currentPageNumber < pagesNumber - 2) {
            items.push("right-ellipsis");
        }

        if (pagesNumber > 1) {
            items.push(pagesNumber);
        }

        return items;
    };

    const paginationItems = getPaginationItems();

    const router = useRouter();
    if (currentPageNumber > pagesNumber) {
        router.push(`${currentPage}?page=${pagesNumber}`);
        return null;
    } else if (currentPageNumber < 1) {
        router.push(`${currentPage}?page=1`);
        return null;
    }

    return (
        <Pagination className={cn(className)}>
            <PaginationContent>
                {hasPreviousPage ? (
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                router.push(
                                    `${currentPage}?page=${
                                        currentPageNumber - 1
                                    }`
                                );
                            }}
                        />
                    </PaginationItem>
                ) : (
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            tabIndex={-1}
                            aria-disabled={true}
                            className={"pointer-events-none opacity-50"}
                        >
                            Test
                        </PaginationPrevious>
                    </PaginationItem>
                )}

                {paginationItems.map((item, index) => {
                    if (item === "left-ellipsis" || item === "right-ellipsis") {
                        return (
                            <PaginationItem
                                key={`pagination_ellipsis_${index}`}
                            >
                                <PaginationEllipsis className="h-6 w-6 sm:h-9 sm:w-9" />
                            </PaginationItem>
                        );
                    } else {
                        const isActive = currentPageNumber === item;
                        const href = `${currentPage}?page=${item}`;
                        return (
                            <PaginationItem key={`pagination_item_${item}`}>
                                <PaginationLink
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        router.push(href);
                                    }}
                                    isActive={isActive}
                                    className="h-6 w-6 sm:h-9 sm:w-9" 
                                >
                                    {item}
                                </PaginationLink>
                            </PaginationItem>
                        );
                    }
                })}

                {hasNextPage ? (
                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                router.push(
                                    `${currentPage}?page=${
                                        currentPageNumber + 1
                                    }`
                                );
                            }}
                        />
                    </PaginationItem>
                ) : (
                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            aria-disabled={true}
                            tabIndex={-1}
                            className={"pointer-events-none opacity-50"}
                        >
                            Test
                        </PaginationNext>
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>
    );
};
