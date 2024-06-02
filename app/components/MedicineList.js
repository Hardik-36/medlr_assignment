import React from 'react';

const MedicineList = ({ medicines }) => {
    return (
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {medicines.map((med, index) => (
          <div key={index} className="medicine-item p-4 border rounded mb-4">
            <h2 className="text-xl font-semibold mb-1">{med.Medicine_Name}</h2>
            <p className='text-gray-600'><strong>Price:</strong> ${med.Discounted_Price}</p>
            <p className='text-gray-600'><strong>Manufacturer:</strong> {med.Manufacturer}</p>
            <p className='text-gray-600'><strong>Form:</strong> {med.Form}</p>
            <p className='text-gray-600'><strong>Quantity:</strong> {med.Quantity}</p>
          </div>
        ))}
      </div>
    );
  };
  
  export default MedicineList;
  