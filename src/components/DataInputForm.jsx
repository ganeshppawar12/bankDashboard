import React, { useState } from "react";

function DataInputForm({ onDataChange }) {
  const [formData, setFormData] = useState({
    loanAmount: "",
    loanTerm: "",
    interestRate: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onDataChange({
      loanAmount: parseFloat(formData.loanAmount),
      loanTerm: parseFloat(formData.loanTerm),
      interestRate: parseFloat(formData.interestRate),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Loan Amount: </label>
        <input
          type="number"
          name="loanAmount"
          value={formData.loanAmount}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Loan Term (in years): </label>
        <input
          type="number"
          name="loanTerm"
          value={formData.loanTerm}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Interest Rate (Annual %): </label>
        <input
          type="number"
          name="interestRate"
          value={formData.interestRate}
          onChange={handleInputChange}
          required
        />
      </div>
      <button type="submit">Calculate</button>
    </form>
  );
}

export default DataInputForm;
