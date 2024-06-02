<template>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
<div class="layout">
  <div class="header">
  <img width="26" height="26" src="https://img.icons8.com/metro/26/FFFFFF/money-bag.png" alt="money-bag"/>
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
    name: 'Layout',

}
</script>

<style lang="scss" scoped>
.layout{
display: flex;
flex-direction: column;
justify-content: space-between;
min-height: 100vh;

p{
    margin:0;
}

.header{
    background: lightblue;
    height: 4em;
    display: flex;
    align-items: center;

    img{
        margin: 0 0.5rem 0 1rem;
    }
}

.content{
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: flex-start;
}

.footer{
    display: flex;
    background: lightblue;
    height: 5em;
    position: fixed;
    bottom: 0;
    width: 100%;
    justify-content: space-around;
    align-items: center;

    span{
        font-size: 3rem;
        color: lightcoral
    }
}


}

</style>