<template>
  <v-navigation-drawer
    clipped
    v-model="overlay.menuEnabled"
    fixed
    app
  >
    <v-list>

      <v-list-tile v-for="item in links" :key="item.name">
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>
          <a :href="'#/'+item.name" @click.prevent="linkTo(item)">{{ item.title }}</a>
        </v-list-tile-title>
      </v-list-tile>

    </v-list>

  </v-navigation-drawer>
</template>

<script>

  import {mapState, mapActions} from 'vuex';

  export default{
    data(){
      return {
        links: [
          {
            title: "Головна",
            name: "education-plan",
            icon: "home"
          },
          {
            title: "Цикли",
            name: "cycles",
            icon: "file_copy"
          },
          {
            title: "Категорії",
            name: "categories",
            icon: "file_copy"
          },
          {
            title: "Підкатегорії",
            name: "sub-categories",
            icon: "description"
          },
          {
            title: "Кафедри",
            name: "subdivisions",
            icon: "school"
          },
          {
            title: "Факультети",
            name: "departments",
            icon: "school"
          },
          {
            title: "Предмети",
            name: "subjects",
            icon: "school"
          },
          {
            title: "Користувачі",
            name: "users",
            icon: "assignment"
          },
          {
            title: "Налаштування",
            name: "settings",
            icon: "settings"
          }
        ]
      }
    },

    computed: {
      ...mapState([
        'overlay',
        'breadcrumbs'
      ])
    },

    methods: {
      ...mapActions({
        'initBreadCrumbs': 'breadcrumbs/init'
      }),

      linkTo(item){
        this.$router.push({name: item.name});
        this.initBreadCrumbs({
          title: item.title,
          link: ''
        });
      }
    }

  }

</script>

