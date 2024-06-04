<template>
  <Layout>
    <div class="home">
      <div class="cuenta">
        <p>Mi cuenta:</p>
        <p>
          {{ cantidadCuenta }}<span class="moneda">{{ moneda }}</span>
        </p>
      </div>
      <div class="ingresoGasto">
        <FlechaCantidadVue :isPositive="true" :amount="100" />
        <FlechaCantidadVue :isPositive="false" :amount="100" />
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from "@/components/Layout.vue";
import { ref } from "vue";
import FlechaCantidadVue from "@/components/pieces/FlechaCantidad.vue";

export default {
  name: "HomeView",
  components: {
    Layout,
    FlechaCantidadVue,
  },

  setup() {
    let cantidadCuenta = ref(4000);
    let moneda = ref("€");

    return {
      cantidadCuenta,
      moneda,
    };
  },
};
</script>

<style scoped lang="scss">
.home {
  width: 100%;
  p {
    margin: 0;
  }
  .cuenta {
    width: 15rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1rem auto;
    padding: 1rem 0;
    --s: 50px;
    --t: 5px;
    --g: 20px;

    padding: calc(var(--g) + var(--t));
    outline: var(--t) solid #afa08c;
    outline-offset: calc(-1 * var(--t));
    mask: conic-gradient(at var(--s) var(--s), #0000 75%, #000 0) 0 0 /
        calc(100% - var(--s)) calc(100% - var(--s)),
      linear-gradient(#000 0 0) content-box;

    p:first-child {
      color: #808f82;
    }

    p:nth-child(2) {
      font-size: 2rem;

      .moneda {
        margin-left: 0.2rem;
        color: #ed9b40;
      }
    }
  }
}
</style>
