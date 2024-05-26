export interface Discount {
  sku: string;
  discountType: string;
  getFor: number;
  payFor: number;
  bulkPrice: number;
  bulkLowerLimit: number;
}