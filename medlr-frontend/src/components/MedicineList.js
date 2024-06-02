import React from 'react';

const MedicineList = ({ medicines }) => {
    return (
      <div className="medicine-list">
        {medicines.map((med, index) => (
          <div key={index} className="medicine-item p-4 border rounded mb-4">
            <h2 className="text-xl font-bold">{med.Medicine_Name}</h2>
            <p><strong>Price:</strong> ${med.Discounted_Price}</p>
            <p><strong>Manufacturer:</strong> {med.Manufacturer}</p>
            <p><strong>Form:</strong> {med.Form}</p>
            <p><strong>Quantity:</strong> {med.Quantity}</p>
          </div>
        ))}
      </div>
    );
  };
  
  export default MedicineList;
  