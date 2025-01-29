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
      {customers.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg">
          <svg 
            className="w-16 h-16 text-gray-400 mb-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" 
            />
          </svg>
          <p className="text-xl text-gray-600 font-medium">No customers found</p>
          <p className="text-gray-500 mt-2">Try refreshing the page or check back later.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-300 ease-in-out">
          {customers.map((customer) => (
            <div 
              key={customer.id} 
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-4"
            >
              <div className="flex flex-col space-y-2">
                <div className="flex justify-between items-start">
                  <h2 className="text-lg font-semibold">
                    {customer.first_name} {customer.last_name || ''}
                  </h2>
                  {customer.title && (
                    <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {customer.title}
                    </span>
                  )}
                </div>
                
                <div className="text-sm text-gray-600">
                  {customer.email}
                </div>
                
                {customer.company && (
                  <div className="flex items-center gap-2 text-sm">
                    <svg 
                      className="w-4 h-4"
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" 
                      />
                    </svg>
                    <span>{customer.company}</span>
                  </div>
                )}
                
                {customer.city && (
                  <div className="text-sm text-gray-600">
                    📍 {customer.city}
                  </div>
                )}
                
                {customer.website && (
                  <div className="flex items-center gap-2 text-sm text-blue-600">
                    <svg 
                      className="w-4 h-4" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" 
                      />
                    </svg>
                    <a 
                      href={`https://${customer.website}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="truncate hover:underline"
                    >
                      {customer.website}
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {pagination && customers.length > 0 && (
        <div className="flex justify-center items-center space-x-4 mt-8">
          <button 
            onClick={() => handlePageChange(pagination.prev_page || 1)}
            disabled={!pagination.prev_page}
            className={`flex items-center px-4 py-2 rounded-md border transition-all duration-300 ${
              pagination.prev_page 
                ? 'border-gray-300 hover:bg-gray-50' 
                : 'border-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <svg 
              className="w-4 h-4 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 19l-7-7 7-7" 
              />
            </svg>
            Previous
          </button>
          
          <span className="text-sm text-gray-600">
            Page {pagination.current_page} of {pagination.total_pages}
          </span>
          
          <button 
            onClick={() => handlePageChange(pagination.next_page || pagination.total_pages)}
            disabled={!pagination.next_page}
            className={`flex items-center px-4 py-2 rounded-md border transition-all duration-300 ${
              pagination.next_page 
                ? 'border-gray-300 hover:bg-gray-50' 
                : 'border-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Next
            <svg 
              className="w-4 h-4 ml-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5l7 7-7 7" 
              />
            </svg>
          </button>
        </div>
      )}
    </>
  );
};

export default CustomerList;