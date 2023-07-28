import axios from 'axios';

const BACKEND_URL = 'http://localhost:8081/api/paint/';

class PaintService {

    getAllPaints(){
        return axios.get(BACKEND_URL + 'findall')
    }

    createPaint(product){
        return axios.post(BACKEND_URL + 'product', product)
    }

    deletePaint(id){
        return axios.delete(BACKEND_URL + 'delete/' + id)
    }

    updatePaint(product) {
        return axios.put(BACKEND_URL + 'product', product)
    }
}

export default new PaintService();
