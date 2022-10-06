el archivo src/components/Account.vue, y se debe utilizar el siguiente código:

<template>
	<div class="card mb-3">
        <div class="card-body d-flex">
            <h4 class="text-info">Mi perfil</h4>
            <nav style="--bs-breadcrumb-divider: '>';" class="ms-auto" aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#" v-on:click="loadHome" >Home</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Mi perfil</li>
                </ol>
            </nav>
        </div>
    </div>
	<div v-if="loaded">
		<section>
			<div class="container py-5">
				<div class="row">
					<div class="col-lg-4">
						<div class="card mb-4">
							<div class="card-body text-center">
								<img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
									alt="avatar" class="rounded-circle img-fluid" style="width: 150px;">
								<h5 class="my-3 text-capitalize">{{username}}</h5>
								<p class="text-muted mb-1">{{role}}</p>
								<div class="d-flex justify-content-center mb-2">
									<button type="button" class="btn btn-primary">Follow</button>
									<button type="button" class="btn btn-outline-primary ms-1">Message</button>
								</div>
							</div>
						</div>
						<MedicalPatientInfo :role="role" />
					</div>
					<div class="col-lg-8">
						<div class="card mb-4">
							<div class="card-body">
								<div class="row">
									<div class="col-sm-3">
										<p class="mb-0 ">Nombre Completo</p>
									</div>
									<div class="col-sm-9">
										<p class="text-muted mb-0 text-capitalize ">{{fullName}}</p>
									</div>
								</div>
								<hr>
								<div class="row">
									<div class="col-sm-3">
										<p class="mb-0">Correo</p>
									</div>
									<div class="col-sm-9">
										<p class="text-muted mb-0">{{email}}</p>
									</div>
								</div>
								<hr>
								<div class="row">
									<div class="col-sm-3">
										<p class="mb-0">Teléfono</p>
									</div>
									<div class="col-sm-9">
										<p class="text-muted mb-0">{{phone}}</p>
									</div>
								</div>
								<hr>
								<div class="row">
									<div class="col-sm-3">
										<p class="mb-0">Genero</p>
									</div>
									<div class="col-sm-9">
										<p class="text-muted mb-0">{{gender}}</p>
									</div>
								</div>
							</div>
						</div>
						<MedicalInfo :role="role" />
						<FamilyInfo :role="role" />
						<PatientInfo :role="role" />
					</div>

				</div>
			</div>
		</section>
	</div>
</template>

<script>
import jwt_decode from "jwt-decode";
import axios from 'axios';

import MedicalInfo from "@/components/medicalInfo.vue";
import FamilyInfo from "@/components/familyInfo.vue";
import PatientInfo from "@/components/patientInfo.vue";
import MedicalPatientInfo from "@/components/medicalPatientInfo.vue";


export default {
	name: "Profile",
	data: function () {
		return {
			loaded: false,
			username: "",
			fullName: "",
			email: "",
			phone: "",
			gener: "",
			role: "",
		}
	},
	components: {
		MedicalInfo,
		FamilyInfo,
		PatientInfo,
		MedicalPatientInfo,
	},
	methods: {
		getData: async function () {
			if (localStorage.getItem("token_access") === null || localStorage.getItem("token_refresh") === null) {
				this.$emit('logOut');
				return;
			}
			await this.verifyToken();

			let token = localStorage.getItem("token_access");
			let userId = jwt_decode(token).user_id.toString();
			axios.get(`http://127.0.0.1:8000/user/profile/${userId}/`, { headers: { 'Authorization': `Bearer ${token}` } })
				.then((result) => {
					this.loaded = true;
					this.username = result.data.username;
					this.fullName = result.data.name + " " + result.data.lastName;
					this.email = result.data.email;
					this.phone = result.data.phone;
					this.gender = result.data.gender;
					this.role = result.data.role;
				})
				.catch(() => {
					this.$emit('logOut');
				});
		},
		verifyToken: function () {
			return axios.post("http://127.0.0.1:8000/refresh/", { refresh: localStorage.getItem("token_refresh") }, { headers: {} })
				.then((result) => {
					localStorage.setItem("token_access", result.data.access);
				})
				.catch(() => {
					this.$emit('logOut');
				});
		},
		loadHome: function () {
			this.$router.push({ name: "home" });
		},
	},
	created: async function () {
		this.getData();
	},
}
</script>