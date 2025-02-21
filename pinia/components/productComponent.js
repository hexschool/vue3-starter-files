export default {
  data() {
    return {
      products: [
        {
          id: 1,
          title: '多色餅乾',
          imageUrl: 'https://images.unsplash.com/photo-1576717585968-8ea8166b89b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
          price: 80
        },
        {
          id: 2,
          title: '綠色馬卡龍',
          imageUrl: 'https://images.unsplash.com/photo-1623066463831-3f7f6762734d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1135&q=80',
          price: 120
        },
        {
          id: 3,
          title: '甜蜜左擁右抱',
          imageUrl: 'https://images.unsplash.com/photo-1558312657-b2dead03d494?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
          price: 200,
        },
        {
          id: 4,
          title: '巧克力心連心',
          imageUrl: 'https://images.unsplash.com/photo-1606913084603-3e7702b01627?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
          price: 160
        },
        {
          id: 5,
          title: '粉係馬卡龍',
          imageUrl: 'https://images.unsplash.com/photo-1612201142855-7873bc1661b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
          price: 120
        }
      ]
    }
  },
  template: `<div class="row row-cols-3 g-3 my-3">
      <div class="col" v-for="product in products" :key="product.id">
        <div class="card">
          <img
            :src="product.imageUrl"
            class="card-img-top"
            alt="product.title"
          />
          <div class="card-body">
            <h6 class="card-title">
              {{ product.title }}
              <span class="float-end">$ {{product.price}}</span>
            </h6>
            <a href="#" class="btn btn-outline-primary w-100">加入購物車</a>
          </div>
        </div>
      </div>
    </div>`,
};
