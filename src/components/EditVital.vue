<template>
    <div class="card mb-3">
        <div class="card-body d-flex">
            <h4 class="text-warning">Actualizar información signo vital</h4>
            <nav style="--bs-breadcrumb-divider: '>';" class="ms-auto" aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#" v-on:click="loadHome" >Home</a></li>
                    <li class="breadcrumb-item"><a href="#" v-on:click="loadListVital" >Signos Vitales</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Editar signo vital</li>
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
                    <label for="name" class="form-label">Nombre Signo vital</label>
                    <input type="text" class="form-control" id="name" v-model="form.name">
                </div>
                <div class="col-12" >
                    <button type="button" class="btn btn-warning m-1" v-on:click="editVital()">Editar</button>
                    <button type="button" class="btn btn-danger m-1 float-end" v-on:click="deleteVital()" >Eliminar</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name: "EditVital",
    data() {
        return {
            form: {
                id: "",
                name: "",
            }
        }
    },
    methods: {
        editVital(){
            axios.put(`http://127.0.0.1:8000/vital/${this.form.id}/`, this.form, { headers: {} })
            .then((result) => {
                alert("Información actualizada correctamente");
                this.back()
            })
            .catch((error) => {
                console.log(error)
                alert("ERROR: Fallo al actualizar.");
            });
            
        },
        loadListVital: function () {
            this.$router.push({ name: "listVital" });
        },
        loadHome: function () {
            this.$router.push({ name: "home" });
        },
        deleteVital(){
            axios.delete(`http://127.0.0.1:8000/vital/${this.form.id}/`, { headers: {} })
            .then((result) => {
                alert("Signo vital eliminado correctamente");
                this.back()
            })
            .catch((error) => {
                console.log(error)
                alert("ERROR: Fallo al eliminar.");
            });
        },
        back(){
            this.$router.push({ name: "listVital" });
        }
    },
    mounted: function () {
        this.form.id = this.$route.params.id
        axios.get(`http://127.0.0.1:8000/vital/${this.form.id}/`, { headers: {} })
            .then((result) => {
                this.form.name = result.data.name
            })
    }
}    
</script>
