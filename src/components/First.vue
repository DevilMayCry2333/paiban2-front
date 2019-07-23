<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    class="elevation-1"
    hide-actions
  >
    <template v-slot:items="props">
      <td class="text-xs-right">{{ props.item.hourMor }}</td>
      <td>{{ props.item.Today }}</td>
      <td class="text-xs-right"> <v-btn color="info" :id="desserts" v-if="props.item.leftSpaceMor>0 && !props.item.alreadyOrderMor" @click="selMor(props.item.id)">{{ props.item.leftSpaceMor }}/{{ props.item.spaceMor }}</v-btn>{{ props.item.userNameMor }}</td>
      <td class="text-xs-right"> <v-btn color="info" :id="desserts" v-if="props.item.leftSpaceAft>0 && !props.item.alreadyOrderAft" @click="selAft(props.item.id)">{{ props.item.leftSpaceAft }}/{{ props.item.spaceAft }}</v-btn>{{ props.item.userNameAft }}</td>
    </template>
  </v-data-table>
</template>

<script lang="ts">

import Vue from 'vue'
import axios from 'axios'
import Cookies from 'js-cookie'
const config = require('../utils/conf.js');


export default Vue.extend({
    name:'First',
  data () {
      return {
        headers: [
          {
            text: '#',
            align: 'center',
            sortable: false,
            value: 'name',
            rowsPerPage:-1,
          },
            { text: '时长', value: 'fat',sortable: false,}
          // { text: '12:00:00', value: 'calories',sortable: false,},
          // { text: '18:00:00', value: 'fat',sortable: false,},
        ],
        desserts: [

        ]
      }
    },
    created:function(){
      var that = this;
        // this.$nextTick(function () {
    // Code that will run only after the
    // entire view has been rendered
          var v = Cookies.get('token');
          if(!v){
            alert("您还未登录，请登录");
            this.$router.push("/login");
          }
          console.log("Create");
          axios({
                  method:'post',
                  url:config.url+ "queryClass",
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

          axios({
                  method:'post',
                  url:config.url+ "queryPhase",
          }).then(function(resp){
                  that.$nextTick(function () {
                  console.log(resp.data);
                  for(var i = 0 ; i < resp.data.length; i++){
                          this.headers.push(resp.data[i]);
                  }
                  console.log("完成");
                  console.log(this.headers);
                  })
          })
    },
    methods:{
      selMor(e){
        alert(e);
        console.log("selMor");
        var that = this;
          axios({
                  method:'post',
                  url:config.url+ "orderMorClass",
                  params:{
                              username: Cookies.get('username'),
                              id: e,
                              today:this.getDate()
                          }
          }).then(function(resp){
                  that.$nextTick(function () {
                  console.log(resp.data);
                  for(var i = 0 ; i < resp.data.length; i++){
                          this.desserts.push(resp.data[i]);
                  }

                  console.log("完成");
                  console.log(this.desserts);
                  location.reload();
                  })
          }) 
      },
      selAft(e){
        alert(e);
        console.log("selMor");
        var that = this;
          axios({
                  method:'post',
                  url:config.url+ "orderAftClass",
                  params:{
                              username: Cookies.get('username'),
                              id: e,
                              today:this.getDate()
                          }
          }).then(function(resp){
                  that.$nextTick(function () {
                  console.log(resp.data);
                  for(var i = 0 ; i < resp.data.length; i++){
                          this.desserts.push(resp.data[i]);
                  }

                  console.log("完成");
                  console.log(this.desserts);
                  location.reload();
                  })
          }) 
      },
      getDate(){
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = (date.getMonth() + 1).toString();
        var strDate = date.getDate().toString();
        if (Number(month) >= 1 && Number(month) <= 9) {
          month = "0" + month;
        }
        if (Number(strDate) >= 0 && Number(strDate) <= 9) {
          strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
      }
    }
})
</script>

<style lang="scss">

</style>


