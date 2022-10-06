<template>
    <div class="card mb-3">
        <div class="card-body d-flex">
            <h4 class="text-primary">Lista de medicos</h4>

            <nav style="--bs-breadcrumb-divider: '>';" class="ms-auto" aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#" v-on:click="loadHome">Home</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Lista de medicos</li>
                </ol>
            </nav>
        </div>
    </div>
    <div class="card">
        <div class="card-header">
            <button class="btn btn-primary float-end" v-on:click="loadNewMedical">Nuevo Medico</button>
        </div>
        <div class="card-body">
            <table class="table table-hover table-bordered">
                <thead class="table-primary text-primary">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Usuario</th>
                        <th scope="col">Correo</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Teléfono</th>
                        <th scope="col">Especialidad</th>
                        <th scope="col">Registro</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="medico in list" :key="medico.id" v-on:click="loadEditMedical(medico.id)">
                        <td>{{medico.id}}</td>
                        <td>{{medico.username}}</td>
                        <td>{{medico.email}}</td>
                        <td>{{medico.name}} {{medico.lastName}}</td>
                        <td>{{medico.phone}}</td>
                        <td>{{medico.specialty}}</td>
                        <td>{{medico.registration}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: "ListMedical",
    data() {
        return {
            list: null
        }
    },
    components: {},
    methods: {
        loadEditMedical(id) {
            this.$router.push(`/medical/edit/${id}`)
        },
        loadNewMedical() {
            this.$router.push({ name: "newMedical" })
        },
        loadHome: function () {
            this.$router.push({ name: "home" });
        },
    },
    mounted: function () {
        axios.get("http://127.0.0.1:8000/medical/", { headers: {} })
            .then((result) => {
                this.list = result.data
            })
            .catch(() => {
                this.$emit('logOut');
            });
    }
}
</script>