const { defineStore } = Pinia;
import productStore from './productStore.js';

export default defineStore('cart', {
  // 在此可以使用箭頭函式，不過其它地方一樣不行
  state: () => {
    return {
      cart: [],
    };
  },
  actions: {
    addToCart(productId, qty = 1) {
      const currentCart = this.cart.find((item) => item.productId === productId);
      if (currentCart) {
        currentCart.qty += qty;
      } else {
        this.cart.push({
          id: new Date().getTime(),
          productId,
          qty,
        });
      }
    },
    setCartQty(id, qty = 1) {
      const currentCart = this.cart.find((item) => item.id === id);
      currentCart.qty = qty * 1;
    },
    removeCartItem(id) {
      const index = this.cart.findIndex((item) => item.id === id)
      this.cart.splice(index, 1);
    }
  },
  getters: {
    cartList: ({ cart }) => {
      // https://pinia.vuejs.org/core-concepts/getters.html#accessing-other-stores-getters
      const { products } = productStore();
      const carts = cart.map((item) => {
        const product = products.find((product) => product.id === item.productId);
        return {
          ...item,
          product,
          subtotal: product.price * item.qty
        }
      });
      const total = carts.reduce((a, b) => a + b.subtotal, 0)
      return {
        total,
        carts
      };
    },
  },
});
