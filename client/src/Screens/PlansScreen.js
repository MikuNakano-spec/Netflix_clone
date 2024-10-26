import React, { useState } from 'react';
import Layout from '../Layout/Layout';

function PlansScreen() {
  const plans = [
    {
      name: 'Basic Plan',
      price: '$9.99',
      features: ['Access to a limited library', 'Standard quality'],
    },
    {
      name: 'Standard Plan',
      price: '$14.99',
      features: ['Access to a larger library', 'HD quality'],
    },
    {
      name: 'Premium Plan',
      price: '$19.99',
      features: ['Access to all content', 'Ultra HD quality', 'Multiple devices'],
    },
  ];

  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleSubscribe = async (plan) => {
    // Simulate an API call to a backend for processing the subscription
    try {
      // In a real app, you would send data to your server to initiate payment processing
      // For this example, we'll simulate a successful subscription after a delay
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a 2-second delay

      // Once the subscription is processed, set the selected plan
      setSelectedPlan(plan);
    } catch (error) {
      console.error('Error subscribing:', error.message);
      // Handle any errors that occur during the subscription process
    }
  };

  return (
    <Layout>
      <div className='container mx-auto px-7 my-24 flex justify-center'>
        <div className='w-full 2xl:w-2/5 gap-4 flex-col p-8 sm:p-14 md:w-3/5 bg-dry rounded-lg border border-border'>
          <h2 className='text-2xl font-semibold mb-4'>Choose Your Plan</h2>
          <div className='space-y-4'>
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`bg-main p-4 rounded-lg shadow-md border border-border cursor-pointer ${
                  selectedPlan === plan ? 'bg-gray-800' : 'hover:bg-gray-800'
                }`}
                onClick={() => handleSubscribe(plan)}>
                <h3 className='text-lg font-semibold'>{plan.name}</h3>
                <p className='text-gray-600'>{plan.price} per month</p>
                <ul className='list-disc list-inside mt-2'>
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className='text-gray-600'>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className={`bg-primary text-white px-4 py-2 mt-4 rounded-md hover:bg-primary-dark ${
                    selectedPlan === plan ? 'bg-gray-400 cursor-not-allowed' : ''
                  }`}
                  disabled={selectedPlan === plan}>
                  {selectedPlan === plan ? 'Subscribed' : 'Subscribe'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default PlansScreen;
