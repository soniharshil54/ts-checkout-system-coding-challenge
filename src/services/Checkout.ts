import { CartProduct } from '../models/CartProduct';
import { products } from '../data/products';
import { Discount } from '../models/Discount';
import { discounts } from '../data/discounts';

export class Checkout {
  private cartProducts: CartProduct[];

  constructor() {
    this.cartProducts = [];
  }

  scan(sku: string) {
    const product = products.find(product => product.sku === sku);
    if (!product) {
      throw new Error(`Product with SKU ${sku} not found`);
    }
    const cartProduct = this.cartProducts.find(cartProduct => cartProduct.sku === sku);
    if (cartProduct) {
      cartProduct.quantity++;
    } else {
      this.cartProducts.push({ ...product, quantity: 1 });
    }
  }

  applyMultibuyDiscount(cartProduct: CartProduct, discount: Discount) {
    const { getFor, payFor } = discount;
    const { quantity, price } = cartProduct;
    const discountGroup = Math.floor(quantity / getFor);
    const remainingProducts = quantity % getFor;
    const skuTotal = discountGroup * payFor * price + remainingProducts * price;
    return skuTotal;
  }

  applyBulkDiscount(cartProduct: CartProduct, discount: Discount) {
    const { bulkPrice, bulkLowerLimit } = discount;
    const { quantity, price } = cartProduct;
    if (quantity >= bulkLowerLimit) {
      return bulkPrice * quantity;
    }
    return price * quantity;
  }

  total(): number {
    const total = this.cartProducts.reduce((total, cartProduct): number => {
      const discount = discounts.find((discount) => discount.sku === cartProduct.sku);
      if (discount) {
        if (discount.discountType === 'multibuy') {
          return total + this.applyMultibuyDiscount(cartProduct, discount);
        } else if (discount.discountType === 'bulk') {
          return total + this.applyBulkDiscount(cartProduct, discount);
        } else {
          return total + cartProduct.price * cartProduct.quantity;
        }
      }
      return total + cartProduct.price * cartProduct.quantity;
    }, 0)
    return total;
  }
}
