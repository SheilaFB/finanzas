<template>
  <LayoutVue>
    <div class="operacionesView">
      <div class="operaciones">
        <h2 :class="{ selected: isIngreso }" @click="toggleIngreso(true)">
          Ingreso
        </h2>
        <h2 :class="{ selected: !isIngreso }" @click="toggleIngreso(false)">
          Gasto
        </h2>
      </div>

      <div class="filtro">
        <input
          type="text"
          v-model="filtroDescripcion"
          @input="filtrarLista"
          placeholder="Filtrar por descripción"
        />
      </div>

      <div class="operaciones-list">
        <div v-if="isIngreso">
          <div
            v-for="ingreso in ingresosFiltrados"
            :key="ingreso.id"
            class="operacion-wrapper"
            @click="redirectToAnadirOperacion(true, ingreso)"
            style="cursor: pointer"
          >
            <div class="categoria-cantidad-wrapper">
              <div class="categoria">{{ ingreso.categoriaIngreso.nombre }}</div>
              <div class="cantidad">{{ ingreso.cantidad }}€</div>
            </div>
            <div class="descripcion">{{ ingreso.descripcion }}</div>
          </div>
        </div>
        <div v-else>
          <div
            v-for="gasto in gastosFiltrados"
            :key="gasto.id"
            class="operacion-wrapper"
            @click="redirectToAnadirOperacion(false, gasto)"
            style="cursor: pointer"
          >
            <div class="categoria-cantidad-wrapper">
              <div class="categoria">{{ gasto.categoriaGasto.nombre }}</div>
              <div class="cantidad">{{ gasto.cantidad }}€</div>
            </div>
            <div class="descripcion">{{ gasto.descripcion }}</div>
          </div>
        </div>
      </div>
    </div>
  </LayoutVue>
</template>

<script>
import LayoutVue from "@/components/Layout.vue";
import { ref, reactive, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { getIngresosApi } from "@/api/ingresos";
import { getGastosApi } from "@/api/gastos";

export default {
  name: "OperacionesView",

  components: {
    LayoutVue,
  },

  setup() {
    let isIngreso = ref(true);
    const ingresos = reactive([]);
    const token = ref("");
    const gastos = reactive([]);
    const filtroDescripcion = ref("");
    const router = useRouter();

    const toggleIngreso = (value) => {
      if (value !== isIngreso.value) isIngreso.value = value;
      filtroDescripcion.value = "";
    };

    const filtrarPorDescripcion = (elemento, descripcion) => {
      return elemento.descripcion
        .toLowerCase()
        .includes(descripcion.toLowerCase());
    };

    const getIngresos = async () => {
      try {
        const result = await getIngresosApi(token.value);
        ingresos.splice(0, ingresos.length, ...result.data);
      } catch (error) {
        console.error("Error en getIngresos", error);
      }
    };

    const getGastos = async () => {
      try {
        const result = await getGastosApi(token.value);
        gastos.splice(0, ingresos.length, ...result.data);
      } catch (error) {
        console.error("Error en getGastos", error);
      }
    };

    const ingresosFiltrados = computed(() =>
      ingresos.filter((ingreso) =>
        filtrarPorDescripcion(ingreso, filtroDescripcion.value)
      )
    );

    const gastosFiltrados = computed(() =>
      gastos.filter((gasto) =>
        filtrarPorDescripcion(gasto, filtroDescripcion.value)
      )
    );

    const filtrarLista = () => {
      if (isIngreso.value) {
        ingresosFiltrados.value;
      } else {
        gastosFiltrados.value;
      }
    };

    const redirectToAnadirOperacion = (isIngreso, operacion) => {
      router.push({
        name: "add",
        params: {
          isIngreso: isIngreso.toString(),
          operacion: JSON.stringify(operacion),
          home: false,
        },
      });
    };

    onMounted(async () => {
      token.value = sessionStorage.getItem("token");
      await getIngresos();
      await getGastos();
    });

    return {
      isIngreso,
      toggleIngreso,
      ingresos,
      gastos,
      filtroDescripcion,
      filtrarPorDescripcion,
      ingresosFiltrados,
      gastosFiltrados,
      filtrarLista,
      redirectToAnadirOperacion,
    };
  },
};
</script>

<style lang="scss" scoped>
.operacionesView {
  width: 100%;
  .operaciones {
    padding-top: 1rem;
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

  .filtro {
    margin-top: 1rem;
    padding: 0 1.5rem;

    input {
      box-sizing: border-box;
      width: 60%;
      height: 2rem;
      background: transparent;
      border-radius: 2rem;
      background-color: rgba(255, 255, 255);
      border: 1px solid white;
      margin-bottom: 1rem;
      padding-left: 0.5rem;
      color: #27361f;
      font-weight: bold;

      ::placeholder {
        color: rgb(105, 147, 100);
      }

      &:focus {
        outline: none;
      }
    }
  }

  .operaciones-list {
    .operacion-wrapper {
      background: linear-gradient(
        to top,
        rgba(182, 244, 146, 0.3),
        rgba(51, 139, 147, 0.3)
      );
      margin: 1rem 2rem;
      border-radius: 0.5rem;
      padding: 10px;
    }

    .categoria-cantidad-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .categoria {
      font-weight: bold;
    }

    .cantidad {
      margin-top: 5px;
    }

    .descripcion {
      margin-top: 5px;
    }
  }
}

@media (min-width: 768px) {
  .operacionesView {
    .filtro {
      width: 50%;
      margin: 2rem 5rem;
    }
  }

  .operaciones-list {
    margin: 2rem 5rem;
  }
}
</style>
