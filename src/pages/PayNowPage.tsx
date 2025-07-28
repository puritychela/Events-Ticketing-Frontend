import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { usePayWithDarajaMutation } from "../features/api/paymentApi";
import { Button, Input } from '../components/ui/index'; // adjust path if needed

const PayNowPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation(); // state should contain { bookingId, amount }

  const [phone, setPhone] = useState('');
  const [initiatePayment, { isLoading }] = usePayWithDarajaMutation();

  console.log("PayNowPage Location State:", state);

  const handlePayment = async () => {
    if (!phone || !state?.amount || !state?.bookingId) {
      alert("Phone, amount, and bookingId are required.");
      return;
    }

    try {
      await initiatePayment({
        phone,
        amount: Number(state.amount),
        bookingId: Number(state.bookingId),
      }).unwrap();

      alert('STK Push sent to your phone. Complete payment to access ticket.');

      setTimeout(() => {
        navigate('/ticket', { state: { bookingId: state.bookingId } });
      }, 10000);
    } catch (err: any) {
      console.error(err);
      alert('Failed to initiate payment.');
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto text-center">
      <h2 className="text-2xl font-bold mb-4">Complete Payment</h2>
      <p className="mb-2">Amount: KES {state?.amount}</p>

      <Input
        placeholder="Enter M-Pesa Phone (e.g. 0712345678)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <Button onClick={handlePayment} disabled={isLoading || !phone}>
        {isLoading ? 'Processing...' : 'Pay Now'}
      </Button>
    </div>
  );
};

export default PayNowPage;
