<template>
    <div class="card mb-3">
        <div class="card-body d-flex">
            <h4 class="text-primary">Lista de Signos Vitales</h4>

            <nav style="--bs-breadcrumb-divider: '>';" class="ms-auto" aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#" v-on:click="loadHome">Home</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Lista de Signos Vitales</li>
                </ol>
            </nav>
        </div>
    </div>
    <div class="card">
        <div class="card-header">
            <button class="btn btn-primary float-end" v-on:click="loadNewVital">Nuevo Signo vital</button>
        </div>
        <div class="card-body">
            <table class="table table-hover table-bordered">
                <thead class="table-primary text-primary">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Signo vital</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="vital in list" :key="vital.id" v-on:click="loadEditVital(vital.id)">
                        <td>{{vital.id}}</td>
                        <td>{{vital.name}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: "ListVital",
    data() {
        return {
            list: null
        }
    },
    components: {},
    methods: {
        loadEditVital(id) {
            this.$router.push(`/vital/edit/${id}`)
        },
        loadNewVital() {
            this.$router.push({ name: "newVital" })
        },
        loadHome: function () {
            this.$router.push({ name: "home" });
        },
    },
    mounted: function () {
        axios.get("http://127.0.0.1:8000/vital/", { headers: {} })
            .then((result) => {
                this.list = result.data
            })
            .catch(() => {
                this.$emit('logOut');
            });
    }
}
</script>