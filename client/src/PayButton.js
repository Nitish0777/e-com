import axios from "axios";

const PayButton = ({ cartItems }) => {
  const handleCheckout = async () => {
    console.log("cartItems", cartItems);
  };
  return (
    <div>
      <button onClick={() => handleCheckout()}>Check Out</button>
    </div>
  );
};

// const PayButton = ({ amount, description, user }) => {
//   const [stripe, setStripe] = useState(null);

//   useEffect(() => {
//     setStripe(window.Stripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY));
//   }, []);

//   const handleClick = async (event) => {
//     const { data } = await axios.post("/api/stripe/create-checkout-session", {
//       amount,
//       description,
//       user,
//     });

//     await stripe.redirectToCheckout({
//       sessionId: data.id,
//     });
//   };

//   return (
//     <button
//       className="btn btn-primary btn-block"
//       onClick={handleClick}
//       disabled={!stripe}
//     >
//       Pay
//     </button>
//   );
// };

export default PayButton;
