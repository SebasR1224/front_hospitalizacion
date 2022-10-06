<template >
    <div v-if="role === 'Paciente'">
        <div class="card">
            <div class="card-header text-primary">
                Medico Asignado
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-sm-4">
                        <p class="mb-0">Nombre</p>
                    </div>
                    <div class="col-sm-8">
                        <p class="text-muted mb-0">{{medical_fullName}}</p>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-sm-4">
                        <p class="mb-0">Correo</p>
                    </div>
                    <div class="col-sm-8">
                        <p class="text-muted mb-0">{{medical_email}}</p>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-sm-4">
                        <p class="mb-0">Teléfono</p>
                    </div>
                    <div class="col-sm-8">
                        <p class="text-muted mb-0">{{medical_phone}}</p>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-sm-4">
                        <p class="mb-0">Especialidad</p>
                    </div>
                    <div class="col-sm-8">
                        <p class="text-muted mb-0">{{medical_specialty}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import jwt_decode from "jwt-decode";
import axios from 'axios';
export default {
    props: ['role'],
    data: function () {
        return {
            medical_fullName: "",
            medical_email: "",
            medical_phone: "",
            medical_specialty: "",
        }
    },
    methods: {
        getData: function () {
            if (localStorage.getItem("token_access") === null || localStorage.getItem("token_refresh") === null) {
                this.$emit('logOut');
                return;
            }
            if(this.role === "Paciente"){
                let token = localStorage.getItem("token_access");
                let userId = jwt_decode(token).user_id.toString();
                axios.get(`http://127.0.0.1:8000/patient/${userId}/`, { headers: {} })
                .then((result) => {
                    this.medical_fullName = result.data.medical.name +" "+ result.data.medical.lastName,
                    this.medical_email = result.data.medical.email 
                    this.medical_phone = result.data.medical.phone 
                    this.medical_specialty = result.data.medical.specialty
                })
                .catch(() => {
                    this.$emit('logOut');
                });
            }
        }
    },
    created: async function () {
        this.getData();
    },
}
</script>

