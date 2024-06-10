<template>
  <div class="contenedor-login">
    <div class="form-container">
      <form v-if="showLogin" @submit.prevent="submitLogin" class="login-form">
        <h2>Iniciar Sesión</h2>
        <div class="campo-formulario">
          <input
            type="text"
            id="usuario"
            v-model="usuario"
            required
            placeholder="Usuario"
          />
        </div>
        <div class="campo-formulario">
          <input
            type="password"
            id="contrasena"
            v-model="contrasena"
            placeholder="Contraseña"
            required
          />
        </div>
        <button type="submit" class="boton-login">Entrar</button>
      </form>
      <form v-else @submit.prevent="submitRegister" class="register-form">
        <h2>Registrarse</h2>
        <div class="campo-formulario">
          <input
            type="text"
            id="nuevo-usuario"
            v-model="nuevoUsuario"
            placeholder="Usuario"
            required
          />
        </div>
        <div class="campo-formulario">
          <input
            type="password"
            id="nueva-contrasena"
            v-model="nuevaContrasena"
            placeholder="Contraseña"
            required
          />
        </div>
        <button type="submit" class="boton-register">Registrarse</button>
      </form>
      <div class="form-toggle">
        <p v-if="showLogin">¿No tienes cuenta? |&nbsp;</p>
        <p v-if="!showLogin">¿Ya tienes cuenta? |&nbsp;</p>
        <a @click="toggleForm" class="toggle-button">
          {{ showLogin ? "Regístrate aquí" : "Iniciar Sesión" }}
        </a>
      </div>
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
  box-sizing: border-box;

  h2 {
    color: white;
    text-align: center;
    margin-top: 0;
  }

  input {
    box-sizing: border-box;
    width: 100%;
    height: 2rem;
    background: transparent;
    border-radius: 2rem;
    background-color: rgba(255, 255, 255, 0.5);
    border: 1px solid white;
    margin-bottom: 1rem;
    padding-left: 1rem;
    color: #27361f;
    font-weight: bold;

    ::placeholder {
      color: rgb(105, 147, 100);
    }

    &:focus {
      outline: none;
    }
  }

  .form-container {
    width: 15rem;
    form {
      button {
        background: rgb(51, 139, 147, 0.8);
        border: none;
        border-radius: 2rem;
        width: 100%;
        height: 2rem;
        color: white;
        font-weight: bold;
      }
    }

    .form-toggle {
      font-size: 0.8rem;
      display: flex;
      margin-top: 1rem;
      justify-content: center;
      color: #27361f;
      font-weight: 500;

      a {
        border-bottom: 1px solid rgb(51, 139, 147, 0.8);
      }

      p {
        margin: 0;
      }
    }
  }
}
</style>
