export default {
  data() {
    return {
      cartList: []
    }
  },
  template: `<div class="bg-light p-4 my-3">
    <div>購物車沒有任何品項</div>
    <table class="table align-middle">
      <tbody>
        <tr>
          <td width="100"><a href="#" class="text-dark"><i class="fas fa-times"></i></a></td>
          <td width="100"><img src="https://images.unsplash.com/photo-1597733153203-a54d0fbc47de?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1090&q=80" class="table-image" alt=""></td>
          <td>爽快快的</td>
          <td width="200">
            <select name="" id="" class="form-select">
              <option value="1">1</option>
            </select>
          </td>
          <td width="200" class="text-end">$900</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="5" class="text-end">
            總金額 NT$ 1000
          </td>
        </tr>
      </tfoot>
    </table>
  </div>`,
}