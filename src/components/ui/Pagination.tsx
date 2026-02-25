"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between mt-6 border-t border-gray-200 pt-4">
      <div className="text-sm text-gray-500">
        Halaman <span className="font-medium text-gray-900">{currentPage}</span> dari <span className="font-medium text-gray-900">{totalPages}</span>
      </div>
      <div className="flex gap-2">
        {currentPage > 1 ? (
          <Link
            href={createPageURL(currentPage - 1)}
            className="px-4 py-2 text-sm border rounded-md hover:bg-gray-50 text-gray-700"
          >
            Sebelumnya
          </Link>
        ) : (
          <button disabled className="px-4 py-2 text-sm border rounded-md bg-gray-50 text-gray-400 cursor-not-allowed">
            Sebelumnya
          </button>
        )}

        {currentPage < totalPages ? (
          <Link
            href={createPageURL(currentPage + 1)}
            className="px-4 py-2 text-sm border rounded-md hover:bg-gray-50 text-gray-700"
          >
            Selanjutnya
          </Link>
        ) : (
          <button disabled className="px-4 py-2 text-sm border rounded-md bg-gray-50 text-gray-400 cursor-not-allowed">
            Selanjutnya
          </button>
        )}
      </div>
    </div>
  );
}