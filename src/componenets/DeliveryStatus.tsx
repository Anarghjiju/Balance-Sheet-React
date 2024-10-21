import React from 'react';

// Define props for DeliveryStatus
interface DeliveryStatusProps {
  isTruckLeft: boolean;
  onTruckDeparture: () => void; // Function to call when the truck leaves
}

const DeliveryStatus: React.FC<DeliveryStatusProps> = ({ isTruckLeft, onTruckDeparture }) => {
  return (
    <div className="delivery-status">
      <h2>Delivery Status</h2>
      <p>{isTruckLeft ? "The truck has left the warehouse." : "The truck is still in the warehouse."}</p>
      {/* Button to dispatch the truck */}
      {!isTruckLeft && <button onClick={onTruckDeparture}>Dispatch Truck</button>}
    </div>
  );
};

export default DeliveryStatus;
