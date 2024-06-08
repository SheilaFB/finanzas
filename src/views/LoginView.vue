<template>
  <LayoutVue>
    <Login />
  </LayoutVue>
</template>

<script>
import LayoutVue from "@/components/Layout.vue";
import Login from "../components/Login.vue";

export default {
  name: "App",
  components: {
    Login,
    LayoutVue,
  },
};
</script>
