import axios from 'axios';

const BACKEND_URL = 'http://localhost:8081/api/dashboard/';

class DashboardService {

    getAllData(){
        return axios.get(BACKEND_URL + 'stat');
    }

}

export default new DashboardService();
