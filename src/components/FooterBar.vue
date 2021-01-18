<template>
    <div class="blog-footer-bar">
        <p>Copyright &copy; {{ year }} 王铁山 All Rights Reserved</p>
    </div>
</template>

<script>
export default {
    name: 'FooterBar',
    data() {
        return {
            // 当前年份
            year: (new Date()).getFullYear()
        }
    }
}
</script>

<style scoped>
p {
    text-align: center;
}
</style>
