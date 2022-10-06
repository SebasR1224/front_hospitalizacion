<template >
    <div v-if="role === 'Paciente'">
        <div class="card mb-4 mb-lg-0">
            <div class="card-header text-primary">
                Detalles del perfil
            </div>
            <div class="card-body" >
                <div class="row">
                    <div class="col-sm-3">
                        <p class="mb-0">Dirección</p>
                    </div>
                    <div class="col-sm-9">
                        <p class="text-muted mb-0">{{user_direction}}</p>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-sm-3">
                        <p class="mb-0">Ciudad</p>
                    </div>
                    <div class="col-sm-9">
                        <p class="text-muted mb-0">{{user_city}}</p>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-sm-3">
                        <p class="mb-0">Fecha de Nacimiento</p>
                    </div>
                    <div class="col-sm-9">
                        <p class="text-muted mb-0">{{user_dateOfBirth}}</p>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-sm-3">
                        <p class="mb-0">Latitud</p>
                    </div>
                    <div class="col-sm-9">
                        <p class="text-muted mb-0">{{user_latitude}}</p>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-sm-3">
                        <p class="mb-0">Longitud</p>
                    </div>
                    <div class="col-sm-9">
                        <p class="text-muted mb-0">{{user_length}}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="card mt-4 mb-lg-0">
            <div class="card-header text-primary">
                Familiar
            </div>
            <div class="card-body" >
                <div class="row">
                    <div class="col-sm-3">
                        <p class="mb-0">Nombre del familiar</p>
                    </div>
                    <div class="col-sm-9">
                        <p class="text-muted mb-0">{{family_fullName}}</p>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-sm-3">
                        <p class="mb-0">Correo</p>
                    </div>
                    <div class="col-sm-9">
                        <p class="text-muted mb-0">{{family_email}}</p>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-sm-3">
                        <p class="mb-0">Teléfono</p>
                    </div>
                    <div class="col-sm-9">
                        <p class="text-muted mb-0">{{family_phone}}</p>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-sm-3">
                        <p class="mb-0">Parentesco</p>
                    </div>
                    <div class="col-sm-9">
                        <p class="text-muted mb-0">{{family_relationship}}</p>
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
        data: function(){
            return {
                user_direction : "",
                user_city : "",
                user_dateOfBirth: "",
                user_latitude :"",
                user_length :"",

                family_fullName: "",
                family_email: "",
                family_phone: "",
                family_relationship: "",

                
            }
        },
        methods: {
            getData: function(){
                if (localStorage.getItem("token_access") === null || localStorage.getItem("token_refresh") === null) {
                    this.$emit('logOut');
                    return;
                } 
                if(this.role === "Paciente"){
                    let token = localStorage.getItem("token_access");
                    let userId = jwt_decode(token).user_id.toString();
                    axios.get(`http://127.0.0.1:8000/patient/${userId}/`, {headers: {}})
                    .then((result) => {
                        this.user_direction = result.data.direction
                        this.user_city = result.data.city
                        this.user_dateOfBirth = result.data.dateOfBirth
                        this.user_length = result.data.length
    
                        this.family_fullName = result.data.family.name +" "+ result.data.family.lastName
                        this.family_email = result.data.family.email
                        this.family_phone = result.data.family.phone
                        this.family_relationship = result.data.family.relationship                        
                    })
                    .catch(() => {
                        this.$emit('logOut');
                    });
                }
            }
        },
        created: async function(){
            this.getData();
        },
    }
</script>
