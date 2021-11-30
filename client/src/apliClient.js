import nexus from "./nexus";

const axios = require("axios");
const url = "http://localhost:3001";

class apiClient {
  async makeCall(ext, data) {
    try {
      const res = await axios.post(url + ext, data, {
        headers: {
          "Access-Control-Allow-Origin": true,
        },
      });
      if (res.status === 200) {
        return res;
      }
      throw new Error(res.status);
    } catch (e) {
      return e;
    }
  }

  // master filter/logic
  async updateDictionary(msg, keep) {
    const nexRet = nexus(msg, keep);
    // const res = await this.makeCall(url + "/update", data);
    // console.log(res);
    let res = await this.makeCall("/update", nexRet);
    return nexRet;
  }
}

export default apiClient;
