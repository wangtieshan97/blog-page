<template>
    <div class="blog-friend-link">
        <header-bar title="友人帐"></header-bar>
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
    name: 'FriendLink',
    components: {
        HeaderBar,
        FooterBar
    }
}
</script>
