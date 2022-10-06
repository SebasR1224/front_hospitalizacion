<template>
    <div class="card mb-3">
        <div class="card-body d-flex">
            <h4 class="text-success">Lista de familiares</h4>

            <nav style="--bs-breadcrumb-divider: '>';" class="ms-auto" aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#" v-on:click="loadHome">Home</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Lista de familiares</li>
                </ol>
            </nav>
        </div>
    </div>
    <div class="card">
        <div class="card-header">
            <button class="btn btn-success float-end" v-on:click="loadNewFamily">Nuevo familiar</button>
        </div>
        <div class="card-body">
            <table class="table table-hover table-bordered">
                <thead class="table-success text-success">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Usuario</th>
                        <th scope="col">Correo</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Teléfono</th>
                        <th scope="col">Parentesco</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="family in list" :key="family.id" v-on:click="loadEditFamily(family.id)">
                        <td>{{family.id}}</td>
                        <td>{{family.username}}</td>
                        <td>{{family.email}}</td>
                        <td>{{family.name}} {{family.lastName}}</td>
                        <td>{{family.phone}}</td>
                        <td>{{family.relationship}}</td>
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
        loadEditFamily(id) {
            this.$router.push(`/family/edit/${id}`)
        },
        loadNewFamily() {
            this.$router.push({ name: "newFamily" })
        },
        loadHome: function () {
            this.$router.push({ name: "home" });
        },
    },
    mounted: function () {
        axios.get("http://127.0.0.1:8000/family/", { headers: {} })
        .then((result) => {
            this.list = result.data
        })
        .catch(() => {
            this.$emit('logOut');
        });
    }
}
</script>