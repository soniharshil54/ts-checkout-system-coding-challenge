import { Product } from '../models/Product';

export class PricingRules {
  private rules: ((products: Product[]) => number)[];

  constructor() {
    this.rules = [];
  }

  addRule(rule: (products: Product[]) => number) {
    this.rules.push(rule);
  }

  applyRules(products: Product[]): number {
    return this.rules.reduce((total, rule) => total + rule(products), 0);
  }
}
