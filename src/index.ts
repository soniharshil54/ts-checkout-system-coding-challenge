import { Checkout } from './services/Checkout';
import { pricingRules } from './services/pricingRulesConfig';

const co = new Checkout();
co.scan('atv');
co.scan('atv');
co.scan('atv');
co.scan('vga');
console.log(`Total expected: ${co.total()}`);
