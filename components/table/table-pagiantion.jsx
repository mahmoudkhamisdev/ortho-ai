import {
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";

import { usePagination } from "@/hooks/use-pagination";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { startLoader } from "@/components/common/routes-loading";
import { useRouter } from "next/navigation";

export default function TablePagination({
  currentPage,
  totalPages,
  paginationItemsToDisplay = 5,
  table,
}) {
  const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
    currentPage,
    totalPages,
    paginationItemsToDisplay,
  });
  const router = useRouter();

  const handleNavigate = (type, page) => {
    const params = new URLSearchParams(window.location.search);

    if (type === "first" || type === "last") {
      params.set("page", page);
      table && table.setPageIndex(page - 1);
    } else if (type === "prev") {
      if (currentPage > 1) {
        params.set("page", currentPage - 1);
        table && table.previousPage();
      }
    } else if (type === "next") {
      if (currentPage < totalPages) {
        params.set("page", currentPage + 1);
        table && table.nextPage();
      }
    } else if (type === "page") {
      params.set("page", page);
      table && table.setPageIndex(page - 1);
    }

    if (!table) {
      startLoader();
      router.replace(`?${params.toString()}`);
    }
  };

  return (
    <Pagination className="w-fit">
      <PaginationContent>
        {/* First page button */}
        <PaginationItem>
          <PaginationLink
            className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
            aria-label="Go to first page"
            aria-disabled={currentPage === 1 ? true : undefined}
            role={currentPage === 1 ? "link" : undefined}
            onClick={() => handleNavigate("first", 1)}
          >
            <ChevronFirstIcon
              size={16}
              aria-hidden="true"
              className="rtl:rotate-180"
            />
          </PaginationLink>
        </PaginationItem>

        {/* Previous page button */}
        <PaginationItem>
          <PaginationLink
            className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
            aria-label="Go to previous page"
            aria-disabled={currentPage === 1 ? true : undefined}
            role={currentPage === 1 ? "link" : undefined}
            onClick={() => handleNavigate("prev")}
          >
            <ChevronLeftIcon
              size={16}
              aria-hidden="true"
              className="rtl:rotate-180"
            />
          </PaginationLink>
        </PaginationItem>

        {/* Left ellipsis (...) */}
        {showLeftEllipsis && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Page number links */}
        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
              aria-disabled={page === currentPage}
              isActive={page === currentPage}
              onClick={() => handleNavigate("page", page)}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Right ellipsis (...) */}
        {showRightEllipsis && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Next page button */}
        <PaginationItem>
          <PaginationLink
            className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
            aria-label="Go to next page"
            aria-disabled={currentPage === totalPages ? true : undefined}
            role={currentPage === totalPages ? "link" : undefined}
            onClick={() => handleNavigate("next")}
          >
            <ChevronRightIcon
              size={16}
              aria-hidden="true"
              className="rtl:rotate-180"
            />
          </PaginationLink>
        </PaginationItem>

        {/* Last page button */}
        <PaginationItem>
          <PaginationLink
            className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
            aria-label="Go to last page"
            aria-disabled={currentPage === totalPages ? true : undefined}
            role={currentPage === totalPages ? "link" : undefined}
            onClick={() => handleNavigate("last", totalPages)}
          >
            <ChevronLastIcon
              size={16}
              aria-hidden="true"
              className="rtl:rotate-180"
            />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
