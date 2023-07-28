import axios from 'axios';

const BACKEND_URL = 'http://localhost:8081/api/';

class ContactService {

    getAllContacts(){
        return axios.get(BACKEND_URL + 'contacts');
    }

    updateContact(id) {
        return axios.put(BACKEND_URL + 'contact/' + id);
    }

}

export default new ContactService();