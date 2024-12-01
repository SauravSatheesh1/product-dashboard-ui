import React, { useEffect, useState } from "react";
import { NavBar } from "./NavBar";
import { FileUpload } from "./FileUpload";
import { Button } from "@/components/ui/button";
import { useToast } from "../hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { DataTable } from "./DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Loader2 } from "lucide-react";
import axiosInstance from "@/api/axiosInstance";

interface Product {
  id: number;
  name: string;
  price: number;
  sku: string;
  description: string;
}

export const Dashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortField, setSortField] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const { toast } = useToast();

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(
        `/products?page=${currentPage}&sort=${sortField}&order=${sortOrder}`
      );
      setProducts(response.data.products);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast({
        title: "Error",
        description: "Failed to fetch products. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage, sortField, sortOrder]);

  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "name",
      header: () => {
        return (
          <Button variant="ghost" onClick={() => handleSort("name")}>
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "price",
      header: () => {
        return (
          <Button variant="ghost" onClick={() => handleSort("price")}>
            Price
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const price = parseFloat(row.getValue("price"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(price);
        return <div>{formatted}</div>;
      },
    },
    {
      accessorKey: "sku",
      header: "SKU",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
  ];

  return (
    <div className="min-h-screen bg-white  w-[100%]">
      <NavBar />
      <div className="container mx-auto py-10">
        <FileUpload onUploadSuccess={fetchProducts} />
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <>
            <DataTable
              columns={columns}
              data={products}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </>
        )}
      </div>
      <Toaster />
    </div>
  );
};
