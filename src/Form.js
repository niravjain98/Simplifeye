import React, { useState, useMemo, useEffect } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import "./Form.css";
import axios from "axios";

const Form = (props) => {
  const baseURL = "http://localhost:3001/accounts";

  const [value, setValue] = useState("US");
  const [errorMessage, setError] = useState("");
  const [accountID, updateID] = useState("");
  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (value) => {
    setValue(value);
  };
  const [capability, setCapability] = useState([]);

  const changeBoxState = async (event) => {
    // event.preventDefault();
    let data = capability;
    let val = event.target.value;
    if (!data.includes(val)) {
      data.push(val);
      await setCapability(data);
      document.getElementById(val).checked = true;
    } else {
      data = data.filter((d) => {
        return d != val;
      });
      await setCapability(data);
      document.getElementById(val).checked = false;
    }
  };
  const [businessType, setBusinessType] = useState("");

  const changeBusiness = (event) => {
    setBusinessType(event.target.id);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let body = {
      type: "custom",
      country: value.value,
      capabilities: {
        card_payments: { requested: capability.includes("card_payments") },
        transfers: { requested: true },
        bancontact_payments: {
          requested: capability.includes("bancontact_payments"),
        },
        eps_payments: { requested: capability.includes(" eps_payments") },
        giropay_payments: {
          requested: capability.includes("giropay_payments"),
        },
        ideal_payments: { requested: capability.includes("ideal_payments") },
        p24_payments: { requested: capability.includes("p24_payments") },
        sepa_debit_payments: {
          requested: capability.includes("sepa_debit_payments"),
        },
        sofort_payments: { requested: capability.includes("sofort_payments") },
      },
    };

    await axios
      .post(baseURL, body)
      .then((res) => {
        updateID(res.data.id);
        console.log(res.data.id);
      })
      .catch((e) => {
        setError(e.response.data.error.raw.message);
        console.log(e, e.response.data.error.raw.message);
      });
  };
  useEffect(() => {
    errorMessage &&
      setTimeout(() => {
        setError("");
      }, 5000);
  }, [errorMessage]);
  return (
    <div>
      <h1 className="page">Simplifeye Create Account Form</h1>
      <form className="place" onSubmit={handleSubmit}>
        {errorMessage && (
          <div style={{ color: "red" }}>
            <b>{errorMessage}</b>
          </div>
        )}
        <br></br>
        <h4>Account Type</h4>
        <div className="first-div">
          <ul className="list-group position">
            <li className="list-group-item active" value="custom">
              Custom
            </li>
            <li className="list-group-item disabled">Express</li>
            <li className="list-group-item disabled">Standard</li>
          </ul>
        </div>
        <div className="first-div">
          <h4>Select Country</h4>
          <Select
            options={options}
            value={options.find((option) => option.value === value)}
            onChange={changeHandler}
          />
        </div>

        <h4>Capability</h4>
        <p>
          Connected accounts include the transfers capability by default. You
          may optionally include the methods below, which you can learn more
          about in the{" "}
          <a href="https://stripe.com/docs/payments/local-payment-methods">
            payment docs
          </a>
        </p>
        {props.data.map((d) => {
          return (
            <div className="form-check position">
              <input
                className="form-check-input"
                type="checkbox"
                value={d.value}
                id={d.value}
                onClick={changeBoxState}
              />
              <label className="form-check-label" for="flexCheckDefault">
                {d.title}
              </label>
            </div>
          );
        })}
        <div className="form-check postition div-design">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
            onChange={(e) =>
              (document.getElementById("submit-button").disabled = false)
            }
          />
          <label className="form-check-label" for="flexCheckDefault">
            <p>
              The owner of this account has agreed to the
              <a href="https://stripe.com/ssa"> Stripe Services</a> and
              <a href="https://stripe.com/US/connect-account/legal/full">
                {" "}
                Connected Account
              </a>{" "}
              agreements.
            </p>
          </label>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          id="submit-button"
          value="Send"
          disabled
        >
          Submit
        </button>
        {accountID && (
          <div>
            Your newly created account ID is <i>{accountID}</i>
          </div>
        )}
      </form>
    </div>
  );
};

export default Form;
