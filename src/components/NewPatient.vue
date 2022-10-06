<template>
    <div class="card mb-3">
        <div class="card-body d-flex">
            <h4 class="text-info">Agregar Nuevo Paciente</h4>
            <nav style="--bs-breadcrumb-divider: '>';" class="ms-auto" aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#" v-on:click="loadHome" >Home</a></li>
                    <li class="breadcrumb-item"><a href="#" v-on:click="loadListPatient" >Pacientes</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Nuevo paciente</li>
                </ol>
            </nav>
        </div>
    </div>
    <div class="card">
        <div class="card-header">
            <button type="button" class="btn btn-info text-white float-end" v-on:click="back()" >Volver a lista</button>
        </div>
        <div class="card-body">
            <form class="row g-3">
                <div class="col-md-6">
                    <label for="username" class="form-label">Usuario</label>
                    <input type="text" class="form-control" id="username" v-model="form.username">
                </div>
                <div class="col-md-6">
                    <label for="email" class="form-label">Correo</label>
                    <input type="email" class="form-control" id="email" v-model="form.email">
                </div>
                <div class="col-md-4">
                    <label for="name" class="form-label">Nombre</label>
                    <input type="text" class="form-control" id="name" v-model="form.name">
                </div>
                <div class="col-md-4">
                    <label for="lastName" class="form-label">Apellido</label>
                    <input type="text" class="form-control" id="lastName" v-model="form.lastName">
                </div>
                <div class="col-md-4">
                    <label for="phone" class="form-label">Teléfono</label>
                    <input type="tel" class="form-control" id="phone" v-model="form.phone">
                </div>
                <div class="col-md-4">
                    <label for="gender" class="form-label">Genero</label>
                    <select id="gender" class="form-select" v-model="form.gender">
                        <option selected>Seleccione...</option>
                        <option value="F">Femenino</option>
                        <option value="M">Masculino</option>
                    </select>
                </div>
                <div class="col-md-4">
                    <label for="direction" class="form-label">Dirección</label>
                    <input type="text" class="form-control" id="direction" v-model="form.direction">
                </div>
                <div class="col-md-4">
                    <label for="city" class="form-label">Ciudad</label>
                    <input type="text" class="form-control" id="city" v-model="form.city">
                </div>
                <div class="col-md-3">
                    <label for="dateOfBirth" class="form-label">Fecha de nacimiento</label>
                    <input type="date" class="form-control" id="dateOfBirth" v-model="form.dateOfBirth">
                </div>
                <div class="col-md-1">
                    <label for="latitude" class="form-label">Latitud</label>
                    <input type="text" class="form-control" id="latitude" v-model="form.latitude">
                </div>
                <div class="col-md-1">
                    <label for="length" class="form-label">Longitud</label>
                    <input type="text" class="form-control" id="length" v-model="form.length">
                </div>
                <div class="col-md-2">
                    <label for="family_id" class="form-label">Familiar</label>
                    <select id="family_id" class="form-select" v-model="form.family_id">
                        <option selected>Seleccione...</option>
                        <option v-for="family in listFamily" :value="family.id" v-bind:selected="family.id == form.family_id" >{{family.name}}</option>
                    </select>
                </div>
                <div class="col-md-2">
                    <label for="medical_id" class="form-label">Asignar medico</label>
                    <select id="medical_id" class="form-select" v-model="form.medical_id">
                        <option selected>Seleccione...</option>
                        <option v-for="medical in listMedical" :value="medical.id" v-bind:selected="medical.id == form.medical_id" >{{medical.name}}</option>
                    </select>
                </div>
                <div class="col-md-3">
                    <label for="password" class="form-label">Contraseña</label>
                    <input type="password" class="form-control" id="password" v-model="form.password">
                </div>
                <div class="col-12">
                    <button type="button" class="btn btn-success" v-on:click="newPatient()">Guardar</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name: "NewPatient",
    data() {
        return {
            form: {
                username: "",
                email: "",
                name: "",
                lastName: "",
                phone: "",
                gender: "",
                direction: "",
                city: "",
                dateOfBirth: "",
                latitude: "",
                length: "",
                family_id: "", 
                medical_id: "", 
                password: ""
            },
            listFamily: null,
            listMedical: null
        }
    },
    methods: {
        newPatient(){
            axios.post(`http://127.0.0.1:8000/patient/`, this.form, { headers: {} })
            .then((result) => {
                alert("Paciente agregado correctamente");
                this.back()
            })
            .catch((error) => {
                console.log(error)
                alert("ERROR: Fallo en el registro.");
            });
        },
        back(){
            this.$router.push({ name: "listPatient" });
        },
        loadListPatient: function () {
            this.$router.push({ name: "listPatient" });
        },
        loadHome: function () {
            this.$router.push({ name: "home" });
        }
    },
    mounted: function () {
        axios.get(`http://127.0.0.1:8000/family/`, { headers: {} })
        .then((result) => {
            this.listFamily = result.data
        })    

        axios.get(`http://127.0.0.1:8000/medical/`, { headers: {} })
        .then((result) => {
            this.listMedical = result.data
        })  
    }
}    
</script>