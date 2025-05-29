<template>
  <div>
    <Usuarios />
    <hr />
    <Vehiculos />
  </div>
</template>

<script>
import Usuarios from './components/Usuarios.vue'
import Vehiculos from './components/Vehiculos.vue'

export default {
  components: {
    Usuarios,
    Vehiculos
  }
}
</script>
