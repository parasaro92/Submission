<template>
  <div>
    <v-container>
      <v-layout row class="">
        <v-flex xs5 class="">
          <div class="container">
            <v-btn @click="nextTab()" flat class="primary">
              <v-icon class="primary_text">keyboard_arrow_left</v-icon>
              <span class="icon_set">Back</span>
            </v-btn>
          </div>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-card>
          <v-card-title>
            <v-text-field v-model="search" class="col-md-6 p-0" append-icon="search" label="Search" single-line hide-details></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="dataObj"
            class="elevation-1"
            :search="search">
            <template slot="items" slot-scope="props">
              <td>{{ props.item.interviewer }}</td>
              <td>{{ props.item.interviewee }}</td>
              <td>{{ props.item.mobileNumber }}</td>
              <td>{{ props.item.address }}</td>
              <td>{{ props.item.date }}</td>
              <td>{{ props.item.purpose }}</td>
              <td>{{ props.item.city }}</td>
              <td>{{ props.item.id }}</td>
            </template>
          </v-data-table>
        </v-card>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { eventBus } from '../main'

export default {
  name: 'Details',
  data: () => ({
    headers: [
      {
        text: 'Interviewer Name',
        value: 'interviewer'
      },
      { text: 'Interviewee Name', 
        value: 'interviewee' 
      },
      { text: 'Mobile No.', 
        value: 'mobileNumber' 
      },
      { text: 'Address', 
        value: 'address' 
      },
      { text: 'Date', 
        value: 'date' 
      },
      { text: 'Purpose', 
        value: 'purpose' 
      },
      { text: 'City', 
        value: 'city' 
      },
      { text: 'Unique Id', 
        value: 'id' 
      }
    ],
    search: '',
    eventBus: eventBus,
    dataObj: []
  }),
  mounted () {
    /* eslint-disable */
    if(localStorage['store']) {
      this.dataObj = Array.from(JSON.parse(localStorage.getItem('store')))
      console.log('dd', this.dataObj)
    }
  },
  methods: {
    nextTab () {
      this.$router.push({name: 'algo'})
    }
  }
}
</script>
