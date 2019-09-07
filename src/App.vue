<template>
  <div>
    <TestComponent></TestComponent>
  </div>
<!--  <f7-app :params="f7params">jo
    <f7-statusbar></f7-statusbar>
    <f7-view main url="/"></f7-view>
  </f7-app>
  -->
</template>

<script>
import TestComponent from "@/components/TestComponent.vue";

export default {
  name: "App",
  components: {
    TestComponent
  },
  data() {
    return {
      // Framework7 parameters that we pass to <f7-app> component
      /*
      f7params: {
        // Array with app routes
        //routes,
        name: "My App",
        id: "com.myapp.test",
        theme: "auto",
        // ...
      }
      */
    };
  },
  methods: {},
  computed: {}
};
</script>

<style>
</style>
