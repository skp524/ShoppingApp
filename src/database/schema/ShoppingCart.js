export const Product = {
  name: 'Product',
  properties: {
    productId: 'string',
    productName: 'string',
    qty: 'int',
    imageUrl: 'string',
    price: 'string',
    specialPrice: 'string',
    discount: 'int',
  }
}
export const ShoppingCart = {
  name: 'ShoppingCart',
  primaryKey: 'emailId',
  properties: {
    emailId: 'string',
    products: { type: 'list', objectType: 'Product' }
  }
}
