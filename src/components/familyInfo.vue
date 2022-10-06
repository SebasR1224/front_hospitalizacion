<template >
    <div v-if="role === 'Familiar'">
        <div class="card mb-4 mb-lg-0">
            <div class="card-header">
                Detalles del perfil
            </div>
            <div class="card-body" >
                <div class="row">
                    <div class="col-sm-3">
                        <p class="mb-0">Parentesco</p>
                    </div>
                    <div class="col-sm-9">
                        <p class="text-muted mb-0">{{relationship}}</p>
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
                relationship: "",
            }
        },
        methods: {
            getData: function(){
                if (localStorage.getItem("token_access") === null || localStorage.getItem("token_refresh") === null) {
                    this.$emit('logOut');
                    return;
                }
                if(this.role === "Familiar") {
                    let token = localStorage.getItem("token_access");
                    let userId = jwt_decode(token).user_id.toString();
                    axios.get(`http://127.0.0.1:8000/family/${userId}/`, {headers: {}})
                    .then((result) => {
                        this.relationship = result.data.relationship;
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
