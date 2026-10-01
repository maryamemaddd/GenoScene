const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

const API = 'http://localhost:3000/api';

async function runTests() {
    try {
        console.log("--- REGISTERING USER A ---");
        const uA = await axios.post(`${API}/auth/register`, { name: 'UA', email: `ua${Date.now()}@test.com`, password: 'password123' });
        const tokenA = uA.data.token;

        console.log("--- REGISTERING USER B ---");
        const uB = await axios.post(`${API}/auth/register`, { name: 'UB', email: `ub${Date.now()}@test.com`, password: 'password123' });
        const tokenB = uB.data.token;

        console.log("--- VALIDATING JWT 7-DAY CLAIMS ---");
        const payload = JSON.parse(Buffer.from(tokenA.split('.')[1], 'base64').toString());
        const lifespanSeconds = payload.exp - payload.iat;
        const days = lifespanSeconds / (60 * 60 * 24);
        console.log(`Token lifespan: ${days} days (${lifespanSeconds} seconds)`);

        console.log("--- USER A PREDICTS ---");
        const form = new FormData();
        form.append('file', fs.createReadStream('../ai/fast_test.csv'));
        const predResp = await axios.post(`${API}/predict`, form, {
            headers: { ...form.getHeaders(), Authorization: `Bearer ${tokenA}` }
        });
        console.log("Prediction Success:", !!predResp.data.Eye);

        console.log("--- USER A COMPUTES HISTORY ---");
        const histA = await axios.get(`${API}/predictions/history`, { headers: { Authorization: `Bearer ${tokenA}` } });
        console.log("History A Count:", histA.data.length);
        const predId = histA.data[0]._id;

        console.log("--- USER B FETCHES OWN HISTORY ---");
        const histB = await axios.get(`${API}/predictions/history`, { headers: { Authorization: `Bearer ${tokenB}` } });
        console.log("History B Count:", histB.data.length);

        console.log("--- USER B ATTEMPTS FETCH USER A ---");
        try {
            await axios.get(`${API}/predictions/${predId}`, { headers: { Authorization: `Bearer ${tokenB}` } });
        } catch (err) {
            console.log("User B fetching A intercepted properly:", err.response.data);
        }

        console.log("--- UNAUTH POST ---");
        try {
            await axios.post(`${API}/predict`, form, { headers: { ...form.getHeaders() } });
        } catch (err) { console.log(err.response.data); }

        console.log("--- EXISTENTIAL RUNTIMES ---");
        const h = await axios.get(`${API}/health`);
        const ah = await axios.get(`${API}/ai-health`);
        console.log("Health endpoints OK:", h.data.status, ah.data.status);

    } catch (err) {
        console.error(err.response ? err.response.data : err.message);
    }
}
runTests();

