const COMMON_FEATURES = [
  { text: 'Floor plan creation' },
  { text: 'Backup in the magicplan Cloud' },
  { text: 'Material & Cost Estimator' },
  { text: 'Export all plans as PDF, JPG, DXF, PNG, SVG and CSV files' },
  { text: 'Access all objects' },
  { text: '3D Renderings' },
  { text: 'Virtual Tours' },
];

const BUSINESS_FEATURES = [
  { text: 'Multi-License Management' },
  { text: 'Create Objects' },
  { text: 'Create Surveys' },
  { text: 'Create Pricelists' },
];

const ENTERPRISE_FEATURES = [
  { text: 'Customization Services' },
  { text: 'Custom branding' },
  { text: 'Integration / APIs' },
  { text: 'Lead generation' },
];

export default [
  {
    name: 'Pay per Floor Plan',
    description: 'Unlock standard features for 1 plan.',
    tariffs: [
      {
        name: 'On Demand',
        features: COMMON_FEATURES,
        price: {
          labels: {
            perUnit: 'per Plan',
            units: 'Plans',
            action: 'Buy',
          },
          unit: 3.49,
          unitDependant: true,
        },
      },
    ],
  },
  {
    name: 'Subscription',
    description: 'Subscribe to create as many Floor Plans as you need.',
    options: {
      periods: [{ label: 'Monthly', value: 'month' }, { label: 'Yearly', value: 'year' }],
    },
    tariffs: [
      {
        name: 'Standard',
        features: COMMON_FEATURES,
        price: {
          labels: {
            perUnit: 'user per month',
            units: 'Users',
            action: 'Subscribe',
          },
          periodical: true,
          unitDependant: false,
          month: 9.99,
          year: 99.99,
        },
      },
      {
        name: 'Business',
        features: COMMON_FEATURES.concat(BUSINESS_FEATURES.map(f => ({ ...f, important: true }))),
        price: {
          labels: {
            perUnit: 'device per month',
            units: 'Devices',
            action: 'Subscribe',
          },
          periodical: true,
          unitDependant: true,
          month: 19.99,
          year: 199.99,
        },
      },
    ],
  },
  {
    name: 'Tailored solution',
    description: 'Tailor made for you, to meet your organization’s needs.',
    tariffs: [
      {
        name: 'Enterprise solution',
        features: COMMON_FEATURES
          .concat(BUSINESS_FEATURES)
          .concat(ENTERPRISE_FEATURES.map(f => ({ ...f, important: true }))),
        price: {
          labels: {
            action: 'Get in Touch',
          },
          custom: true,
        },
      },
    ],
  },
];
