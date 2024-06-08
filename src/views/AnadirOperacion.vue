<template>
  <LayoutVue>
    <div class="anadirOperacion">
      <div class="opciones">
        <p>x</p>
        <p>Guardar</p>
      </div>
      <div class="operaciones">
        <h2 :class="{ selected: isIngreso }" @click="toogleIngreso(true)">
          Ingreso
        </h2>
        <h2 :class="{ selected: !isIngreso }" @click="toogleIngreso(false)">
          Gasto
        </h2>
      </div>
      <operation-vue :isIngreso="isIngreso"></operation-vue>
    </div>
  </LayoutVue>
</template>

<script>
import LayoutVue from "@/components/Layout.vue";
import { ref } from "vue";
import OperationVue from "@/components/Operation.vue";

export default {
  name: "AnadirOperacion",

  components: {
    LayoutVue,
    OperationVue,
  },

  setup() {
    let isIngreso = ref(true);

    const toogleIngreso = (value) => {
      if (value !== isIngreso.value) isIngreso.value = !isIngreso.value;
    };

    return {
      isIngreso,
      toogleIngreso,
    };
  },
};
</script>

<style lang="scss" scoped>
.anadirOperacion {
  width: 100%;

  .opciones {
    width: 100%;
    background: #c9c9c9;
    display: flex;
    justify-content: space-between;

    p {
      margin: 0;
      padding: 1rem;
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
}
</style>
