<template>
  <div class="contenedor-login">
    <h2>Iniciar Sesión</h2>
    <form @submit.prevent="submitLogin">
      <div class="campo-formulario">
        <label for="usuario">Usuario</label>
        <input type="text" id="usuario" v-model="usuario" required />
      </div>
      <div class="campo-formulario">
        <label for="contrasena">Contraseña</label>
        <input type="password" id="contrasena" v-model="contrasena" required />
      </div>
      <button type="submit" class="boton-login">Entrar</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import auth from "@/api/login.js";
import getAccountAmount from "@/api/cuenta.js";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "Login",
  setup() {
    const usuario = ref("");
    const contrasena = ref("");
    const store = useStore();
    const router = useRouter();

    const submitLogin = async () => {
      try {
        const token = await auth.login({
          username: usuario.value,
          password: contrasena.value,
        });
        store.commit("setToken", token);
        localStorage.setItem("token", token);
        console.log("SESIÓN INICIADA");

        router.push("/");
      } catch (error) {
        console.error("Error during login:", error);
      }
    };

    return {
      usuario,
      contrasena,
      submitLogin,
    };
  },
};
</script>

<style lang="scss" scoped></style>
