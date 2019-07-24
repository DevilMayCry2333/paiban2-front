<template>
    <div>
        <h1>生成班次内容</h1>
        <h1>请勿多次点击，否则会产生重复数据</h1>
        <h1>默认根据班次表产生初始日期后五天的数据!</h1>
        <v-btn href="https://youkaiyu.com:5000/createClass" color="success">生成!</v-btn>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name:'GenClass',
    methods:{

    }
})
</script>

<style>

</style>


