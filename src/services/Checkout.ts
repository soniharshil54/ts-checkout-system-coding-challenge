import { Product } from '../models/Product';
import { PricingRules } from './PricingRules';

const products: Product[] = [
  { sku: 'ipd', name: 'Super iPad', price: 549.99 },
  { sku: 'mbp', name: 'MacBook Pro', price: 1399.99 },
  { sku: 'atv', name: 'Apple TV', price: 109.50 },
  { sku: 'vga', name: 'VGA adapter', price: 30.00 }
];

export class Checkout {
  private products: Product[];
  private pricingRules: PricingRules;

  constructor(pricingRules: PricingRules) {
    this.products = [];
    this.pricingRules = pricingRules;
  }

  scan(sku: string) {
    const product = products.find(product => product.sku === sku);
    if (!product) {
      throw new Error(`Product with SKU ${sku} not found`);
    }
    this.products.push(product);
  }

  total(): number {
    const totalWithoutDiscount = this.products.reduce((total, product) => total + product.price, 0);
    const discount = this.pricingRules.applyRules(this.products);
    return totalWithoutDiscount - discount;
  }
}
