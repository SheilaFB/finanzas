<template>
  <LayoutVue>
    <div class="charts">
      <div class="menu">
        <p :class="{ activo: showChart === 0 }" @click="showIngresos">
          Ingresos
        </p>
        <p :class="{ activo: showChart === 1 }" @click="showGastos">Gastos</p>
        <p :class="{ activo: showChart === 2 }" @click="showBalance">Balance</p>
      </div>
      <apexchart
        type="donut"
        :options="chartOptions"
        :series="currentSeries"
      ></apexchart>
      <div v-if="showChart === 0" class="category-list">
        <ul>
          <li v-for="(ingreso, index) in ingresos" :key="index">
            <span
              :style="{ backgroundColor: chartOptions.colors[index] }"
              class="color-box"
            ></span>
            {{ ingreso.nombre }}:
            {{ formatPercentage(ingreso.cantidad, totalIngresos) }}%
          </li>
        </ul>
      </div>
      <div v-if="showChart === 1" class="category-list">
        <ul>
          <li v-for="(gasto, index) in gastos" :key="index">
            <span
              :style="{ backgroundColor: chartOptions.colors[index] }"
              class="color-box"
            ></span>
            {{ gasto.nombre }}:
            {{ formatPercentage(gasto.cantidad, totalGastos) }}%
          </li>
        </ul>
      </div>
      <div v-if="showChart === 2" class="category-list">
        <ul>
          <li>
            <span
              :style="{ backgroundColor: chartOptions.colors[0] }"
              class="color-box"
            ></span>
            Ingresos: {{ formatPercentage(totalIngresos, balanceTotal) }}%
          </li>
          <li>
            <span
              :style="{ backgroundColor: chartOptions.colors[1] }"
              class="color-box"
            ></span>
            Gastos: {{ formatPercentage(totalGastos, balanceTotal) }}%
          </li>
        </ul>
      </div>
    </div>
  </LayoutVue>
</template>

<script>
import LayoutVue from "@/components/Layout.vue";
import { ref, computed, reactive, onMounted } from "vue";
import { useStore } from "vuex";
import VueApexCharts from "vue3-apexcharts";
import { getIngresosApi, getTotal } from "@/api/ingresos";
import { getGastosApi } from "@/api/gastos";

export default {
  name: "ChartView",

  components: {
    LayoutVue,
    apexchart: VueApexCharts,
  },

  setup() {
    const store = useStore();
    let showChart = ref(0);
    let ingresos = reactive([]);
    let gastos = reactive([]);
    let totalIngresos = ref(0);
    let totalGastos = ref(0);
    let token = ref("");
    let balanceTotal = ref("");

    const categoriasAgrupadas = (categorias, isIngreso) => {
      let categoriasAgrupadas = [];

      categorias.forEach((item) => {
        let catExistente = categoriasAgrupadas.find((categoria) =>
          isIngreso
            ? categoria.id === item.categoriaIngreso.id
            : categoria.id === item.categoriaGasto.id
        );
        if (catExistente) {
          catExistente.cantidad += parseFloat(item.cantidad);
        } else {
          categoriasAgrupadas.push({
            id: isIngreso ? item.categoriaIngreso.id : item.categoriaGasto.id,
            nombre: isIngreso
              ? item.categoriaIngreso.nombre
              : item.categoriaGasto.nombre,
            cantidad: parseFloat(item.cantidad),
          });
        }
      });

      return categoriasAgrupadas;
    };

    const getIngresos = async () => {
      try {
        const result = await getIngresosApi(token.value);
        ingresos.splice(
          0,
          ingresos.length,
          ...categoriasAgrupadas(result.data, true)
        );
      } catch (error) {
        console.error("Error en getIngresos", error);
      }
    };

    const getGastos = async () => {
      try {
        const result = await getGastosApi(token.value);
        gastos.splice(
          0,
          gastos.length,
          ...categoriasAgrupadas(result.data, false)
        );
      } catch (error) {
        console.error("Error en getGastos", error);
      }
    };

    onMounted(async () => {
      token.value = localStorage.getItem("token");
      await getIngresos(token.value);
      await getGastos(token.value);
      totalIngresos.value = getTotal(ingresos);
      totalGastos.value = getTotal(gastos);
      balanceTotal.value = totalIngresos.value + totalGastos.value;
    });

    const ingresosSeries = computed(() =>
      ingresos.map((ingreso) => ingreso.cantidad)
    );

    const gastosSeries = computed(() => gastos.map((gasto) => gasto.cantidad));

    const balanceSeries = computed(() => [
      totalIngresos.value,
      totalGastos.value,
    ]);

    const currentSeries = computed(() => {
      switch (showChart.value) {
        case 1:
          return gastosSeries.value;
        case 2:
          return balanceSeries.value;
        default:
          return ingresosSeries.value;
      }
    });

    const showIngresos = () => {
      showChart.value = 0;
    };

    const showGastos = () => {
      showChart.value = 1;
    };

    const showBalance = () => {
      showChart.value = 2;
    };

    const chartOptions = ref({
      chart: {
        type: "donut",
        width: 200,
      },
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      colors: [
        "#3B4D2A",
        "#65796B",
        "#8F8171",
        "#4F6B39",
        "#7C8A75",
        "#B0A392",
        "#627B4A",
        "#9BA590",
      ],
    });

    const formatPercentage = (value, total) => {
      return ((value / total) * 100).toFixed(2);
    };

    return {
      showChart,
      showGastos,
      showIngresos,
      showBalance,
      chartOptions,
      currentSeries,
      formatPercentage,
      totalIngresos,
      totalGastos,
      ingresos,
      gastos,
      balanceSeries,
      balanceTotal,
    };
  },
};
</script>

<style lang="scss" scoped>
.charts {
  width: 100%;
  .menu {
    margin: 1rem 0;
    display: flex;
    justify-content: space-evenly;

    .activo {
      border-bottom: 2px solid #ed9b40;
    }
  }
  .category-list {
    margin: 1rem 3rem;
    ul {
      list-style-type: none;
      padding: 0;
      li {
        margin-bottom: 0.5rem;
        display: flex;
        align-items: center;
      }
      .color-box {
        width: 1rem;
        height: 1rem;
        margin-right: 0.4rem;
      }
    }
  }
}
</style>
