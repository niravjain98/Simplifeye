import React from "react";
import Form from "./Form";

const Reuse = () => {
  const loop = [
    {
      value: "card_payments",
      title: "Card payments",
      state: false,
    },
    {
      value: "bancontact_payments",
      title: "Ban contact",
      state: false,
    },
    {
      value: "eps_payments",
      title: "EPS",
      state: false,
    },
    {
      value: "giropay_payments",
      title: "Giropay",
      state: false,
    },
    {
      value: "ideal_payments",
      title: "iDEAL",
      state: false,
    },
    {
      value: "p24_payments",
      title: "P24",
      state: false,
    },
    {
      value: "sepa_debit_payments",
      title: "SEPA Direct Debit",
      state: false,
    },
    {
      value: "sofort_payments",
      title: "Sofort",
      state: false,
    },
  ];
  return (
    <React.Fragment>
      <Form data={loop} />
    </React.Fragment>
  );
};

export default Reuse;
