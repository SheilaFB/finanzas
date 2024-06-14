<template>
  <LayoutVue>
    <div class="anadirOperacion">
      <div class="opciones">
        <router-link class="link" v-if="home" to="/">x</router-link>
        <router-link class="link" v-else to="/operaciones">x</router-link>
      </div>
      <div class="operaciones">
        <h2 :class="{ selected: isIngreso }" @click="toggleIngreso(true)">
          Ingreso
        </h2>
        <h2 :class="{ selected: !isIngreso }" @click="toggleIngreso(false)">
          Gasto
        </h2>
      </div>
      <operation-vue
        :isIngreso="isIngreso"
        class="operationComponent"
        v-if="operacion === null"
      ></operation-vue>
      <operation-vue
        :isIngreso="isIngreso"
        class="operationComponent"
        v-else
        :cantidadProp="operacion.cantidad"
        :categoriaProp="
          isIngreso ? operacion.categoriaIngreso : operacion.categoriaGasto
        "
        :descripcionProp="operacion.descripcion"
        :idProp="operacion.id"
      ></operation-vue>
    </div>
  </LayoutVue>
</template>

<script>
import LayoutVue from "@/components/Layout.vue";
import { ref } from "vue";
import OperationVue from "@/components/Operation.vue";
import { useRoute } from "vue-router";

export default {
  name: "AnadirOperacion",

  props: {
    operacion: {
      type: String,
      default: null,
    },
    isIngreso: {
      type: String,
      default: "true",
    },
    home: {
      type: String,
      default: "true",
    },
  },

  components: {
    LayoutVue,
    OperationVue,
  },

  setup(props) {
    console.log(props.isIngreso);
    let isIngreso = ref(props.isIngreso === "true");
    console.log(isIngreso.value);
    let operacion = ref(null);
    const home = props.home === "true";

    if (props.operacion) {
      try {
        operacion.value = JSON.parse(props.operacion);
      } catch (e) {
        console.error("Failed to parse operacion JSON:", e);
      }
    }
    const toggleIngreso = (value) => {
      if (value !== isIngreso.value) isIngreso.value = value;
    };

    return {
      isIngreso,
      operacion,
      toggleIngreso,
      home,
    };
  },
};
</script>

<style scoped lang="scss">
.anadirOperacion {
  width: 100%;
  display: flex;
  flex-direction: column;

  .opciones {
    width: 100%;
    background: #c9c9c9;
    display: flex;
    justify-content: space-between;

    .link {
      margin: 0;
      padding: 1rem;
      color: black;
      text-decoration: none;
      font-size: 1.5rem;
    }
  }

  .operaciones {
    h2 {
      margin: 0;
      padding: 0.2rem 1.5rem 0 1.5rem;
      border-top-left-radius: 1rem;
      border-top-right-radius: 1rem;
      min-width: 5rem;
      color: rgba(50, 50, 50, 0.8);
      font-weight: 500;

      &.selected {
        background: #ededed;
        box-shadow: -5px 0 5px -5px #333;
        color: black;
      }
    }
    background: #c9c9c9;
    display: flex;
    justify-content: space-around;
  }

  .operationComponent {
    margin: 5rem;
  }
}

@media (min-width: 768px) {
  .anadirOperacion {
    .operationComponent {
      width: 30%;
      margin: 5rem auto;
    }
  }
}
</style>
