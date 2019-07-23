<template>
<div>
      <v-data-table
    :headers="headers"
    :items="desserts"
    class="elevation-1"
    hide-actions
  >
    <template v-slot:items="props">
      <td>{{ props.item.today }}</td>
      <td class="text-xs-right">{{ props.item.phaseMor }}</td>
      <td class="text-xs-right">{{ props.item.phaseMorEnd }}</td>
      <td class="text-xs-right">{{ props.item.hourMor }}</td>
      <td class="text-xs-right">{{ props.item.spaceMor }}</td>
      <td class="text-xs-right">{{ props.item.phaseAft }}</td>
      <td class="text-xs-right">{{ props.item.phaseAftEnd }}</td>
      <td class="text-xs-right">{{ props.item.hourAft }}</td>
      <td class="text-xs-right">{{ props.item.spaceAft }}</td>
    </template>
  </v-data-table>

</div>

</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import Cookies from 'js-cookie'
const config = require('../utils/conf.js');

export default Vue.extend({
    name:'ShowClass',
    data () {
      return {
        headers: [
          {
            text: '日期',
            align: 'center',
            sortable: false,
            value: 'name',
            rowsPerPage:-1,
          },
            { text: '早上开始时间', value: 'fat',sortable: false,},
            { text: '早上结束时间', value: 'calories',sortable: false,},
            { text: '早上时长', value: 'fat',sortable: false,},
            { text: '早上容量', value: 'fat',sortable: false,},
            { text: '下午开始时间', value: 'fat',sortable: false,},
            { text: '下午结束时间', value: 'calories',sortable: false,},
            { text: '下午时长', value: 'fat',sortable: false,},
            { text: '下午容量', value: 'fat',sortable: false,},
        ],
        desserts: [
            // {Today:'2019-7-20',BeginTime:'12:00:00',EndTime:'13:00:00',hour:1,Cap:2}
        ]
      }
    },
    created:function(){
      var that = this;
                axios({
                  method:'post',
                  url:config.url+ "showClass",
                  params:{
                    username: Cookies.get('username')
                  }
          }).then(function(resp){
                  that.$nextTick(function () {
                  console.log(resp.data);
                  this.desserts = resp.data;
                  console.log(this.desserts);
                  })
          })
    }

})
</script>

<style>

</style>


