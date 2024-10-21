import React, { useState } from 'react';

import '../App.css';
import WarehouseInventory from './WarehouseInventory';
import DeliveryStatus from './DeliveryStatus';

const LogisticsDashboard: React.FC = () => {
  const [warehouseItems, setWarehouseItems] = useState<number>(100);
  const [isTruckLeft, setIsTruckLeft] = useState<boolean>(false);
  const [quantityToReduce, setQuantityToReduce] = useState<number>(0); // State to store user input

  const handleTruckDeparture = () => {
    if (warehouseItems > 0 && quantityToReduce > 0) {
      if (quantityToReduce <= warehouseItems) {
        // Decrease warehouse items by the user-specified amount
        setWarehouseItems(prevItems => prevItems - quantityToReduce);
      } else {
        alert('The quantity exceeds the available items in the warehouse!');
      }
    } else {
      setIsTruckLeft(true);
      alert('No items left in the warehouse!');
    }
  };

  return (
    <div className="dashboard">
      <h1>Logistics Dashboard</h1>
      <div className="dashboard-content">
        <WarehouseInventory itemCount={warehouseItems} />
        <DeliveryStatus isTruckLeft={isTruckLeft} onTruckDeparture={handleTruckDeparture} />
        
        {/* Input for user to enter quantity to reduce */}
        <div className="quantity-input">
          <label htmlFor="quantity">Enter quantity to reduce:</label>
          <input
            type="number"
            id="quantity"
            value={quantityToReduce}
            onChange={(e) => setQuantityToReduce(Number(e.target.value))}
            min="0"
          />
          <button onClick={handleTruckDeparture}>Depart Truck</button>
        </div>
      </div>
    </div>
  );
};

export default LogisticsDashboard;
