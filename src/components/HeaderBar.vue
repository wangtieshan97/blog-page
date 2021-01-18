<template>
    <div class="blog-header-bar">
        <b-navbar toggleable="md" type="dark" variant="dark">
            <b-navbar-brand>{{ title }}</b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav class="ml-auto">
                    <b-nav-item class="mr-3" to="/">首页</b-nav-item>
                    <b-nav-item class="mr-3" to="/editor">笔记</b-nav-item>
                    <b-nav-item class="mr-3" to="/tag">标签</b-nav-item>
                    <b-nav-item class="mr-3" to="/about">关于</b-nav-item>
                    <b-nav-item class="mr-3" to="/message">留言</b-nav-item>
                    <b-nav-item class="mr-3" to="/friend-link">友链</b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
export default {
    name: 'HeaderBar',
    props: {
        // 标题
        title: {
            type: String,
            default: '我的博客'
        }
    }
}
</script>
