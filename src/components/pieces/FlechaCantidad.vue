<template>
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
  />
  <div class="arrow">
    <span class="material-symbols-outlined" :class="{ arrowRed: !isPositive }">
      {{ arrowDirection }}
    </span>
    <span>{{ amount }}</span>
  </div>
</template>

<script>
import { computed } from "vue";

export default {
  name: "ArrowAmount",
  props: {
    isPositive: {
      type: Boolean,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const arrowDirection = computed(() =>
      props.isPositive ? "arrow_upward" : "arrow_downward"
    );

    return {
      arrowDirection,
    };
  },
};
</script>

<style scoped lang="scss">
.arrow {
  display: flex;
  align-items: center;
  font-size: 1.5rem;

  .material-symbols-outlined {
    color: #6aa34d;
    margin-right: 0.5rem;
  }

  .arrowRed {
    color: #e74c3c;
  }
}
</style>
