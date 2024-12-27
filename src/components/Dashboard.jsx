import React, { useState } from "react";
import { Slider, Select, MenuItem } from "@mui/material";
import PieChart from "./PieChart";
import "./Dashboard.css";

function Dashboard() {
  const [values, setValues] = useState({
    homeValue: 10000,
    downPayment: 5000,
    loanAmount: 5000,
    interestRate: 18,
    tenure: 10,
  });

  const handleSliderChange = (field, newValue) => {
    if (field === "downPayment") {
      setValues((prev) => ({
        ...prev,
        downPayment: newValue,
        loanAmount: prev.homeValue - newValue,
      }));
    } else if (field === "loanAmount") {
      setValues((prev) => ({
        ...prev,
        loanAmount: newValue,
        downPayment: prev.homeValue - newValue,
      }));
    } else {
      setValues((prev) => ({ ...prev, [field]: newValue }));
    }
  };

  const totalLoanMonths = values.tenure * 12;
  const interestPerMonth = values.interestRate / 100 / 12;

  const monthlyPayment =
    (values.loanAmount *
      interestPerMonth *
      (1 + interestPerMonth) ** totalLoanMonths) /
    ((1 + interestPerMonth) ** totalLoanMonths - 1);

  const totalInterestGenerated =
    monthlyPayment * totalLoanMonths - values.loanAmount;

  const chartData = {
    labels: ["Principal", "Interest"],
    datasets: [
      {
        data: [values.loanAmount, totalInterestGenerated],
        backgroundColor: ["#f28b82", "#aecbfa"],
      },
    ],
  };

  return (
    <div className="dashboard">
      <div className="controls">
        <div className="slider-group">
          <label>Home Value</label>
          <div className="slider">
            <Slider
              value={values.homeValue}
              min={1000}
              max={10000}
              step={100}
              onChange={(e, newValue) =>
                handleSliderChange("homeValue", newValue)
              }
            />
            <span>${values.homeValue}</span>
          </div>
        </div>

        <div className="slider-group">
          <label>Down Payment</label>
          <div className="slider">
            <Slider
              value={values.downPayment}
              min={0}
              max={values.homeValue}
              step={100}
              onChange={(e, newValue) =>
                handleSliderChange("downPayment", newValue)
              }
            />
            <span>${values.downPayment}</span>
          </div>
        </div>

        <div className="slider-group">
          <label>Loan Amount</label>
          <div className="slider">
            <Slider
              value={values.loanAmount}
              min={0}
              max={values.homeValue}
              step={100}
              onChange={(e, newValue) =>
                handleSliderChange("loanAmount", newValue)
              }
            />
            <span>${values.loanAmount}</span>
          </div>
        </div>

        <div className="slider-group">
          <label>Interest Rate</label>
          <div className="slider">
            <Slider
              value={values.interestRate}
              min={2}
              max={18}
              step={1}
              onChange={(e, newValue) =>
                handleSliderChange("interestRate", newValue)
              }
            />
            <span>% {values.interestRate}</span>
          </div>
        </div>

        <div className="slider-group">
          <label>Tenure</label>
          <Select
            value={values.tenure}
            onChange={(e) =>
              handleSliderChange("tenure", parseInt(e.target.value))
            }
          >
            {[5, 10, 15, 20].map((year) => (
              <MenuItem key={year} value={year}>
                {year} years
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>

      <div className="chart">
        <h3>Monthly Payment: ${monthlyPayment.toFixed(2)}</h3>
        <PieChart chartData={chartData} />
      </div>
    </div>
  );
}

export default Dashboard;
