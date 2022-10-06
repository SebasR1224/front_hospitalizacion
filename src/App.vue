<template>
  <div id="app" class="app">
    <div id="wrapper">
      <div v-if="is_auth" class="d-flex justify-content-center">
        <aside id="sidebar-wrapper">
          <div class="sidebar-brand">
            <h4>Hospital</h4>
          </div>
          <ul class="sidebar-nav">
            <li class="">
              <a href="#" v-on:click="loadHome"><i class="fa">
                  <fa icon="home" />
                </i>Home</a>
            </li>
            <li>
              <a href="#" v-on:click="loadListMedical"><i class="fa"><fa icon="user-doctor" /></i>Medicos</a> 
            </li>
            <li>
              <a href="#" v-on:click="loadListPatient"><i class="fa"><fa icon="person" /></i>Pacientes</a> 
            </li>
            <li>
              <a href="#" v-on:click="loadListFamily"><i class="fa"><fa icon="people-roof" /></i>Familiares</a> 
            </li>
            <li>
              <a href="#" v-on:click="loadListVital"><i class="fa"><fa icon="heart" /></i>Signos Vitales</a> 
            </li>
          </ul>
        </aside>
        <div id="navbar-wrapper">
          <nav class="navbar  navbar-inverse navbar-expand-lg navbar-light" style="background-color: #ffff;">
            <div class="container-fluid">
              <div class="navbar-header">
                <a href="#" class="navbar-brand" id="sidebar-toggle"><i class="fa ">
                    <!-- <fa icon="bars" /> -->
                  </i></a>
              </div>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                  <li class="nav-item" v-if="!is_auth">
                    <a class="nav-link active" v-on:click="loadLogin" aria-current="page" href="#">Iniciar sesión</a>
                  </li>
                  <li class="nav-item" v-if="is_auth">
                    <a class="nav-link" href="#" v-on:click="loadProfile">Perfil</a>
                  </li>
                  <li class="nav-item" v-if="is_auth">
                    <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#exampleModal">Cerrar sesión</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
      <section id="content-wrapper">
        <div class="row">
          <div class="col-lg-12 mt-5 mb-5">
            <router-view v-on:completedLogin="completedLogin" v-on:logOut="logOut"></router-view>
          </div>
        </div>
      </section>
    </div>
  </div>
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Cerrar Sesión</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            ¿Desea cerrar la sesión?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
          <button type="button" class="btn btn-primary" v-on:click="logOut" >Aceptar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
window.$ = window.jQuery = require('jquery')

export default {
  name: 'App',
  data: function () {
    return {
      is_auth: false
    }
  },
  components: {
  },
  methods: {
    verifyAuth: function () {
      this.is_auth = localStorage.getItem("isAuth") || false;

      if (this.is_auth == false)
        this.$router.push({ name: "login" });
      else
        this.$router.push({ name: "home" });
    },
    loadLogin: function () {
      this.$router.push({ name: "login" })
    },
    completedLogin: function (data) {
      localStorage.setItem("isAuth", true);
      localStorage.setItem("username", data.username);
      localStorage.setItem("token_access", data.token_access);
      localStorage.setItem("token_refresh", data.token_refresh);
      this.verifyAuth();
    },
    loadHome: function () {
      this.$router.push({ name: "home" });
    },
    loadProfile: function () {
      this.$router.push({ name: "profile" });
    },
    loadListMedical: function () {
      this.$router.push({ name: "listMedical" });
    },
    loadListPatient: function () {
      this.$router.push({ name: "listPatient" });
    },
    loadListFamily: function () {
      this.$router.push({ name: "listFamily" });
    },
    loadListVital: function () {
      this.$router.push({ name: "listVital" });
    },
    logOut: function () {
      $('#exampleModal').modal('hide')
      localStorage.clear();
      this.verifyAuth();
    },
  },
  created: function () {
    this.verifyAuth()
  },
  mounted() {
    if(this.is_auth){
      const $button = document.getElementById('sidebar-toggle');
      const $wrapper = document.getElementById('wrapper');
      $button.addEventListener('click', (e) => {
        e.preventDefault();
        $wrapper.classList.toggle('toggled');
      });

    }
  }
}
</script>

<style scoped>
body {
  padding-bottom: 30px;
  position: relative;
  min-height: 100%;
}

a {
  transition: background 0.2s, color 0.2s;
}

a:hover,
a:focus {
  text-decoration: none;
}

#wrapper {
  padding-left: 0;
  transition: all 0.5s ease;
  position: relative;
}

#sidebar-wrapper {
  z-index: 1000;
  position: fixed;
  left: 250px;
  width: 0;
  height: 100%;
  margin-left: -250px;
  overflow-y: auto;
  overflow-x: hidden;
  background: #ffff;
  transition: all 0.5s ease;
}

#wrapper.toggled #sidebar-wrapper {
  width: 250px;
}

.sidebar-brand {
  position: absolute;
  top: 0;
  width: 250px;
  text-align: center;
  padding: 20px 0;
}

.sidebar-brand h4 {
  margin: 0;
  font-weight: 600;
  font-size: 24px;
  color: #0d6efd;
}

.sidebar-nav {
  position: absolute;
  top: 75px;
  width: 250px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.sidebar-nav>li {
  text-indent: 10px;
  line-height: 42px;
}

.sidebar-nav>li a {
  display: block;
  text-decoration: none;
  color: #757575;
  font-weight: 600;
  font-size: 18px;
}

.sidebar-nav>li>a:hover,
.sidebar-nav>li.active>a  {
  text-decoration: none;
  color: #fff;
  background: #0d6efd;
}

.sidebar-nav>li>a i.fa {
  font-size: 24px;
  width: 60px;
  color: #0d6efd;
}

#navbar-wrapper {
  width: 100%;
  position: absolute;
  z-index: 2;
}

#wrapper.toggled #navbar-wrapper {
  position: absolute;
  margin-right: -250px;
}

#navbar-wrapper .navbar {
  border-width: 0 0 0 0;
  background-color: #eee;
  font-size: 20px;
  margin-bottom: 0;
  border-radius: 0;
}

#navbar-wrapper .navbar a {
  color: #757575;
}

#navbar-wrapper .navbar a:hover {
  color: #0d6efd;
}

#content-wrapper {
  width: 100%;
  position: absolute;
  padding: 15px;
  top: 100px;
}

#wrapper.toggled #content-wrapper {
  position: absolute;
  margin-right: -250px;
}

@media (min-width: 992px) {
  #wrapper {
    padding-left: 250px;
  }

  #wrapper.toggled {
    padding-left: 60px;
  }

  #sidebar-wrapper {
    width: 250px;
  }

  #wrapper.toggled #sidebar-wrapper {
    width: 60px;
  }

  #wrapper.toggled #navbar-wrapper {
    position: absolute;
    margin-right: -190px;
  }

  #wrapper.toggled #content-wrapper {
    position: absolute;
    margin-right: -190px;
  }

  #navbar-wrapper {
    position: relative;
  }

  #wrapper.toggled {
    padding-left: 60px;
  }

  #content-wrapper {
    position: relative;
    top: 0;
  }

  #wrapper.toggled #navbar-wrapper,
  #wrapper.toggled #content-wrapper {
    position: relative;
    margin-right: 60px;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  #wrapper {
    padding-left: 60px;
  }

  #sidebar-wrapper {
    width: 60px;
  }

  #wrapper.toggled #navbar-wrapper {
    position: absolute;
    margin-right: -250px;
  }

  #wrapper.toggled #content-wrapper {
    position: absolute;
    margin-right: -250px;
  }

  #navbar-wrapper {
    position: relative;
  }

  #wrapper.toggled {
    padding-left: 250px;
  }

  #content-wrapper {
    position: relative;
    top: 0;
  }

  #wrapper.toggled #navbar-wrapper,
  #wrapper.toggled #content-wrapper {
    position: relative;
    margin-right: 250px;
  }
}

@media (max-width: 767px) {
  #wrapper {
    padding-left: 0;
  }

  #sidebar-wrapper {
    width: 0;
  }

  #wrapper.toggled #sidebar-wrapper {
    width: 250px;
  }

  #wrapper.toggled #navbar-wrapper {
    position: absolute;
    margin-right: -250px;
  }

  #wrapper.toggled #content-wrapper {
    position: absolute;
    margin-right: -250px;
  }

  #navbar-wrapper {
    position: relative;
  }

  #wrapper.toggled {
    padding-left: 250px;
  }

  #content-wrapper {
    position: relative;
    top: 0;
  }

  #wrapper.toggled #navbar-wrapper,
  #wrapper.toggled #content-wrapper {
    position: relative;
    margin-right: 250px;
  }
}

.fa {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>


