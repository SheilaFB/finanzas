<template>
  <div class="login">
    <Login class="form" />
  </div>
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

<style scoped lang="scss">
.login {
  background: linear-gradient(to top, rgb(182, 244, 146), rgb(51, 139, 147));

  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
