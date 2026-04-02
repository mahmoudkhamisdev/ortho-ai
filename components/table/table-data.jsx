"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useLanguageStore } from "@/stores/useLanguageStore";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import SortButton from "./sort-button";
import TablePagination from "./table-pagiantion";
import { useRouter } from "next/navigation";
import { startLoader } from "@/components/common/routes-loading";
import { MAX_ROWS_PER_PAGE } from "@/lib/data/utils";

const translations = {
  en: {
    filterPlaceholder: "Filter {title}...",
    columnsButton: "Columns",
    noResults: "No results.",
    previousButton: "Previous",
    nextButton: "Next",
    totalRows: "{count} total rows",
    pageInfo: "Page {current} of {total}",
    page: "page",
  },
  ar: {
    filterPlaceholder: "تصفية {title}...",
    columnsButton: "الأعمدة",
    noResults: "لا توجد نتائج.",
    previousButton: "السابق",
    nextButton: "التالي",
    totalRows: "{count} إجمالي الصفوف",
    pageInfo: "الصفحة {current} من {total}",
    page: "صفحة",
  },
};

export function TableData({
  columns = [],
  data,
  loading,
  title,
  filterNames = [],
  pagination = null,
  hideActions,
}) {
  const router = useRouter();
  const { currentLanguage } = useLanguageStore();
  const t = translations[currentLanguage] || translations.en;

  // Base "ID" column
  const allColumns = [
    {
      accessorKey: "id",
      header: ({ column }) => <SortButton column={column} title={"ID"} />,
      cell: ({ row }) => (
        <div className="text-center w-10">{+row.id + 1 || "---"}</div>
      ),
    },
    ...columns,
  ];

  const [sorting, setSorting] = useState([]);
  const [filters, setFilters] = useState([]);
  const [visibility, setVisibility] = useState({});
  const [selection, setSelection] = useState({});
  const [localSearch, setLocalSearch] = useState("");
  const [pageSize, setPageSize] = useState(pagination?.per_page || 20);
  const [hasSearched, setHasSearched] = useState(false);

  // Handle search
  const handleSearchChange = (e) => {
    setLocalSearch(e.target.value);
    if (pagination) {
      setHasSearched(true);
    } else {
      table?.setGlobalFilter(e.target.value);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (!hasSearched) {
      setLocalSearch(params.get("search") || "");
      return;
    }

    const timeout = setTimeout(() => {
      startLoader();

      if (localSearch === "") {
        params.delete("search");
      } else {
        params.set("search", localSearch);
      }

      params.set("page", "1");
      router.replace(`?${params.toString()}`);
    }, 400);

    return () => clearTimeout(timeout);
  }, [localSearch]);

  // Handle per page change
  const handlePerPageChange = (newPageSize) => {
    setPageSize(Number(newPageSize));
    table?.setPageSize(Number(newPageSize));

    if (pagination) {
      startLoader();
      const params = new URLSearchParams(window.location.search);

      if (newPageSize <= MAX_ROWS_PER_PAGE) params.set("per_page", newPageSize);
      router.replace(`?${params.toString()}`);
    }
  };

  const multiColumnFilter = (row, columnId, value) => {
    const search = value.toLowerCase();
    return filterNames.some((key) => {
      const cell = row.getValue(key);
      return cell && cell.toLowerCase().includes(search);
    });
  };

  const table = useReactTable({
    data,
    columns: allColumns,
    state: {
      sorting,
      columnFilters: filters,
      columnVisibility: visibility,
      rowSelection: selection,
      globalFilter: pagination ? "" : localSearch,
      // pagination: { pageIndex: 0, pageSize },
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setFilters,
    onColumnVisibilityChange: setVisibility,
    onRowSelectionChange: setSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    filterFns: { multiColumn: multiColumnFilter },
    globalFilterFn: "multiColumn",
    manualPagination: !!pagination,
  });

  // Pagination info
  const totalRows = pagination
    ? pagination.total
    : table?.getFilteredRowModel()?.rows?.length;

  const pageInfo = pagination
    ? t.pageInfo
        .replace("{current}", pagination.current)
        .replace("{total}", pagination.last_page)
    : t.pageInfo
        .replace("{current}", table?.getState().pagination.pageIndex + 1)
        .replace("{total}", table?.getPageCount());

  useEffect(() => {
    table.setPageSize(pageSize);
  }, []);

  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => setIsHydrated(true), []);
  if (!isHydrated) return null;

  return (
    <div className="w-full">
      {/* Search + Column visibility */}
      {!hideActions && (
        <div className="flex flex-wrap items-center gap-2 py-4">
          <Input
            placeholder={
              t.filterPlaceholder.replace("{title}", title) || "Filter"
            }
            value={localSearch}
            onChange={handleSearchChange}
            className="w-full md:max-w-sm py-2.5"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ms-auto bg-transparent">
                {t.columnsButton}
                <ChevronDown className="ms-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                ?.getAllColumns()
                .filter((c) => c.getCanHide())
                .map((col) => (
                  <DropdownMenuCheckboxItem
                    key={col.id}
                    checked={col.getIsVisible()}
                    onCheckedChange={(val) => col.toggleVisibility(!!val)}
                    className="capitalize"
                  >
                    {col.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {!loading ? (
              table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={allColumns.length}
                    className="h-24 text-center"
                  >
                    {t.noResults}
                  </TableCell>
                </TableRow>
              )
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="space-y-2">
                  {Array.from({ length: 7 }).map((_, index) => (
                    <Skeleton
                      key={index}
                      className="w-full h-10"
                      style={{
                        animationDelay: `${index * 300}ms`,
                      }}
                    />
                  ))}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {!hideActions && (
        <div className="flex items-center justify-center lg:justify-between flex-wrap gap-2 py-4">
          <div className="text-sm">
            {t.totalRows.replace("{count}", totalRows)}{" "}
            {pagination && <span>({pageInfo})</span>}
          </div>

          <TablePagination
            currentPage={
              pagination?.current || table.getState().pagination.pageIndex + 1
            }
            totalPages={pagination?.last_page || table.getPageCount()}
            paginationItemsToDisplay={5}
            table={!pagination && table}
          />

          <Select value={String(pageSize)} onValueChange={handlePerPageChange}>
            <SelectTrigger className="w-fit py-3" size="sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Array.from(
                { length: Math.ceil(MAX_ROWS_PER_PAGE / 100) },
                (_, i) => (i + 1) * 100
              )
                .filter((size) => size <= MAX_ROWS_PER_PAGE)
                .map((size) => (
                  <SelectItem key={size} value={String(size)}>
                    {size} / {t.page}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
}
