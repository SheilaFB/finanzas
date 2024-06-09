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
  background: #afa08c;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .form {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    padding: 2rem;
  }
}
</style>
