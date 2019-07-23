<template>
 <div>
        <p>早上开始时间</p>
        <v-time-picker v-model="pickerMor"></v-time-picker>
        <p>时长</p>
            <v-text-field
        v-model="hourMor"
        :counter="10"
        label="Name"
        required
        ></v-text-field>
    <v-btn @click="SubmitMor" v-if="MorClick" color="success">提交</v-btn>
    <p>下午开始时间</p>
        <v-time-picker v-model="pickerAft"></v-time-picker>
            <v-text-field
        v-model="hourAft"
        :counter="10"
        label="Name"
        required
        ></v-text-field>
    <p>时长</p>
    <v-btn @click="SubmitAft" color="success">提交</v-btn>
    <v-btn @click="showClass" color="success">查看班次</v-btn>

  </div>

</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import Cookies from 'js-cookie'
const config = require('../utils/conf.js');

export default Vue.extend({
    name:'Manager',
    data(){
        return{
            hourMor:'',
            pickerMor:'',
            pickerAft:'',
            hourAft:'',
            MorClick:true
        }
    },
    created(){
          var v = Cookies.get('token');
          if(!v){
            alert("您还未登录，请登录");
            this.$router.push("/login");
          }
    },
    methods:{
        SubmitMor(){
            this.MorClick = false;
            console.log(this.hourMor);
            console.log(this.pickerMor);
          axios({
                  method:'post',
                  url:config.url+ "insertPhase",
                  params:{
                              hour: Number(this.hourMor),
                              Phase: this.pickerMor
                          }
          }).then(function(resp){
              if(!resp.data.Res.match("true")){
                  alert("提交失败，请联系管理员");
              }
              console.log(resp);
          }) 

        },
        SubmitAft(){
            console.log(this.hourAft);
            console.log(this.pickerAft);
            var that = this;
            if(this.MorClick){
                alert("请先提交早上的阶段");
            }else{
                axios({
                  method:'post',
                  url:config.url+ "insertPhase",
                  params:{
                              hour: Number(this.hourAft),
                              Phase: this.pickerAft
                          }
                 }).then(function(resp){
                    if(!resp.data.Res.match("true")){
                        alert("提交失败，请联系管理员");
                    }else{
                        //开始跳转了
                        that.$router.push("/GenClass");
                    }
                    console.log(resp);
                }) 

            }
        },
        showClass(){
            this.$router.push("/ShowClass");
        }
    }
})
</script>

<style>

</style>


