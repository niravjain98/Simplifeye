const stripe = require("stripe")(
  "sk_test_51Kr2lEBNJ2tr490DkINuqHiGN73VCtTg8vW4N7mWPvpZ8GjGSeDP7h5Slx1X1qxOqfcP2uWzw8eH50zhbYnaQYBe00Gb7eUed2"
);

const account = async (body) => {
  return stripe.accounts.create(body);
};

module.exports = account;
