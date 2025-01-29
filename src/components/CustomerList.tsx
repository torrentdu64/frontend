import { useState, useEffect } from 'react';

interface Customer {
  id: number;
  first_name: string;
  last_name?: string;
  email: string;
  gender?: string;
  ip_address?: string;
  company?: string;
  city?: string;
  title?: string;
  website?: string;
}

interface PaginationInfo {
  current_page: number;
  next_page: number | null;
  prev_page: number | null;
  total_pages: number;
  total_count: number;
}

const CustomerList = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCustomers = async (page = 1) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/api/v1/customers?page=${page}&per_page=20`);
      const data = await response.json();
      setCustomers(data.customers);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Error fetching customers:', error);
      setCustomers([]);
      setPagination(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handlePageChange = (page: number) => {
    fetchCustomers(page);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <>
      Customer List
    </>
  );
};

export default CustomerList;