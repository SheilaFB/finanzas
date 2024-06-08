<template>
  <div>
    <h1>Operaciones</h1>
    <form @submit.prevent="submitForm">
      <label for="cantidad">Cantidad:</label>
      <input type="number" step="0.01" id="cantidad" v-model="cantidad" />
      <br />

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
      <br />

      <label for="descripcion">Descripción:</label>
      <input type="text" id="descripcion" v-model="description" />
      <br />

      <label for="fecha">Fecha:</label>
      <input type="date" id="fecha" v-model="fecha" />
      <br />

      <button type="submit">Enviar</button>
    </form>
  </div>
</template>

<script>
import { reactive, ref, watch, onMounted } from "vue";
import { getCategoriasIngresosApi } from "../api/categoriaIngresos";
import { getCategoriasGastoApi } from "../api/categoriasGastos";

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
    let cantidad = ref(0.0);
    let description = ref("");
    let fecha = ref(new Date().toISOString().split("T")[0]);
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
      console.log(categorias);
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

    const submitForm = () => {
      console.log({
        selectedCategoria: selectedCategoria.value,
        cantidad: cantidad.value,
        description: description.value,
        fecha: fecha.value,
      });
    };

    return {
      selectedCategoria,
      cantidad,
      description,
      fecha,
      categorias,
      submitForm,
    };
  },
};
</script>
