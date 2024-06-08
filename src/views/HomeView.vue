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
        <div
          v-for="(ingreso, index) in ingresos.slice().reverse().slice(0, 3)"
          :key="index"
        >
          <div class="movimiento">
            <p class="titulo">{{ ingreso.categoriaIngreso.nombre }}</p>
            <p class="cantidad">{{ ingreso.cantidad }}{{ moneda }}</p>
          </div>
        </div>
      </div>

      <div class="movimientos gastos">
        <p class="tipo">Últimos gastos:</p>
        <div
          v-for="(gasto, index) in gastos.slice().reverse().slice(0, 3)"
          :key="index"
        >
          <div class="movimiento">
            <p class="titulo">{{ gasto.categoriaGasto.nombre }}</p>
            <p class="cantidad">{{ gasto.cantidad }}{{ moneda }}</p>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from "@/components/Layout.vue";
import { ref, onMounted, reactive } from "vue";
import FlechaCantidadVue from "@/components/FlechaCantidad.vue";
import getAccountAmount from "@/api/cuenta";
import { getIngresosApi, getTotal } from "@/api/ingresos";
import { getGastosApi } from "@/api/gastos";

export default {
  name: "HomeView",
  components: {
    Layout,
    FlechaCantidadVue,
  },

  setup() {
    const cantidadCuenta = ref(0);
    const moneda = ref("€");
    const totalIngreso = ref(0);
    const totalGasto = ref(0);
    let balanceActual = ref(0);
    const ingresos = reactive([]);
    const token = ref("");
    const gastos = reactive([]);

    /**
     * Obtiene la cantidad total de la cuenta
     */
    const getCantidad = async () => {
      try {
        cantidadCuenta.value = await getAccountAmount(token.value);
      } catch (error) {
        console.error("Error en getCuenta:", error);
      }
    };

    /**
     * Obtiene los ingresos
     */
    const getIngresos = async () => {
      try {
        const result = await getIngresosApi(token.value);
        ingresos.splice(0, ingresos.length, ...result.data);
      } catch (error) {
        console.error("Error en getIngresos", error);
      }
    };

    /**
     * Obtiene los gastos
     */
    const getGastos = async () => {
      try {
        const result = await getGastosApi(token.value);
        gastos.splice(0, ingresos.length, ...result.data);
      } catch (error) {
        console.error("Error en getGastos", error);
      }
    };

    onMounted(async () => {
      token.value = localStorage.getItem("token");
      await getCantidad();
      await getIngresos();
      totalIngreso.value = getTotal(ingresos);
      await getGastos();
      totalGasto.value = getTotal(gastos);
      balanceActual.value = totalIngreso.value - totalGasto.value;
    });

    return {
      cantidadCuenta,
      moneda,
      totalGasto,
      totalIngreso,
      balanceActual,
      ingresos,
      gastos,
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
