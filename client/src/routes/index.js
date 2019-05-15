import Vue from 'vue';
import VueRouter from 'vue-router';

import Cycles from '../components/Cycles/Cycles';
import Categories from '../components/Categories/Categories';
import Departments from '../components/Departments/Departments';
import Users from '../components/Users/Users';
import SubCategories from '../components/SubCategories/SubCategories';
import List from '../components/EducationPlan/List';
import Detail from '../components/EducationPlan/Detail';
import Subdivisions from '../components/Subdivisions/Subdivisions';
import SubjectsList from '../components/SubjectsList/SubjectsList';
import Settings from '../components/Settings/Settings';

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'education-plan',
      component: List
    },
    {
      path: '/cycles',
      name: 'cycles',
      component: Cycles
    },
    {
      path: '/categories',
      name: 'categories',
      component: Categories
    },
    {
      path: '/education-plan/:id',
      name: 'education-plan-detail',
      component: Detail,
    },
    {
      path: '/subdivisions',
      name: 'subdivisions',
      component: Subdivisions
    },
    {
      path: '/sub-categories',
      name: 'sub-categories',
      component: SubCategories
    },
    {
      path: '/subjects',
      name: 'subjects',
      component: SubjectsList
    },
    {
      path: '/departments',
      name: 'departments',
      component: Departments
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    },
    {
      path: '/users',
      name: 'users',
      component: Users
    }
  ]
});
