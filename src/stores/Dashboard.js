import { action, observable, computed } from 'mobx';
import { addUser } from '../database/handler/User'

class Dashboard {

  @observable productDetails = [];
  @observable pageNO = 0;
  @action fetchProductDetails = (sortProducts) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        category_id: 13,
        filter: "",
        page_num: this.pageNO,
        sort: sortProducts,
        customer_id: 96,
        wcode: "DWK,HWH,S71",
      })
    }

    if (this.pageNO < 36) {
      fetch('https://preprod.vestigebestdeals.com/api/rest/dynamickittingproductlistwithfiltersortwarehouse', requestOptions)
        .then(res => res.json())
        .then(res => {
          this.productDetails = [...this.productDetails, ...res.data.items];
          this.pageNO += 1;
        }
        ).catch(error => {
          console.log('error in fetching data', error);
        });
    };
  }
  @computed get _productDetails() {
    return this.productDetails;
  }
}
export default Dashboard;