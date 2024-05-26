const { Checkout } = require('../build/services/Checkout');
const { pricingRules } = require('../build/services/pricingRulesConfig');

describe('Checkout', () => {
  let co;

  beforeEach(() => {
    co = new Checkout();
  });

  test('Total expected: $249.00', () => {
    co.scan('atv');
    co.scan('atv');
    co.scan('atv');
    co.scan('vga');
    expect(co.total()).toBe(249.00);
  });

  test('Total expected: $2718.95', () => {
    co.scan('atv');
    co.scan('ipd');
    co.scan('ipd');
    co.scan('atv');
    co.scan('ipd');
    co.scan('ipd');
    co.scan('ipd');
    expect(co.total()).toBe(2718.95);
  });
});
