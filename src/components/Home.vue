<template>

    <div class="row">
        <div class="col-lg-12">
            <div class="card card text-center">
                <img class="card-img-top" src="@/assets/editMedical.jpg" alt="Card image cap">
                <div class="card-body">
                    <h1 class="card-title">Bienvenido <span class="text-info text-capitalize">{{username}}</span></h1>
                    <p class="card-text fs-4 fst-italic">¡Hospitalización en Casa! tú mejor aliado</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "Home",
    data: function () {
        return {
            username: localStorage.getItem("username") || "none"
        }
    }
}
</script>
