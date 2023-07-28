import axios from 'axios';

const BACKEND_URL = 'http://localhost:8081/api/cart/';

class OrderService {

    getAllOrders(){
        return axios.get(BACKEND_URL + 'orders');
    }

    deliverOrder(cartId){
        return axios.put(BACKEND_URL + 'deliver' + cartId,{});
    }

}

export default new OrderService();
