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
 
  return (
    <>
      return list
    </>
  );
};

export default CustomerList;