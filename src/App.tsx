import CustomerList from './components/CustomerList'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-8 md:px-12 py-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Customer Directory</h1>
        <CustomerList />
      </div>
    </div>
  )
}

export default App