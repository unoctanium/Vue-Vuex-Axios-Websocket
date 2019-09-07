const mutations = {
  SOCKET_ONOPEN(state, event) {
    state.isConnected = true;
    state.errorFlag = false;
  },
  SOCKET_ONCLOSE(state, event) {
    state.isConnected = false;
    if (state.reconnectTimeoutId) 
      clearTimeout(state.reconnectTimeoutId);
    state.socket = null;
  },
  SOCKET_ONERROR(state, event) {
    state.errorFlag = true;
  },
  SOCKET_ONMESSAGE(state, data) {
    state.data = JSON.parse(data);
  },
  SOCKET_ONRECONNECT(state, id) {
    state.reconnectTimeoutId = id;
  },
  SOCKET_OPEN(state, socket) {
    state.socket = socket;
  },
  SOCKET_CLOSE(state) {
    state.socket.close();
    state.errorFlag = false;
  }
};

const actions = {
  startAPI: function(context, url) {
    var socket = new WebSocket(url);
    context.commit("SOCKET_OPEN", socket);

    socket.onopen = function(event) {
      console.log("socket opened: " + url);
      context.commit("SOCKET_ONOPEN", event);
    };

    socket.onclose = function(event) {
      console.log("socket closed: " + url);
      context.commit("SOCKET_ONCLOSE", event);

      var reconnectTimeoutId = setTimeout(() => {
        console.log("reopening socket: " + url);
        context.dispatch("startFetch", (context, url));
      }, 5000).bind(this);
      context.commit("SOCKET_ONRECONNECT", reconnectTimeoutId);
    };

    socket.onmessage = function(event) {
      console.debug("WebSocket message received:", event.data);
      context.commit("SOCKET_ONMESSAGE", event.data);
    };

    socket.onerror = function(event) {
      console.log("socket error: " + url + ": ", event);
      context.commit("SOCKET_ONERROR", event);
    };
  },

  stopAPI: function(context) {
    context.commit("SOCKET_CLOSE");
  },

  sendMessage: function(context, message) {
    if (1 === context.state.socket.readyState)
      context.state.socket.send(message);
  }
};

const getters = {
  //jsonData: state => {
  //  return state.data.filter(todo => todo.done)
  //}
};

export default {
  namespaced: true,
  state() {
    return {
      socket: null,
      reconnectTimeoutId: null,
      isConnected: false,
      errorFlag: false,
      data: {}
    };
  },
  mutations,
  actions,
  getters
};
