import { createStore } from "vuex";

export default createStore({
  state: {
    cantidadCuenta: 4010.05,
    moneda: "€",
    totalIngreso: 100.55,
    totalGasto: 100.5,
    balanceActual: 0,
    ingresos: [],
    gastos: [],
  },
  getters: {
    getCantidadCuenta: (state) => state.cantidadCuenta,
    getMoneda: (state) => state.moneda,
    getTotalIngreso: (state) => state.totalIngreso,
    getTotalGasto: (state) => state.totalGasto,
    getBalanceActual: (state) => state.balanceActual,
    getIngresos: (state) => state.ingresos,
    getGastos: (state) => state.gastos,
  },
  mutations: {
    setCantidadCuenta(state, newValue) {
      state.cantidadCuenta = newValue;
    },
    setMoneda(state, newValue) {
      state.moneda = newValue;
    },
    setTotalIngreso(state, newValue) {
      state.totalIngreso = newValue;
    },
    setTotalGasto(state, newValue) {
      state.totalGasto = newValue;
    },
    setBalanceActual(state, newValue) {
      state.balanceActual = newValue;
    },
    setIngresos(state, newValue) {
      state.ingresos = newValue;
    },
    setGastos(state, newValue) {
      state.gastos = gastos;
    },
  },
});
