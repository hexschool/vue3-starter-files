const { mapGetters } = Pinia;
import cartStore from './cartStore.js';

export default {
  template: `<nav class="navbar bg-light">
    <div class="container-fluid">
      <span class="navbar-brand" href="#">香香麵攤</span>
      <div>
        購物車
        <span class="badge rounded-pill bg-danger text-white">{{ cartList.carts.length}} </span>
      </div>
    </div>
  </nav>`,
  computed: {
    ...mapGetters(cartStore, ['cartList'])
  },
}