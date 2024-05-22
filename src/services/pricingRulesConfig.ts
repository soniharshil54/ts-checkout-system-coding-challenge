import { PricingRules } from './PricingRules';
import { Product } from '../models/Product';

export const pricingRules = new PricingRules();

pricingRules.addRule((products: Product[]) => {
  const atv = products.filter(product => product.sku === 'atv');
  const discount = Math.floor(atv.length / 3) * atv[0].price;
  return discount;
});

pricingRules.addRule((products: Product[]) => {
  const ipd = products.filter(product => product.sku === 'ipd');
  if (ipd.length > 4) {
    const discount = ipd.length * (ipd[0].price - 499.99);
    return discount;
  }
  return 0;
});
