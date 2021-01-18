<template>
    <div class="blog-message">
        <header-bar title="留言板"></header-bar>
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
    name: 'Message',
    components: {
        HeaderBar,
        FooterBar
    }
}
</script>
