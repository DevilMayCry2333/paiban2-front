<template>
 <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="username"
      :counter="10"
      :rules="nameRules"
      label="用户名"
      required
    ></v-text-field>

    <v-text-field
      v-model="password"
      :rules="passRules"
      label="密码"
      required
      type="password"
    ></v-text-field>
    <div>
    <v-btn color="primary" @click="test">提交</v-btn>
    </div>
  </v-form>
  

</template>

<script lang="ts">

import Vue from 'vue'
import axios from 'axios'
import Cookies from 'js-cookie'

const config = require('../utils/conf.js');

export default Vue.extend({
   data: () => ({
      valid: true,
      username: '',
      nameRules: [
        v => !!v || '用户名是必须滴',
        v => (v && v.length <= 10) || '用户名不能超过十个字符'
      ],
      password: '',
      passRules: [
        v => !!v || '密码是必须的',
      ],
      select: null,
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4'
      ],
      checkbox: false
    }),
    methods:{
       test:function(){
          //  console.log(config.url);
           var that = this;
           if(this.username && this.password){
                axios({
                          method:'post',
                          url:config.url+ "login",
                          params:{
                              username: this.username,
                              password: this.password
                          }
                      }).then(function(resp){
                          // console.log(resp.data);
                          if(resp.data.Res == "lock"){
                            alert("账户已锁定");
                          }
                          else if(resp.data.Res){
                                 alert("认证已通过，准备跳转");
                                 Cookies.set('token',resp.data.Token);
                                 Cookies.set('username',that.username);
                                 var v = Cookies.get('token');
                                 alert(v);
                                 that.$router.push("/");
                          }
                          else{
                              alert("用户名或者密码错误");
                          }
                       
                      })
           }else{
               alert("输入的用户名密码不能为空");
           }
       },
    },
    name:'Login',
})

</script>


<style>

</style>




