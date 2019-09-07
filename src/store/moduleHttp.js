import axios from "axios"

const mutations = {
  AXIOS_ONCONNECT(state, options) {
    if (options.url || options.interval) {
      state.url = options.url || ""
      state.pollInterval = options.interval || 0
    }
    else {
      state.url = options
      state.pollInterval =  0
    }
    state.errorFlag = false;
  },
  AXIOS_ONCLOSE(state, event) {
    if (state.pollIntervalId) 
      clearInterval(state.pollIntervalId);
    state.errorFlag = false;
  },
  AXIOS_ONERROR(state, event) {
    state.errorFlag = true;
  },
  AXIOS_ONMESSAGE(state, data) {
    //state.data = JSON.parse(data);
    state.data = data;
  },
  AXIOS_ONRECONNECT(state, id) {
    state.pollIntervalId = id;
  },
};

const actions = {

  startAPI: function(context, options) {
    context.commit("AXIOS_ONCONNECT", options);
    context.dispatch('get', context.state.url);

    if (context.state.pollInterval) {
      var pollIntervalId = setInterval(() => {
        console.log("reopening url: " + context.state.url);
        context.dispatch("get", (context, context.state.url));
      }, 1000 * context.state.pollInterval);
      context.commit("AXIOS_ONRECONNECT", pollIntervalId);
    }
  },

  stopAPI: function(context, options) {
    context.commit('AXIOS_ONCLOSE')
  },

  get: function(context, url) {
    
    axios
      .get(url)
      .then(response => {
        console.log(response.data)
        context.commit('AXIOS_ONMESSAGE', response.data)
      })
      .catch(error => {
        context.commit('AXIOS_ONERROR', error)
        if (error.response) {
          // Request made and server responded
          console.log("axios response error:")
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log("axios no response error: ", error.request)
        } else {
          console.log('axios error', error.message);
        }
      })
      //.finally(() => console.log("done"))
  },

  send: function(context) {

  }


};

const getters = {};

export default {
  namespaced: true,
  state() {
    return {
      url: null,
      pollIntervalId: null,
      pollInterval: 0,
      errorFlag: false,
      data: {}
    };
  },
  mutations,
  actions,
  getters
};


