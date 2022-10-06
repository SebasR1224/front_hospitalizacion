<template>
    <div class="card mb-3">
        <div class="card-body d-flex">
            <h4 class="text-warning">Actualizar información familiar</h4>
            <nav style="--bs-breadcrumb-divider: '>';" class="ms-auto" aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#" v-on:click="loadHome" >Home</a></li>
                    <li class="breadcrumb-item"><a href="#" v-on:click="loadListFamily" >Familiares</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Editar familiar</li>
                </ol>
            </nav>
        </div>
    </div>
    <div class="card">
        <div class="card-header">
            <button type="button" class="btn btn-success float-end" v-on:click="back()" >Volver a lista</button>
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
                    <label for="relationship" class="form-label">Parentesco</label>
                    <input type="text" class="form-control" id="relationship" v-model="form.relationship">
                </div>
                <div class="col-md-4">
                    <label for="password" class="form-label">Contraseña</label>
                    <input type="password" class="form-control" id="password" v-model="form.password">
                </div>
                <div class="col-12" >
                    <button type="button" class="btn btn-warning m-1" v-on:click="editFamily()">Editar</button>
                    <button type="button" class="btn btn-danger m-1 float-end" v-on:click="deleteFamily()" >Eliminar</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name: "EditFamily",
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
                relationship: "",
                password: ""
            }
        }
    },
    methods: {
        editFamily(){
            axios.put(`http://127.0.0.1:8000/family/${this.form.id}/`, this.form, { headers: {} })
            .then((result) => {
                alert("Información actualizada correctamente");
                this.back()
            })
            .catch((error) => {
                console.log(error)
                alert("ERROR: Fallo al actualizar.");
            });
            
        },
        loadListFamily: function () {
            this.$router.push({ name: "listFamily" });
        },
        loadHome: function () {
            this.$router.push({ name: "home" });
        },
        deleteFamily(){
            axios.delete(`http://127.0.0.1:8000/family/${this.form.id}/`, { headers: {} })
            .then((result) => {
                alert("Familiar eliminado correctamente");
                this.back()
            })
            .catch((error) => {
                console.log(error)
                alert("ERROR: Fallo al eliminar.");
            });
        },
        back(){
            this.$router.push({ name: "listFamily" });
        }
    },
    mounted: function () {
        this.form.id = this.$route.params.id
        axios.get(`http://127.0.0.1:8000/family/${this.form.id}/`, { headers: {} })
        .then((result) => {
            this.form.username = result.data.username
            this.form.email = result.data.email
            this.form.name = result.data.name
            this.form.lastName = result.data.lastName
            this.form.phone = result.data.phone
            this.form.gender = result.data.gender
            this.form.relationship = result.data.relationship
        })
    }
}    
</script>
