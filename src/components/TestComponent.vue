<template>
  <div>
    <h1>Test Component</h1>
    <p>{{isConnected}}</p>
    <div>
      <input :value="input" @input="input = $event.target.value">
      <button @click="sendMessage(input)">Send</button>
    </div>
    <p>{{rawData}}</p>
    <p>{{srawData}}</p>
    <!--<p>{{sisConnected}}</p>-->
    <!--<p>{{interpretedData}}</p>-->
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      input: ""
    };
  },
  computed: {
    ...mapState("settings", {
      isConnected: state => state.isConnected,
      rawData: state => state.data
    }),
    ...mapState("testhttp", {
      srawData: state => state.data
    })
  },
  methods: {
    sendMessage(message) {
      this.$store.dispatch("settings/sendMessage", message);
    }
  }
};
</script>

<style></style>
