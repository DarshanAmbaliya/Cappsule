import React, { useState, useEffect } from "react";

const Box = ({ id, availableForms, saltFormsJson, salt }) => {
  const [form, setForm] = useState(availableForms[0]);
  const [strength, setStrength] = useState(Object.keys(saltFormsJson[form])[0]);
  const [packaging, setPackaging] = useState(Object.keys(saltFormsJson[form][strength])[0]);
  const [price, setPrice] = useState();
  const [showMoreForms, setShowMoreForms] = useState(false);
  const [showMoreStrengths, setShowMoreStrengths] = useState(false);
  const [showMorePackagings, setShowMorePackagings] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
    const prices = Object.values(saltFormsJson[form][strength][packaging]);
    const filteredPrices = prices.flat().filter((val) => val !== null);
    
    if (filteredPrices.length > 0) {
      const minPrice = Math.min(...filteredPrices.map(val => val.selling_price));
      setPrice("From₹" + minPrice);
      setIsAvailable(true);
    } else {
      setIsAvailable(false);
      setPrice('No Stores selling this product near you')
    }
  }, [form, strength, packaging, saltFormsJson]);

  const selectedForm = (val) => {
    setForm(val);
    setStrength(Object.keys(saltFormsJson[val])[0]);
    setPackaging(Object.keys(saltFormsJson[val][Object.keys(saltFormsJson[val])[0]])[0]);
  };

  const selectedStrength = (val) => {
    setStrength(val);
    setPackaging(Object.keys(saltFormsJson[form][val])[0]);
  }
  const selectedPackaging = (val) => {
    setPackaging(val);
    // console.log((saltFormsJson[form][strength][val]));
    const prices = Object.values(saltFormsJson[form][strength][val]);
    const filteredPrices = prices.flat().filter((val) => val !== null);

    if (filteredPrices.length > 0) {
      const minPrice = Math.min(...filteredPrices.map(val => val.selling_price));
      // console.log(minPrice);
      setPrice((minPrice));
      setIsAvailable(true);
    } else {
      setPrice('No Stores selling this product near you');
      setIsAvailable(false);
    }
  }

  return (
    <div className="box">
      <div className="content">
        <div className="first-col">
          <div className="form">
            <p>Form:</p>
            <div className="btn">
              {availableForms.slice(0, showMoreForms ? availableForms.length : 4).map((val) => {
                return (
                  <button key={val} onClick={() => selectedForm(val)} className={`${form === val ? "selected" : ""} ${(!isAvailable && form === val) ? "unavailable" : ""}`}>
                    {val}
                  </button>
                )
              })}
              {
                availableForms.length > 4 && (
                  <p onClick={() => {
                    setShowMoreForms(!showMoreForms)
                  }}>{
                      showMoreForms ? "hide..." : "more..."
                    }</p>
                )
              }

            </div>
          </div>
          <div className="strength">
            <p>Strength:</p>
            <div className="btn">
              {Object.keys(saltFormsJson[form]).slice(0, showMoreStrengths ? Object.keys(saltFormsJson[form]).length : 4).map((val) => {
                return (
                  <button key={val} onClick={() => selectedStrength(val)} className={`${strength === val ? "selected" : ""} ${(!isAvailable && strength === val) ? "unavailable" : ""}`}>
                    {val}
                  </button>
                )
              })}
              {
                Object.keys(saltFormsJson[form]).length > 4 && (
                  <p onClick={() => {
                    setShowMoreStrengths(!showMoreStrengths);
                  }}>
                    {
                      showMoreStrengths ? "hide..." : "more..."
                    }
                  </p>
                )
              }
            </div>
          </div>
          <div className="packaging">
            <p>Packaging:</p>
            <div className="btn">
              {
                Object.keys(saltFormsJson[form][strength]).slice(0, showMorePackagings ? Object.keys(saltFormsJson[form][strength]).length : 4).map((val) => {
                  return (
                    <button key={val} onClick={() => selectedPackaging(val)} className={`${packaging === val ? "selected" : ""} ${!isAvailable && packaging === val ? "unavailable" : ""} ${(!isAvailable && packaging === val) ? "unavailable" : ""}`}>
                      {val}
                    </button>
                  )
                })
              }
              {
                Object.keys(saltFormsJson[form][strength]) > 4 && (
                  <p onClick={() => {
                    setShowMorePackagings(!showMorePackagings)
                  }}>
                    {showMorePackagings ? "hide..." : "more..."}
                  </p>
                )
              }
            </div>
          </div>
        </div>
        <div className="second-col">
          <h3>{salt}</h3>
          <span>{form} | {strength} | {packaging}</span>
        </div>
        <div className="third-col">
          <h3>{price}</h3>
        </div>
      </div>
    </div>
  );
}

export default Box;