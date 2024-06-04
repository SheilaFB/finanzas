<template>
  <Layout>
    <div class="home">
      <div class="cuenta">
        <p>Mi cuenta:</p>
        <p>
          {{ cantidadCuenta.toFixed(2)
          }}<span class="moneda">{{ moneda }}</span>
        </p>
      </div>
      <div class="ingresoGasto">
        <FlechaCantidadVue :isPositive="true" :amount="totalIngreso" />
        <FlechaCantidadVue :isPositive="false" :amount="totalGasto" />
      </div>
      <div class="balance">
        <p>Balance mensual: {{ balanceActual.toFixed(2) }}{{ moneda }}</p>
      </div>

      <div class="ingresos">
        <p>Últimos ingresos</p>
      </div>

      <div class="gastos">
        <p>Últimos gastos</p>
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from "@/components/Layout.vue";
import { ref } from "vue";
import { useStore } from "vuex";
import FlechaCantidadVue from "@/components/pieces/FlechaCantidad.vue";

export default {
  name: "HomeView",
  components: {
    Layout,
    FlechaCantidadVue,
  },

  setup() {
    let store = useStore();
    let cantidadCuenta = store.getters.getCantidadCuenta;
    let moneda = store.getters.getMoneda;
    let totalIngreso = store.getters.getTotalIngreso;
    let totalGasto = store.getters.getTotalGasto;
    let balanceActual = store.getters.getBalanceActual;

    return {
      cantidadCuenta,
      moneda,
      totalGasto,
      totalIngreso,
      balanceActual,
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
    margin: 2rem auto;
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

  .ingresoGasto {
    display: flex;
    width: 18rem;
    justify-content: space-around;
    margin: 0 auto;
  }

  .balance {
    margin: 1rem 3rem;
  }
}
</style>
