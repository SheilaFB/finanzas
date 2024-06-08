<template>
  <div class="operation-form">
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

      <div class="form-row categoria">
        <label for="categoria">Categoría:</label>
        <select id="categoria" v-model="selectedCategoria">
          <option
            v-for="categoria in categorias"
            :key="categoria.id"
            :value="categoria.id"
          >
            {{ categoria.nombre }}
          </option>
        </select>
      </div>

      <div class="descripcion">
        <label for="descripcion">Descripción:</label>
        <input type="text" id="descripcion" v-model="description" />
      </div>
      <div class="botones">
        <button type="submit">Guardar</button>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive, ref, watch, onMounted } from "vue";
import { getCategoriasIngresosApi } from "../api/categoriaIngresos";
import { getCategoriasGastoApi } from "../api/categoriasGastos";
import { createIngreso } from "../api/ingresos";
import { createGasto } from "../api/gastos";

export default {
  name: "Operation",

  props: {
    isIngreso: {
      type: Boolean,
      default: true,
    },
  },

  setup(props) {
    let selectedCategoria = ref(null);
    let categorias = reactive([]);
    let cantidad = ref();
    let description = ref("");
    let token = ref("");

    const cargarCategorias = async () => {
      token.value = localStorage.getItem("token");
      let resultGastos = await getCategoriasGastoApi(token.value);
      let resultIngresos = await getCategoriasIngresosApi(token.value);
      if (props.isIngreso) {
        categorias.splice(0, categorias.length, ...resultIngresos.data);
      } else {
        categorias.splice(0, categorias.length, ...resultGastos.data);
      }
    };

    watch(
      () => props.isIngreso,
      () => {
        cargarCategorias();
      }
    );

    onMounted(() => {
      cargarCategorias();
    });

    const submitForm = async () => {
      if (cantidad.value <= 0) {
        alert("La cantidad debe ser mayor que cero");
        return;
      }

      if (!selectedCategoria.value) {
        alert("Debe seleccionar una categoría");
        return;
      }
      const data = {
        cantidad: cantidad.value,
        descripcion: description.value,
        categoria_id: selectedCategoria.value,
      };
      try {
        if (props.isIngreso) {
          await createIngreso(data, token.value);
        } else {
          await createGasto(data, token.value);
        }
        alert("Operación realizada con éxito");
      } catch (error) {
        alert("Error al realizar la operación");
      }
    };

    return {
      selectedCategoria,
      cantidad,
      description,
      categorias,
      submitForm,
    };
  },
};
</script>

<style lang="scss">
.operation-form {
  box-sizing: border-box;
  input {
    &:focus {
      outline: none;
    }
  }

  form {
    .cantidad {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 2rem;
      font-size: 2rem;

      input {
        width: 50%;
        font-size: 2rem;
        text-align: right;
        background: transparent;
        border: none;
        margin-right: 0.5rem;
        border-bottom: 2px solid #27361f;

        &:focus {
          outline: none;
        }
      }

      label {
        color: #ed9b40;
      }
    }

    .form-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;

      select {
        width: 50%;
        font-size: 1rem;
        padding: 0.3rem;
        border: none;
        border-radius: 0.5rem;
        background-color: #ffffff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        cursor: pointer;
        outline: none;
      }
    }

    .descripcion {
      input {
        margin-top: 0.5rem;
        width: 96.5%;
        background: transparent;
        border: none;
        border-bottom: 2px solid #27361f;
      }
      margin-bottom: 2rem;
    }

    .botones {
      display: flex;
      justify-content: center;

      button {
        border: none;
        color: #fff;
        background: linear-gradient(30deg, #80a16c, #30594c);
        border-radius: 20px;
        background-size: 100% auto;
        font-size: 17px;
        padding: 0.6em 1.5em;
      }
    }
  }
}
</style>
