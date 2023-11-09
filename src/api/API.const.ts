import axios from 'axios';

const API_URL = 'http://localhost:5678';

export default {
    get_assets: () => {
        return axios.get(`${API_URL}/assets`);
    },
    get_asset_previews: (assets: string[]) => {
        return axios.post(
            `${API_URL}/asset_previews`,
            { assets: assets },
            { headers: { 'Content-Type': 'application/json' } }
        );
    },
    get_asset_detail: (asset_uid: string) => {
        return axios.get(`${API_URL}/assets/${asset_uid}`);
    }
};
