<template>
    <div class="card mb-3">
        <div class="card-body d-flex">
            <h4 class="text-warning">Actualizar información medico</h4>
            <nav style="--bs-breadcrumb-divider: '>';" class="ms-auto" aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#" v-on:click="loadHome" >Home</a></li>
                    <li class="breadcrumb-item"><a href="#" v-on:click="loadListMedical" >Medicos</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Editar medico</li>
                </ol>
            </nav>
        </div>
    </div>
    <div class="card">
        <div class="card-header">
            <button type="button" class="btn btn-primary float-end" v-on:click="back()" >Volver a lista</button>
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
                    <label for="specialty" class="form-label">Especialidad</label>
                    <input type="text" class="form-control" id="specialty" v-model="form.specialty">
                </div>
                <div class="col-md-4">
                    <label for="registration" class="form-label">Registro</label>
                    <input type="text" class="form-control" id="registration" v-model="form.registration">
                </div>
                <div class="col-md-3">
                    <label for="password" class="form-label">Contraseña</label>
                    <input type="password" class="form-control" id="password" v-model="form.password">
                </div>
                <div class="col-12" >
                    <button type="button" class="btn btn-warning m-1" v-on:click="editMedical()">Editar</button>
                    <button type="button" class="btn btn-danger m-1 float-end" v-on:click="deleteMedical()" >Eliminar</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name: "EditMedical",
    data() {
        return {
            form: {
                id: "",
                username: "",
                email: "",
                name: "",
                lastName: "",
                phone: "",
                gender: "",
                specialty: "",
                registration: "",
                password: "",
            }
        }
    },
    methods: {
        editMedical(){
            axios.put(`http://127.0.0.1:8000/medical/${this.form.id}/`, this.form, { headers: {} })
            .then((result) => {
                alert("Información actualizada correctamente");
                this.back()
            })
            .catch((error) => {
                console.log(error)
                alert("ERROR: Fallo al actualizar.");
            });
            
        },
        loadListMedical: function () {
            this.$router.push({ name: "listMedical" });
        },
        loadHome: function () {
            this.$router.push({ name: "home" });
        },
        deleteMedical(){
            axios.delete(`http://127.0.0.1:8000/medical/${this.form.id}/`, { headers: {} })
            .then((result) => {
                alert("Medico eliminado correctamente");
                this.back()
            })
            .catch((error) => {
                console.log(error)
                alert("ERROR: Fallo al eliminar.");
            });
        },
        back(){
            this.$router.push({ name: "listMedical" });
        }
    },
    mounted: function () {
        this.form.id = this.$route.params.id
        axios.get(`http://127.0.0.1:8000/medical/${this.form.id}/`, { headers: {} })
            .then((result) => {
                this.form.username = result.data.username
                this.form.email = result.data.email
                this.form.name = result.data.name
                this.form.lastName = result.data.lastName
                this.form.phone = result.data.phone
                this.form.gender = result.data.gender
                this.form.specialty = result.data.specialty
                this.form.registration = result.data.registration
            })
    }
}    
</script>
