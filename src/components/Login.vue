<template>
  <div class="contenedor-login">
    <div class="form-toggle">
      <button @click="toggleForm" class="toggle-button">
        {{ showLogin ? "Registrarse" : "Iniciar Sesión" }}
      </button>
    </div>
    <div class="form-container">
      <form v-if="showLogin" @submit.prevent="submitLogin" class="login-form">
        <h2>Iniciar Sesión</h2>
        <div class="campo-formulario">
          <label for="usuario">Usuario</label>
          <input type="text" id="usuario" v-model="usuario" required />
        </div>
        <div class="campo-formulario">
          <label for="contrasena">Contraseña</label>
          <input
            type="password"
            id="contrasena"
            v-model="contrasena"
            required
          />
        </div>
        <button type="submit" class="boton-login">Entrar</button>
      </form>
      <form v-else @submit.prevent="submitRegister" class="register-form">
        <h2>Registrarse</h2>
        <div class="campo-formulario">
          <label for="nuevo-usuario">Usuario</label>
          <input
            type="text"
            id="nuevo-usuario"
            v-model="nuevoUsuario"
            required
          />
        </div>
        <div class="campo-formulario">
          <label for="nueva-contrasena">Contraseña</label>
          <input
            type="password"
            id="nueva-contrasena"
            v-model="nuevaContrasena"
            required
          />
        </div>
        <button type="submit" class="boton-register">Registrarse</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import auth from "@/api/login.js";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "Login",
  setup() {
    const usuario = ref("");
    const contrasena = ref("");
    const nuevoUsuario = ref("");
    const nuevaContrasena = ref("");
    const showLogin = ref(true);
    const store = useStore();
    const router = useRouter();

    const toggleForm = () => {
      showLogin.value = !showLogin.value;
    };

    const submitLogin = async () => {
      try {
        const token = await auth.login({
          username: usuario.value,
          password: contrasena.value,
        });
        store.commit("setToken", token);
        sessionStorage.setItem("token", token);
        console.log("SESIÓN INICIADA");
        router.push("/");
      } catch (error) {
        console.error(error);
      }
    };

    const submitRegister = async () => {
      try {
        const token = await auth.register({
          username: nuevoUsuario.value,
          password: nuevaContrasena.value,
        });
        store.commit("setToken", token);
        sessionStorage.setItem("token", token);
        console.log("SESIÓN INICIADA");
        router.push("/");
      } catch (error) {
        console.error(error);
      }
    };

    return {
      usuario,
      contrasena,
      nuevoUsuario,
      nuevaContrasena,
      showLogin,
      toggleForm,
      submitLogin,
      submitRegister,
    };
  },
};
</script>

<style lang="scss" scoped>
.contenedor-login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.form-toggle {
  margin-bottom: 20px;
}

.toggle-button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.campo-formulario {
  margin-bottom: 15px;
}

.boton-login,
.boton-register {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.form-container {
  width: 300px;
  display: flex;
  flex-direction: column;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}
</style>
