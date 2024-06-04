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

      <div class="movimientos">
        <p class="tipo">Últimos ingresos:</p>
        <div v-for="ingreso in ingresosPrueba" :key="ingreso.cat">
          <div class="movimiento">
            <p class="titulo">{{ ingreso.cat }}</p>
            <p class="cantidad">{{ ingreso.cantidad }}{{ moneda }}</p>
          </div>
        </div>
      </div>

      <div class="movimientos gastos">
        <p class="tipo">Últimos gastos:</p>
        <div v-for="gasto in gastosPrueba" :key="gasto.cat">
          <div class="movimiento">
            <p class="titulo">{{ gasto.cat }}</p>
            <p class="cantidad">{{ gasto.cantidad }}{{ moneda }}</p>
          </div>
        </div>
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
    let ingresosPrueba = [
      {
        cat: "Salario",
        cantidad: 1100.36,
      },
      {
        cat: "Alquiler",
        cantidad: 500,
      },
      {
        cat: "Regalo",
        cantidad: 50,
      },
    ];

    let gastosPrueba = [
      {
        cat: "Compra",
        cantidad: 258.47,
      },
      {
        cat: "Lego",
        cantidad: 499.99,
      },
      {
        cat: "Heladitos",
        cantidad: 15.99,
      },
    ];

    return {
      cantidadCuenta,
      moneda,
      totalGasto,
      totalIngreso,
      balanceActual,
      ingresosPrueba,
      gastosPrueba,
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
    margin: 2rem 3rem 0 3rem;
  }

  .movimientos {
    margin: 2rem 3rem;

    .tipo {
      margin-bottom: 0.5rem;
    }
    .movimiento {
      display: flex;
      font-size: 0.9rem;
      justify-content: space-between;
      border-bottom: dashed 2px #afa08c;
      margin-bottom: 0.5rem;
    }
  }
}
</style>
