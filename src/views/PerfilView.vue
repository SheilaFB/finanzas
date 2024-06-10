<template>
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
  />
  <LayoutVue>
    <div class="perfil">
      <p>Actualizar cantidad de cuenta:</p>
      <div class="advertencia">
        <span class="material-symbols-outlined"> warning </span>
        <div class="mensaje-advertencia">
          <p>Esta acción no puede deshacerse</p>
        </div>
      </div>
      <form @submit.prevent="submitForm">
        <div class="cantidad">
          <input
            type="number"
            step="0.01"
            id="cantidad"
            placeholder="0"
            v-model="cantidad"
            required
          />
          <label for="cantidad">€</label>
        </div>
        <button type="submit">Actualizar</button>
      </form>
    </div>
  </LayoutVue>
</template>

<script>
import LayoutVue from "@/components/Layout.vue";
import { ref } from "vue";
import { actualizarCuenta } from "@/api/cuenta";

export default {
  name: "PerfilView",

  components: {
    LayoutVue,
  },

  setup() {
    let cantidad = ref(null);
    let token = ref("");

    const submitForm = async () => {
      token.value = sessionStorage.getItem("token");
      try {
        const data = {
          cantidad: cantidad.value,
        };
        console.log(data);
        await actualizarCuenta(data, token.value);
      } catch (error) {
        console.error("Error al actualizar la cuenta:", error);
      }
    };

    return {
      cantidad,
      submitForm,
    };
  },
};
</script>

<style lang="scss" scoped>
.perfil {
  margin: 1rem 2rem;

  form {
    display: flex;
    justify-content: center;

    .cantidad {
      input {
        border: none;
        background: transparent;
        text-align: right;
        width: 8rem;
        font-size: 2rem;
        background: linear-gradient(
          to top,
          rgba(182, 244, 146, 0.3),
          rgba(51, 139, 147, 0.3)
        );
        border-radius: 2rem;
        padding-right: 0.5rem;
      }
      label {
        font-size: 1.5rem;
        color: #ed9b40;
      }
    }

    button {
      margin-left: 1rem;
      border: none;
      color: #fff;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
      background: linear-gradient(
        80deg,
        rgba(30, 99, 105),
        rgba(122, 184, 106)
      );
      border-radius: 20px;
      background-size: 100% auto;
      font-size: 0.8rem;
      padding: 0.6em 1.5em;
      font-weight: 700;
    }
  }
  .advertencia {
    display: flex;
    align-items: center;
    background-color: rgba(255, 99, 71, 0.2);
    border-radius: 10px;
    padding: 10px;
    margin-bottom: 1rem;

    .material-symbols-outlined {
      margin-right: 0.3rem;
      color: #ff6347;
    }

    .mensaje-advertencia {
      color: #ff6347;
    }
  }
}
</style>
