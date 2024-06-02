import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import SearchBar from '@/components/SearchBar';
import MedicineList from '@/components/MedicineList';
import Pagination from '@/components/Pagination';
import Filters from '@/components/Filters';
import Header from '@/components/Header';
// index.js or App.js
import '../globals.css'; // Adjust the path if necessary

const Home = () => {
  const [medicines, setMedicines] = useState([]);
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ minPrice: '', maxPrice: '', manufacturer: '' });
  const [sort, setSort] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
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
    let tempMedicines = [...medicines];

    if (searchQuery) {
      tempMedicines = tempMedicines.filter(med => med.Medicine_Name && med.Medicine_Name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    if (filters.minPrice) {
      tempMedicines = tempMedicines.filter(med => med.Discounted_Price !== undefined && med.Discounted_Price >= filters.minPrice);
    }
    if (filters.maxPrice) {
      tempMedicines = tempMedicines.filter(med => med.Discounted_Price !== undefined && med.Discounted_Price <= filters.maxPrice);
    }

    if (filters.manufacturer) {
      tempMedicines = tempMedicines.filter(med => med.Manufacturer && med.Manufacturer.toLowerCase().includes(filters.manufacturer.toLowerCase()));
    }

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
  }, [searchQuery, filters, sort, medicines]);

  const totalPages = Math.ceil(filteredMedicines.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentMedicines = filteredMedicines.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="container mx-auto p-4">
      <Header />
      <SearchBar onSearch={setSearchQuery} />
      <Filters filters={filters} setFilters={setFilters} sort={sort} setSort={setSort} />
      <MedicineList medicines={currentMedicines} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Home;
