<template>
    <div class="blog-about">
        <header-bar title="关于我"></header-bar>
        <br>
        <b-container>
            <b-alert show variant="warning" dismissible>功能页开发中，敬请期待</b-alert>
        </b-container>
        <br>
        <footer-bar></footer-bar>
    </div>
</template>

<script>
import HeaderBar from './HeaderBar'
import FooterBar from './FooterBar'

export default {
    name: 'About',
    components: {
        HeaderBar,
        FooterBar
    }
}
</script>
