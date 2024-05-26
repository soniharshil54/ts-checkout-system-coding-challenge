import { Discount } from '../models/Discount'

const discounts: Discount[] = [
  { sku: 'atv', discountType: 'multibuy', getFor: 3, payFor: 2, bulkPrice: 0, bulkLowerLimit: 0 },
  { sku: 'ipd', discountType: 'bulk', getFor: 0, payFor: 0, bulkPrice: 499.99, bulkLowerLimit: 5 },
]

export { discounts }