<template>

    <div class="card mb-3">
        <div class="card-body d-flex">
            <h4 class="text-info">Lista de pacientes</h4>
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
            <button class="btn btn-info mb-3 text-white float-end" v-on:click="loadNewPatient" >Nuevo Paciente</button>
        </div>
        <div class="card-body">
            <table class="table table-hover table-bordered">
            <thead class="table-info text-primary">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Usuario</th>
                    <th scope="col">Correo</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Teléfono</th>
                    <th scope="col">Dirección</th>
                    <th scope="col">Fecha de nacimiento</th>
                    <th scope="col">Familiar</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="patient in list" :key="patient.id" v-on:click="loadEditPatient(patient.id)">
                    <td>{{patient.id}}</td>
                    <td>{{patient.username}}</td>
                    <td>{{patient.email}}</td>
                    <td>{{patient.name}} {{patient.lastName}}</td>
                    <td>{{patient.phone}}</td>
                    <td>{{patient.city}} {{patient.direction}}</td>
                    <td>{{patient.dateOfBirth}}</td>
                    <td>{{patient.family.relationship }} {{patient.family.name}}</td>
                </tr>
            </tbody>
    </table>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "ListPatient",
        data(){
            return {
                list: null
            }
        },
        components:{},
        methods: {
            loadEditPatient(id){
                this.$router.push(`/patient/edit/${id}`)
            },
            loadNewPatient(){
                this.$router.push({ name: "newPatient" })
            },
            loadHome: function () {
                this.$router.push({ name: "home" });
            },
        },
        mounted: function(){
            axios.get("http://127.0.0.1:8000/patient/", {headers: {}})
            .then((result) => {
                this.list = result.data
                console.log(result)
            })
            .catch(() => {
                this.$emit('logOut');
            });
        }
    }
</script>