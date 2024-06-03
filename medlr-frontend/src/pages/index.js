import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import SearchBar from '@/components/SearchBar';
import MedicineList from '@/components/MedicineList';
import Pagination from '@/components/Pagination';
import Filters from '@/components/Filters';

const Home = () => {
  const [medicines, setMedicines] = useState([]);
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ minPrice: '', maxPrice: '', manufacturer: '' });
  const [sort, setSort] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    // Fetch and parse CSV data
    fetch('/mock-data.csv')
      .then(response => response.text())
      .then(csvText => {
        Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
          complete: (result) => {
            setMedicines(result.data);
          },
          error: (error) => {
            console.error('Error parsing CSV:', error);
          }
        });
      })
      .catch(err => console.error('Error fetching CSV:', err));
  }, []);

  useEffect(() => {
    if (searchQuery) {
      let tempMedicines = [...medicines];

      // Filter by search query
      tempMedicines = tempMedicines.filter(med => med.Medicine_Name && med.Medicine_Name.toLowerCase().includes(searchQuery.toLowerCase()));

      // Filter by price
      if (filters.minPrice) {
        tempMedicines = tempMedicines.filter(med => med.Discounted_Price !== undefined && med.Discounted_Price >= filters.minPrice);
      }
      if (filters.maxPrice) {
        tempMedicines = tempMedicines.filter(med => med.Discounted_Price !== undefined && med.Discounted_Price <= filters.maxPrice);
      }

      // Filter by manufacturer
      if (filters.manufacturer) {
        tempMedicines = tempMedicines.filter(med => med.Manufacturer && med.Manufacturer.toLowerCase().includes(filters.manufacturer.toLowerCase()));
      }

      // Sort
      if (sort) {
        tempMedicines.sort((a, b) => {
          if (sort === 'price') {
            return a.Discounted_Price - b.Discounted_Price;
          }
          if (sort === 'name') {
            return a.Medicine_Name.localeCompare(b.Medicine_Name);
          }
          return 0;
        });
      }

      setFilteredMedicines(tempMedicines);
    } else {
      setFilteredMedicines([]);
    }
  }, [searchQuery, filters, sort, medicines]);

  // Pagination logic
  const totalPages = Math.ceil(filteredMedicines.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentMedicines = filteredMedicines.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Medlr Medicine Finder</h1>
      <SearchBar onSearch={setSearchQuery} />

      {searchQuery && (
        <>
          <Filters filters={filters} setFilters={setFilters} sort={sort} setSort={setSort} />
          <MedicineList medicines={currentMedicines} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default Home;
