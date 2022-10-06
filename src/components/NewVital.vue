<template>
    <div class="card mb-3">
        <div class="card-body d-flex">
            <h4 class="text-info">Agregar Nuevo Signo vital</h4>
            <nav style="--bs-breadcrumb-divider: '>';" class="ms-auto" aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#" v-on:click="loadHome" >Home</a></li>
                    <li class="breadcrumb-item"><a href="#" v-on:click="loadListVital" >Signos vitales</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Nuevo signo vital</li>
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
                    <label for="name" class="form-label">Nombre signo vital</label>
                    <input type="text" class="form-control" id="name" v-model="form.name">
                </div>
                <div class="col-12">
                    <button type="button" class="btn btn-success" v-on:click="newVital()">Guardar</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name: "NewVital",
    data() {
        return {
            form: {
                name: "",
            }
        }
    },
    methods: {
        newVital(){
            axios.post(`http://127.0.0.1:8000/vital/`, this.form, { headers: {} })
            .then((result) => {
                alert("Signo vital agregado correctamente");
                this.back()
            })
            .catch((error) => {
                console.log(error)
                alert("ERROR: Fallo en el registro.");
            });
        },
        back(){
            this.$router.push({ name: "listVital" });
        },
        loadListVital: function () {
            this.$router.push({ name: "listVital" });
        },
        loadHome: function () {
            this.$router.push({ name: "home" });
        }
    }
}    
</script>