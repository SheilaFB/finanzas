<template>
  <Layout v-if="existeCuenta">
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
        <template v-if="ingresos.length === 0">
          <p>No tiene ingresos</p>
        </template>
        <template v-else>
          <div
            v-for="(ingreso, index) in ingresos.slice().reverse().slice(0, 3)"
            :key="index"
            @click="redirectToAnadirOperacion(true, ingreso)"
            style="cursor: pointer"
          >
            <div class="movimiento">
              <p class="titulo">{{ ingreso.categoriaIngreso.nombre }}</p>
              <p class="cantidad">{{ ingreso.cantidad }}{{ moneda }}</p>
            </div>
          </div>
        </template>
      </div>

      <div class="movimientos gastos">
        <p class="tipo">Últimos gastos:</p>
        <template v-if="gastos.length === 0">
          <p>No tiene gastos</p>
        </template>
        <template v-else>
          <div
            v-for="(gasto, index) in gastos.slice().reverse().slice(0, 3)"
            :key="index"
            @click="redirectToAnadirOperacion(false, gasto)"
            style="cursor: pointer"
          >
            <div class="movimiento">
              <p class="titulo">{{ gasto.categoriaGasto.nombre }}</p>
              <p class="cantidad">{{ gasto.cantidad }}{{ moneda }}</p>
            </div>
          </div>
        </template>
      </div>
    </div>
  </Layout>

  <template v-else>
    <div class="nuevaCuenta">
      <h1>¡Bienvenido a MisFinanzas App!</h1>
      <p>Introduzca la cantidad para comenzar a utilizar su cuenta:</p>
      <form @submit="submitForm">
        <div class="cantidad">
          <input
            type="number"
            step="0.01"
            id="cantidad"
            placeholder="0"
            v-model="cantidadCuenta"
            required
          />
          <label for="cantidad">€</label>
        </div>
        <button type="submit" class="btn">Comenzar</button>
      </form>
    </div>
  </template>
</template>

<script>
import Layout from "@/components/Layout.vue";
import { ref, onMounted, reactive } from "vue";
import FlechaCantidadVue from "@/components/FlechaCantidad.vue";
import { getAccountAmount, createAccount } from "@/api/cuenta";
import { getIngresosApi, getTotal } from "@/api/ingresos";
import { getGastosApi } from "@/api/gastos";
import { useRouter } from "vue-router";

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
    const router = useRouter();
    let existeCuenta = ref(false);

    /**
     * Obtiene la cantidad total de la cuenta
     */
    const getCantidad = async () => {
      try {
        cantidadCuenta.value = await getAccountAmount(token.value);
        existeCuenta.value = true;
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

    const redirectToAnadirOperacion = (isIngreso, operacion) => {
      router.push({
        name: "add",
        params: {
          isIngreso: isIngreso.toString(),
          operacion: JSON.stringify(operacion),
          home: true,
        },
      });
    };

    onMounted(async () => {
      token.value = sessionStorage.getItem("token");
      await getCantidad();
      if (existeCuenta.value) {
        await getIngresos();
        totalIngreso.value = getTotal(ingresos);
        await getGastos();
        totalGasto.value = getTotal(gastos);
        balanceActual.value = totalIngreso.value - totalGasto.value;
      }
    });

    const submitForm = async () => {
      token.value = sessionStorage.getItem("token");
      try {
        const data = {
          cantidad: cantidadCuenta.value,
        };
        console.log(data);
        await createAccount(data, token.value);
      } catch (error) {
        console.error("Error al crear la cuenta:", error);
      }
    };

    return {
      cantidadCuenta,
      moneda,
      totalGasto,
      totalIngreso,
      balanceActual,
      ingresos,
      gastos,
      redirectToAnadirOperacion,
      existeCuenta,
      submitForm,
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

.nuevaCuenta {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;

  input {
    &:focus {
      outline: none;
    }
  }

  form {
    display: flex;
    flex-direction: column;
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

    .btn {
      width: 20%;
      align-self: center;
    }
  }
}
</style>
