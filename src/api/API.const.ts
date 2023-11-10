import axios from 'axios';

const API_URL = 'http://localhost:5678';

export default {
  get_assets: () => {
    return axios.get(`${API_URL}/assets`);
  },
  get_asset_detail: (asset_uid: string) => {
    return axios.get(`${API_URL}/assets/${asset_uid}`);
  },
  get_person_info: (asset_uid: string) => {
    return axios.get(`${API_URL}/assets/${asset_uid}/persons`);
  }
};
