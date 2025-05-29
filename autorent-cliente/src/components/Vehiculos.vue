<template>
  <div>
    <h2>Lista de Vehículos</h2>

    <form @submit.prevent="crearVehiculo">
      <input v-model="nuevo.marca" placeholder="Marca" required />
      <input v-model="nuevo.modelo" placeholder="Modelo" required />
      <input v-model="nuevo.anio" type="number" placeholder="Año" required />
      <label>
        <input type="checkbox" v-model="nuevo.disponible" /> Disponible
      </label>
      <button type="submit">Agregar Vehículo</button>
    </form>

    <ul>
      <li v-for="v in vehiculos" :key="v.id">
        {{ v.marca }} {{ v.modelo }} ({{ v.anio }}) - {{ v.disponible ? '✅' : '❌' }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      vehiculos: [],
      nuevo: {
        marca: '',
        modelo: '',
        anio: '',
        disponible: true
      }
    };
  },
  methods: {
    async cargarVehiculos() {
      const res = await fetch('http://localhost:3000/vehiculos');
      this.vehiculos = await res.json();
    },
    async crearVehiculo() {
      await fetch('http://localhost:3000/vehiculos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.nuevo)
      });
      this.nuevo = { marca: '', modelo: '', anio: '', disponible: true };
      this.cargarVehiculos();
    }
  },
  mounted() {
    this.cargarVehiculos();
  }
};
</script>
