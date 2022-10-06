<template>
    <div class="card mb-3">
        <div class="card-body d-flex">
            <h4 class="text-success">Agregar Nuevo Familiar</h4>
            <nav style="--bs-breadcrumb-divider: '>';" class="ms-auto" aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#" v-on:click="loadHome" >Home</a></li>
                    <li class="breadcrumb-item"><a href="#" v-on:click="loadListFamily" >Familiares</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Nuevo familiar</li>
                </ol>
            </nav>
        </div>
    </div>
    <div class="card">
        <div class="card-header">
            <button type="button" class="btn btn-success text-white float-end" v-on:click="back()" >Volver a lista</button>
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
                <div class="col-12">
                    <button type="button" class="btn btn-success" v-on:click="newFamily()">Guardar</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name: "NewFamily",
    data() {
        return {
            form: {
                username: "",
                email: "",
                name: "",
                lastName: "",
                phone: "",
                gender: "",
                relationship: "",
            },
        }
    },
    methods: {
        newFamily(){
            axios.post(`http://127.0.0.1:8000/family/`, this.form, { headers: {} })
            .then((result) => {
                alert("Familiar agregado correctamente");
                this.back()
            })
            .catch((error) => {
                console.log(error)
                alert("ERROR: Fallo en el registro.");
            });
        },
        loadListFamily: function () {
            this.$router.push({ name: "listFamily" });
        },
        loadHome: function () {
            this.$router.push({ name: "home" });
        },
        back(){
            this.$router.push({ name: "listFamily" });
        }
    }
}    
</script>