<template>
  <div>
    <h2>Lista de Usuarios</h2>

    <form @submit.prevent="crearUsuario">
      <input v-model="nuevo.nombre" placeholder="Nombre" required />
      <input v-model="nuevo.correo" placeholder="Correo" required />
      <input v-model="nuevo.telefono" placeholder="Teléfono" required />
      <button type="submit">Agregar Usuario</button>
    </form>

    <ul>
      <li v-for="u in usuarios" :key="u.id">
        {{ u.nombre }} - {{ u.correo }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      usuarios: [],
      nuevo: {
        nombre: '',
        correo: '',
        telefono: ''
      }
    };
  },
  methods: {
    async cargarUsuarios() {
      const res = await fetch('http://localhost:3000/usuarios');
      this.usuarios = await res.json();
    },
    async crearUsuario() {
      await fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.nuevo)
      });
      this.nuevo = { nombre: '', correo: '', telefono: '' };
      this.cargarUsuarios();
    }
  },
  mounted() {
    this.cargarUsuarios();
  }
};
</script>
