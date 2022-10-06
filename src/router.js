import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

import Login from './components/Login.vue'
import Home from './components/Home.vue'
import Profile from './components/Profile.vue'

import ListMedical from './components/ListMedical.vue'
import EditMedical from './components/EditMedical.vue'
import NewMedical from './components/NewMedical.vue'

import ListPatient from './components/ListPatient.vue'
import EditPatient from './components/EditPatient.vue'
import NewPatient from './components/NewPatient.vue'

import ListFamily from './components/ListFamily.vue'
import EditFamily from './components/EditFamily.vue'
import NewFamily from './components/NewFamily.vue'

import ListVital from './components/ListVital.vue'
import EditVital from './components/EditVital.vue'
import NewVital from './components/NewVital.vue'

  const routes = [
    {
      path: '/',
      name: 'root',
      component: App
    },
    {
      path: '/user/login',
      name: 'login',
      component: Login
    },
    {
      path: '/user/home',
      name: 'home',
      component: Home
    },
    {
      path: '/user/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/medical',
      name: 'listMedical',
      component: ListMedical
    },
    {
      path: '/medical/edit/:id',
      name: 'editMedical',
      component: EditMedical
    },
    {
      path: '/medical/new',
      name: 'newMedical',
      component: NewMedical
    },
    

    {
      path: '/patient',
      name: 'listPatient',
      component: ListPatient
    },
    {
      path: '/patient/edit/:id',
      name: 'editPatient',
      component: EditPatient
    },
    {
      path: '/patient/new',
      name: 'newPatient',
      component: NewPatient
    },


    {
      path: '/family',
      name: 'listFamily',
      component: ListFamily
    },
    {
      path: '/family/edit/:id',
      name: 'editFamily',
      component: EditFamily
    },
    {
      path: '/family/new',
      name: 'newFamily',
      component: NewFamily
    },


    {
      path: '/vital',
      name: 'listVital',
      component: ListVital
    },
    {
      path: '/vital/edit/:id',
      name: 'editVital',
      component: EditVital
    },
    {
      path: '/vital/new',
      name: 'newVital',
      component: NewVital
    },
  ] 
  const router = createRouter({
    history: createWebHistory(),
    routes
  })
export default router