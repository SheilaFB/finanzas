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
        <select
          id="categoria"
          v-model="selectedCategoria"
          @change="handleCategoriaChange"
        >
          <option value="-1">Nueva categoría</option>
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
        <button
          type="button"
          v-if="idProp !== null"
          @click="eliminarOperacion"
          class="eliminar"
        >
          Eliminar
        </button>
      </div>
    </form>

    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>Nueva Categoría</h2>
        <input
          type="text"
          v-model="newCategoriaNombre"
          :class="{ 'input-error': inputError }"
          :placeholder="inputError ? 'Debe escribir un nombre' : 'Nombre'"
          @input="clearInputError"
        />
        <button @click="guardarNuevaCategoria">Guardar</button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, watch, onMounted } from "vue";
import {
  getCategoriasIngresosApi,
  crearCategoriaIngresoApi,
} from "../api/categoriaIngresos";
import {
  crearCategoriaGastoApi,
  getCategoriasGastoApi,
} from "../api/categoriasGastos";
import {
  createIngreso,
  modificarIngreso,
  eliminarIngreso,
} from "../api/ingresos";
import { createGasto, modificarGasto, eliminarGasto } from "../api/gastos";
import { useRouter } from "vue-router";

export default {
  name: "Operation",

  props: {
    isIngreso: {
      type: Boolean,
      default: true,
    },
    cantidadProp: {
      type: Number,
      default: null,
    },
    categoriaProp: {
      type: Object,
      default: null,
    },
    descripcionProp: {
      type: String,
      default: "",
    },
    idProp: {
      type: Number,
      default: null,
    },
  },

  setup(props) {
    let selectedCategoria = ref(null);
    let categorias = reactive([]);
    let cantidad = ref(props.cantidadProp);
    let description = ref(props.descripcionProp);
    let token = ref("");
    let valorInicialIngreso = props.isIngreso;
    const router = useRouter();

    const showModal = ref(false);
    const newCategoriaNombre = ref("");
    const inputError = ref(false);

    const cargarCategorias = async () => {
      token.value = sessionStorage.getItem("token");
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
      if (props.categoriaProp) {
        selectedCategoria.value = props.categoriaProp.id;
      }
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

      if (props.idProp) {
        try {
          //Si el prop inicial era un ingreso y sigue siendo un ingreso, lo modifica
          if (props.isIngreso && valorInicialIngreso) {
            data.idIngreso = props.idProp;
            await modificarIngreso(data, token.value);
            alert("Operación realizada con éxito");

            //Si el prop inicial era un ingreso pero ahora es un gasto, borra el ingreso y añade el gasto
          } else if (!props.isIngreso && valorInicialIngreso) {
            await eliminarIngreso(props.idProp, token.value);
            await createGasto(data, token.value);

            //Si el prop inical era un gasto y sigue siendo un gasto, lo modifica
          } else if (!props.isIngreso && !valorInicialIngreso) {
            data.idGasto = props.idProp;
            await modificarGasto(data, token.value);

            //Si inicialmente era un gasto pero ahora es un ingreso, borra el gasto y añade el ingreso
          } else if (props.isIngreso && !valorInicialIngreso) {
            await eliminarGasto(props.idProp, token.value);
            await createIngreso(data, token.value);
          }
          router.push("/");
        } catch (error) {
          console.log(error);
          alert("Error al realizar la operación");
        }
      } else {
        try {
          if (props.isIngreso) {
            await createIngreso(data, token.value);
          } else {
            await createGasto(data, token.value);
          }
          alert("Operación realizada con éxito");
          router.push("/");
        } catch (error) {
          alert("Error al realizar la operación");
        }
      }
    };

    const eliminarOperacion = async () => {
      if (valorInicialIngreso) {
        try {
          await eliminarIngreso(props.idProp, token.value);
          router.push("/");
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          await eliminarGasto(props.idProp, token.value);
          router.push("/");
        } catch (error) {
          console.log(error);
        }
      }
    };

    const handleCategoriaChange = () => {
      if (selectedCategoria.value === "-1") {
        showModal.value = true;
      }
    };

    const closeModal = () => {
      showModal.value = false;
      selectedCategoria.value = null;
      newCategoriaNombre.value = "";
      inputError.value = false;
    };

    const guardarNuevaCategoria = async () => {
      let result = "";
      if (newCategoriaNombre.value.trim() === "") {
        inputError.value = true;
        return;
      }
      try {
        const categoriaData = {
          nombre: newCategoriaNombre.value.trim(),
        };
        if (props.isIngreso) {
          result = await crearCategoriaIngresoApi(token.value, categoriaData);
        } else {
          result = await crearCategoriaGastoApi(token.value, categoriaData);
        }
        console.log("Categoría añadida:", categoriaData.nombre);
        closeModal();
        cargarCategorias();
        console.log(result);
        selectedCategoria.value = result.data.id;
      } catch (error) {
        console.error("Error al crear la categoría:", error);
        alert("Error al crear la categoría");
      }
    };

    const clearInputError = () => {
      if (inputError.value) {
        inputError.value = false;
      }
    };

    return {
      selectedCategoria,
      cantidad,
      description,
      categorias,
      submitForm,
      eliminarOperacion,
      showModal,
      newCategoriaNombre,
      inputError,
      handleCategoriaChange,
      closeModal,
      guardarNuevaCategoria,
      clearInputError,
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

        &.eliminar {
          margin-left: 2rem;
          background: linear-gradient(30deg, #ff6b6b, #ff8e8e);
        }
      }
    }
  }

  .modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
  }

  .modal-content {
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    max-width: 400px;
    border-radius: 10px;
    text-align: center;
  }

  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }

  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }

  input.input-error {
    border: 2px solid red;
    border-image: linear-gradient(to right, #ff0000, #ff7f7f, #ff0000) 1;
    &::placeholder {
      color: #ff7f7f;
    }
  }
}
</style>
