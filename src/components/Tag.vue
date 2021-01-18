<template>
    <div class="blog-tag">
        <header-bar title="标签管理"></header-bar>
        <br>
        <b-container>
            <b-card title="全部标签">
                <b-button v-for="(tag, index) in tags" :key="index" :variant="randColor()" class="mr-3 mb-2" @click="gotoNote(tag.id)">{{ tag.name }}</b-button>
            </b-card>
        </b-container>
        <br>
        <footer-bar></footer-bar>
    </div>
</template>

<script>
import HeaderBar from './HeaderBar'
import FooterBar from './FooterBar'

export default {
    name: 'Tag',
    components: {
        HeaderBar,
        FooterBar
    },
    data() {
        return {
            // 标签列表
            tags: []
        }
    },
    methods: {
        // 随机颜色
        randColor() {
            const color = [
                'outline-primary',
                'outline-secondary',
                'outline-success',
                'outline-danger',
                'outline-warning',
                'outline-info',
                'outline-dark'
            ]
            return color[Math.floor(Math.random() * 7)]
        },
        // 跳转到笔记页
        gotoNote(tagId) {
            this.$router.push({
                path: '/',
                query: {
                    tag: tagId
                }
            })
        }
    },
    created() {
        // 获取标签列表
        this.$http.get('/tag_list').then(res => {
            if (res.code === 0) {
                this.tags = res.data
            } else {
                this.$bvToast.toast(res.msg)
            }
        }).catch(err => {
            console.log(err)
        })
    }
}
</script>
