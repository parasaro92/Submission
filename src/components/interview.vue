<template>
<div class="row">
  <v-container>
    <v-layout row class="">
      <v-flex xs5 class="">
        <div class="container">
          <v-btn color="primary" @click="nextTab()">
            <!-- <router-link class="link" to="/details"> -->
              <v-icon class="">keyboard_arrow_left</v-icon>
              <span class="icon_set">Back</span>
            <!-- </router-link> -->
          </v-btn>
        </div>
      </v-flex>
    </v-layout>
    <v-form @submit.prevent="register(form)" ref="form" class="">
      <h1>Interview Process</h1>
      <v-flex md12 class="mt-3">
        <v-text-field
          label="Interviewer name*"
          v-model.trim="form.interviewer"
          data-vv-name="Interviewer Name"
          v-validate="'required|max:10|alpha'"
          data-vv-validate-on="blur|input|change|update"
          :error-messages="errors.collect('Interviewer Name')">
        </v-text-field>
      </v-flex>
      <v-flex md12 class="mt-3">
        <v-text-field
          label="Interviewee name*"
          v-model.trim="form.interviewee"
          data-vv-name="Interviewee Name"
          v-validate="'required|alpha'"
          data-vv-validate-on="blur|input|change|update"
          :error-messages="errors.collect('Interviewee Name')">
        </v-text-field>
      </v-flex>
      <v-flex md12>
        <v-text-field
          label="E-mail*"
          v-model.trim="form.email"
          data-vv-name="email"
          v-validate="'required|email'"
          data-vv-validate-on="blur|input|change|update"
          :error-messages="errors.collect('email')">
        </v-text-field>
      </v-flex>
      <v-flex md12>
        <v-text-field
          label="Mobile Number*"
          v-model.trim="form.mobileNumber"
          data-vv-name="Mobile Number"
          v-validate="'required|numeric|min:6|max:15'"
          data-vv-validate-on="blur|input|change|update"
          :error-messages="errors.collect('Mobile Number')">
        </v-text-field>
      </v-flex>
      <v-flex md12 class="mt-3">
        <v-text-field
          label="Address*"
          v-model.trim="form.address"
          data-vv-name="Address"
          v-validate="'required'"
          data-vv-validate-on="blur|input|change|update"
          :error-messages="errors.collect('Address')">
        </v-text-field>
      </v-flex>
      <v-flex xs12 md12>
        <v-combobox
          v-model="form.purpose"
          :items="items"
          label="Interview Purpose*"
          data-vv-name="purpose"
          v-validate="'required'"
          data-vv-validate-on="blur|input|change|update"
          :error-messages="errors.collect('purpose')"
        ></v-combobox>
      </v-flex>
      <v-flex xs12 md12>
        <v-combobox
          v-model="form.city"
          :items="country"
          label="Select a city"
          data-vv-name="city"
          v-validate="'required'"
          data-vv-validate-on="blur|input|change|update"
          :error-messages="errors.collect('city')"
        ></v-combobox>
      </v-flex>
      <v-flex md12 v-if="form.city=='Elsewhere'">
        <v-text-field
          label="Select your country*"
          v-model.trim="form.customCity"
          data-vv-name="Id"
          v-validate="'required'"
          data-vv-validate-on="blur|input|change|update"
          :error-messages="errors.collect('Id')">
        </v-text-field>
      </v-flex>
      <v-layout>
        <v-flex xs12 md6 class="mr-4">
          <v-menu
            ref="menu"
            :close-on-content-click="false"
            v-model="menu"
            :nudge-right="40"
            :return-value.sync="form.date"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
          >
          <v-text-field
              slot="activator"
              v-model="form.date"
              label="Picker in menu"
              prepend-icon="event"
          ></v-text-field>
          <v-date-picker v-model="form.date" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
            <v-btn flat color="primary" @click="$refs.menu.save(form.date)">OK</v-btn>
          </v-date-picker>
          </v-menu>
        </v-flex>
        <v-flex md6>
          <v-text-field
            label="Interview Id*"
            v-model.trim="form.id"
            data-vv-name="Id"
            v-validate="'required'"
            data-vv-validate-on="blur|input|change|update"
            :error-messages="errors.collect('Id')"
            readonly>
          </v-text-field>
        </v-flex>
        <v-btn md2 class="primary" @click="uniqueId()">Generate Id</v-btn>
      </v-layout>
      <v-btn type="submit" class="primary">submit</v-btn>  
    </v-form>
  </v-container>
</div>
</template>

<script>
import { eventBus } from '../main'

export default {
  name: 'Algo',
  data: () => ({
    eventBus: eventBus,
    menu: false,
    items: [
      'Visa',
      'Permanent residence'
    ],
    country: [
      'London',
      'Brighton', 
      'Belfast', 
      'Cardiff', 
      'Newcastle',
      'Elsewhere'
    ],
    store: {},
    form: {
      'interviewer': '',
      'interviewee': '',
      'mobileNumber': '',
      'address': '',
      'date': new Date().toISOString().substr(0, 10),
      'purpose': '',
      'city': '',
      'id': '',
      'customCity': ''
    },
    unique_id: '',
    count: 0
  }),
  mounted () {
    eventBus.$emit('details', {details: this.store})
  },
  methods: {
    uniqueId () {
      // Convert it to base 16 (numbers + letters), and grab the first 16 characters
      // after the decimal.
      /* eslint-disable */
      this.unique_id = '#' + Math.random().toString(16).substr(2, 16)
      this.form.id = this.unique_id
      // console.log(this.unique_id)
      /* eslint-disable */
    },
    register (form) {
      console.log('data', this.form)
      let itemsArray = localStorage.getItem('store') ? JSON.parse(localStorage.getItem('store')) : {}
      this.count

      this.$validator.validateAll().then((result) => {
        if (result) {
          if(localStorage['store']) {
            // this.store = itemsArray
            // console.log('ll', this.store)
            this.local(itemsArray)
          } else {
            // this.store = JSON.stringify(this.form)
            // this.store.push(this.form)
            this.local(itemsArray)
          }
        }
      })
    },
    local (itemsArray) {
      itemsArray[this.count] = this.form
      itemsArray['length'] = this.count + 1
      localStorage.setItem('store', JSON.stringify(itemsArray))
      this.count++
    },
    nextTab () {
      this.$router.push({name: 'view'})
      // eventBus.$emit('details', {details: this.store})
    }
  },
  created () {
  }
}
</script>

<style lang="scss">

</style>

