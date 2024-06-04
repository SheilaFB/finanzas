<template>
  <div class="layout">
    <div class="header">
      <img
        width="30"
        height="30"
        src="https://img.icons8.com/ios-filled/100/ED9B40/money-bag-euro.png"
        alt="money-bag-euro"
      />
      <p class="title">Mis finanzas</p>
    </div>
    <div class="content">
      <slot></slot>
    </div>
    <div class="footer">
      <div class="home">
        <span class="material-symbols-outlined">home</span>
      </div>
      <div class="charts">
        <span class="material-symbols-outlined">donut_large</span>
      </div>
      <div class="perfil">
        <span class="material-symbols-outlined">person</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Layout",
};
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;

  p {
    margin: 0;
  }

  .header {
    background: #27361f;
    height: 4em;
    display: flex;
    align-items: center;
    color: #ededed;

    img {
      margin: 0 0.5rem 0 1rem;
      color: black;
    }
  }

  .content {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: flex-start;
  }

  .footer {
    display: flex;
    background: #27361f;
    height: 5em;
    position: fixed;
    bottom: 0;
    width: 100%;
    justify-content: space-around;
    align-items: center;

    span {
      font-size: 3rem;
      color: #ededed;
    }
  }
}
</style>
