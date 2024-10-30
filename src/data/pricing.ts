export const pricing = [
  {
    type: 'Absolutely',
    price: 'Free',
    active: false,
    subscription: 'month',
    description: 'Perfect for using in a personal website or a client project.',
    buttonText: 'Choose Free',
    features: [
      '1GB storage',
      'Supported by ads',
      '13 basic themes',
      'Connect your domain',
    ],
  },
  {
    type: 'Starter',
    price: '$8',
    subscription: 'month',
    description: 'Perfect for using in a personal website or a client project.',
    buttonText: 'Choose Starter',
    active: false,
    features: [
      'All Free plan features',
      '10GB storage',
      'Lifetime access',
      'Remove ads',
      '11 premium themes',
    ],
  },
  {
    active: true,
    type: 'Standard',
    price: '$14',
    subscription: 'month',
    description: 'Perfect for using in a personal website or a client project.',
    buttonText: 'Choose Standard',
    features: [' All Starter features', '15GB storage', 'Use your theme'],
  },
  {
    active: false,
    type: 'Premium',
    price: '$29',
    subscription: 'month',
    description: 'Perfect for using in a personal website or a client project.',
    buttonText: 'Choose Premium',
    features: [
      '  All Standard features',
      '50GB storage',
      '99.9% SLA',
      'Priority support',
    ],
  },
]