<template>
  <v-card color="background" min-height="800px" tile flat>
    <v-row>
      <v-col cols="8" offset="2" class="py-10">
        <v-card
          tile
          class="mx-auto"
        >
          <v-row>
            <v-col>
              <v-card-text>
                <p class="text-h4 text--primary">
                  Want to be part of darttraders' producers?
                </p>
                <p>Apply for aa artist account</p>
                <div class="text--primary">
                   <v-switch
                      v-model="role"
                      label="Artist account"
                      color="primary"
                      hide-details
                      @click="openRoleDialog()"
                    ></v-switch>
                </div>
              </v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="8" offset="2" class="py-5">
        <v-card
          tile
          class="mx-auto"
        >
        </v-card>
        <p class="text-h4 text--primary">Personal information</p>
        <v-list class="px-5">
          <v-list-item style="border-bottom: 1px solid #363636" class="py-5">
            <v-list-item-content>
              <v-list-item-title>Add a picture to your profile</v-list-item-title>
            </v-list-item-content>
            <v-list-item-avatar @click="title='User'">
              <v-img :src="user.picture_url" max-width="50px" v-if="user.picture_url" @click="openPictureDialog"></v-img>
              <v-icon dark v-if="!user.picture_url" size="50" @click="openPictureDialog">mdi-alien</v-icon>
            </v-list-item-avatar>
          </v-list-item>
          <v-list-item class="pt-2">
            <v-list-item-content>
              <v-row>
                <v-col cols="2">
                  <v-list-item-subtitle>Name</v-list-item-subtitle>
                </v-col>
                <v-col>
                  <v-list-item-title>{{ user.name }}</v-list-item-title>
                </v-col>
              </v-row>
            </v-list-item-content>
            <v-list-item-icon style="margin-right: -6px !important">
                <v-btn
                    class="ma-2"
                    outlined
                    small
                    fab
                    color="white"
                    @click="openPersonalDialog()"
                >
                  <v-icon v-if="user.name">mdi-pencil</v-icon>
                  <v-icon v-if="!user.name">mdi-plus</v-icon>
                </v-btn>
            </v-list-item-icon>
          </v-list-item>
           <v-list-item class="pt-2">
            <v-list-item-content>
              <v-row>
                <v-col cols="2">
                  <v-list-item-subtitle>Username</v-list-item-subtitle>
                </v-col>
                <v-col>
                  <v-list-item-title style="margin-left: -8px !important">{{ user.username }}</v-list-item-title>
                </v-col>
              </v-row>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="8" offset="2" class="py-5">
        <v-card
          tile
          class="mx-auto"
        >
        </v-card>
        <p class="text-h4 text--primary">Contact information</p>
        <v-list class="px-5">
          <v-list-item class="pt-2">
            <v-list-item-content>
              <v-row>
                <v-col cols="2">
                  <v-list-item-subtitle>Email</v-list-item-subtitle>
                </v-col>
                <v-col>
                  <v-list-item-title>{{ user.email }}</v-list-item-title>
                </v-col>
              </v-row>
            </v-list-item-content>
            <v-list-item-icon style="margin-right: -6px !important">
                 <v-btn
            class="ma-2"
            outlined
            small
            fab
            white="indigo"
            @click="openContactDialog"
        >
          <v-icon v-if="user.email">mdi-pencil</v-icon>
          <v-icon v-if="!user.email">mdi-plus</v-icon>
        </v-btn>
        </v-list-item-icon>
          </v-list-item>
           <v-list-item class="pt-2">
            <v-list-item-content>
              <v-row>
                <v-col cols="2">
                  <v-list-item-subtitle>Mobile</v-list-item-subtitle>
                </v-col>
                <v-col>
                  <v-list-item-title style="margin-left: -12px !important">{{ user.contactPhone }}</v-list-item-title>
                </v-col>
              </v-row>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
    <v-dialog
        v-model="dialogs.personal"
        max-width="600px"
        :key="Math.random()"
      >
      <DialogPersonal :user="nUser" @save="save" @close="close" />
    </v-dialog>
    <v-dialog
        v-model="dialogs.contact"
        max-width="600px"
        :key="Math.random()"
      >
      <DialogContact :user="nUser" @save="save" @close="close" />
    </v-dialog>
    <v-dialog
        v-model="dialogs.role"
        max-width="600px"
        :key="Math.random()"
      >
      <DialogRole :user="nUser" @save="save" @close="close" />
    </v-dialog>
    <v-dialog
        v-model="dialogs.picture"
        max-width="600"
        :key="Math.random()"
      >
      <DialogPicture :user="nUser" @close="close" @save="save"/>
    </v-dialog>
  </v-card>
</template>
<script>
import DialogPersonal from '@/components/Settings/Dialog-personal'
import DialogContact from '@/components/Settings/Dialog-contact'
import DialogRole from '@/components/Settings/Dialog-role'
import DialogPicture from '@/components/Settings/Dialog-picture'
import { update, state$ } from '@app/app-api'

export default {
  data: () => ({
    user: {},
    dialogs: {
      contact: false,
      personal: false,
      picture: false,
      role: false,
      
    },
    mobile: '',
    role: false,
    nUser : {}
  }),
  components: {
    DialogPersonal,
    DialogContact,
    DialogRole,
    DialogPicture
  },
  mounted: function() {
    this.user = JSON.parse(sessionStorage.getItem('user'))
    this.role = this.user.role === 'creator' ? true : false
  },
  methods: {
    openPersonalDialog: function () {
      this.dialogs.personal = true
      this.nUser = {
        name: this.user.name,
        username: this.user.username
      }
    },
    updateUser: function(data) {
      const url = process.env.VUE_APP_API_URL ?
        process.env.VUE_APP_API_URL + process.env.VUE_APP_UPDATE_USER_PATH :
        process.env.VUE_APP_UPDATE_USER_PATH
      const user = JSON.parse(sessionStorage.getItem('user'));
      update(url, data)
      .then(() => {
        state$.next('update')
        this.user = JSON.parse(sessionStorage.getItem('user'));
        this.role = this.user.role === 'creator' ? true : false
      }).catch(err=>console.log(err))
    },
    openRoleDialog: function () {
      let role
      if (this.role === true) {
          role = 'creator';
        } else {
          role = 'user'
      }
      this.nUser = {
        role: role
      }
      this.dialogs.role = true
    },
    openPictureDialog: function () {
      this.dialogs.picture = true
    },
    openContactDialog: function () {
      this.dialogs.contact = true
      this.nUser = {
        contactPhone: this.user.contactPhone
      }
    },
    close: function() {
      this.nUser = {}
      Object.keys(this.dialogs).forEach(dialog => {
        this.dialogs[dialog] = false
      })
    },
    save: function(val) {
      this.close()
      this.updateUser(val)
    }
  }
}
</script>