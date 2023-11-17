import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

const AdminDashboard = () => {
  const [chargeCustomers, setChargeCustomers] = useState(true);
  const [customAmount, setCustomAmount] = useState(99);
  const [regularAmounts, setRegularAmounts] = useState([]);
//   const [showGraph, setShowGraph] = useState(false);

  const handleChargeCustomersChange = (value) => {
    setChargeCustomers(value);
  };

  const handleCustomAmountChange = (value) => {
    setCustomAmount(value);
  };

  const handleRegularAmountChange = (index, value) => {
    setRegularAmounts((prevAmounts) => {
      const newAmounts = [...prevAmounts];
      newAmounts[index] = value;
      return newAmounts;
    });
  };

  const isSaveButtonEnabled = () => {
    if (!chargeCustomers) {
      return true;
    }

    return (
      customAmount > 99 &&
      regularAmounts.every((amount) => amount > 0)
    );
  };

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = 'https://stg.dhunjam.in/account/admin/4';
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const amountsData = data.data.amount;

        // Convert the amountsData object into an array of amounts
        const amountsArray = Object.values(amountsData);
        setRegularAmounts(amountsArray || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

//   const data = {
//     labels: regularAmounts.map((_, index) => `Month ${index + 1}`),
//     datasets: [
//       {
//         label: 'Amount',
//         backgroundColor: 'rgba(75,192,192,0.2)',
//         borderColor: 'rgba(75,192,192,1)',
//         borderWidth: 1,
//         hoverBackgroundColor: 'rgba(75,192,192,0.4)',
//         hoverBorderColor: 'rgba(75,192,192,1)',
//         data: regularAmounts,
//       },
//     ],
//   };

const saveChanges = async () => {
    try {
      const url = 'https://stg.dhunjam.in/account/admin/4';
      
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // Add any other required headers here
        },
        body: JSON.stringify({
          chargeCustomers,
          customAmount,
          regularAmounts,
          // Add any other data you need to send in the request body
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      console.log('Data successfully updated!');
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };
  

  return (
    <div
      style={{
        backgroundColor: '#030303',
        minHeight: '100vh',
        textAlign: 'center',
        color: '#FFFFFF',
        fontFamily: 'Poppins',
      }}
    >
      <h1 style={{ fontSize: '32px', marginBottom: '20px' }}>
        Social, Hebbal on DhunJam
      </h1>
      <div
        style={{
          width: '600px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <div style={{ width: '48%', textAlign: 'left' }}>
          <label style={{ display: 'block', marginBottom: '10px' }}>
            Do you want to charge your customers for requesting songs?
          </label>
          <label style={{ display: 'block', marginBottom: '10px' }}>
            Custom song request amount
          </label>
          <label style={{ display: 'block', marginBottom: '10px' }}>
            Regular song request amounts, from high to low
          </label>
        </div>

        <div style={{ width: '48%', textAlign: 'left' }}>
          <div style={{ marginBottom: '10px' }}>
            <input
              type="radio"
              id="chargeYes"
              name="chargeCustomers"
              value="true"
              checked={chargeCustomers}
              onChange={() => {
                handleChargeCustomersChange(true);
                // setShowGraph(true); // Set showGraph to true when "Yes" is selected
              }}
              style={{ backgroundColor: '#FFFFFF', marginRight: '5px' }}
            />
            <label htmlFor="chargeYes">Yes</label>
            <input
              type="radio"
              id="chargeNo"
              name="chargeCustomers"
              value="false"
              checked={!chargeCustomers}
              onChange={() => {
                handleChargeCustomersChange(false);
                // setShowGraph(false); // Set showGraph to false when "No" is selected
              }}
              style={{
                backgroundColor: '#FFFFFF',
                marginLeft: '20px',
                marginRight: '5px',
              }}
            />
            <label htmlFor="chargeNo">No</label>
          </div>

          <div style={{ marginBottom: '10px' }}>
            <input
              type="text"
              value={customAmount}
              onChange={(e) => handleCustomAmountChange(e.target.value)}
              style={{
                border: '1px solid #FFFFFF',
                fontSize: '16px',
                width: '100%',
                borderRadius: '10px',
                backgroundColor: '#000000',
                height: '40px',
                color: '#FFFFFF',
              }}
            />
          </div>
          <div style={{ display: 'flex', marginBottom: '10px' }}>
            {regularAmounts.map((amount, index) => (
              <div key={index} style={{ marginRight: '10px' }}>
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => handleRegularAmountChange(index, e.target.value)}
                  style={{
                    border: '1px solid #FFFFFF',
                    fontSize: '16px',
                    width: '50px',
                    borderRadius: '10px',
                    backgroundColor: '#000000',
                    height: '40px',
                    color: '#FFFFFF',
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* {showGraph && <Bar data={data} />} */}

      <button
        onClick={() => {
          saveChanges();
        //   setShowGraph(chargeCustomers); // Show the graph only if chargeCustomers is true
        }}
        style={{
          backgroundColor: isSaveButtonEnabled() ? '#6741D9' : '#C2C2C2',
          border: '1px solid #FFFFFF',
          cursor: isSaveButtonEnabled() ? 'pointer' : 'not-allowed',
          fontSize: '20px',
          marginTop: '20px',
          width: '300px',
          borderRadius: '10px',
          height: '40px',
        }}
      >
        Save
      </button>
    </div>
  );
};

export default AdminDashboard;
