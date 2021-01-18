<template>
    <div class="blog-note">
        <header-bar title="笔记详情"></header-bar>
        <br>
        <b-container>
            <div v-html="markedContent"></div>
            <hr>
            <div>
                <span>标签：</span>
                <span v-for="(item, index) in tags" :key="index">
                    <span v-if="index > 0">, </span>
                    <b-link :to="`/?tag=${item.id}`">{{ item.name }}</b-link>
                </span>
            </div>
            <br>
            <div>
                <b-button variant="outline-danger" size="sm" pill @click="handleSupport" class="mr-1">好文要顶</b-button>
                <b-button variant="outline-success" size="sm" pill>收藏该文</b-button>
            </div>
            <div>
                <small>阅读:{{ click }} 推荐:{{ support }} posted by {{ (new Date(updateTime)).toLocaleString() }}</small>
            </div>
        </b-container>
        <br>
        <footer-bar></footer-bar>
    </div>
</template>

<script>
import HeaderBar from './HeaderBar'
import FooterBar from './FooterBar'

import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/default.css'

export default {
    name: 'Note',
    components: {
        HeaderBar,
        FooterBar
    },
    data() {
        return {
            // 笔记内容
            content: '',
            // 标签
            tags: [],
            // 阅读数
            click: 0,
            // 点赞数
            support: 0,
            // 更新时间
            updateTime: 0
        }
    },
    computed: {
        markedContent() {
            return marked(this.content)
        }
    },
    methods: {
        // 好文要顶
        handleSupport() {
            if (!this.$route.query.id) {
                this.$bvToast.toast('笔记信息不存在')
                return
            }
            this.$http.get(`/note_support/${this.$route.query.id}`).then(res => {
                if (res.code === 0) {
                    this.support += 1
                    this.$bvToast.toast('操作成功')
                } else {
                    this.$bvToast.toast(res.msg)
                }
            }).catch(err => {
                console.log(err)
            })
        }
    },
    created() {
        // 语法高亮
        marked.setOptions({
            highlight: (code, lang) => hljs.highlight(lang || 'plaintext', code).value
        })

        // 获取笔记信息
        if (this.$route.query.id) {
            this.$http.get(`/note_info/${this.$route.query.id}`).then(res => {
                if (res.code === 0) {
                    this.content = res.data.content
                    this.tags = res.data.tags
                    this.click = res.data.click
                    this.support = res.data.support
                    this.updateTime = res.data.update_time
                } else {
                    this.$bvToast.toast(res.msg)
                }
            }).catch(err => {
                console.log(err)
            })
        }
    }
}
</script>

<style>
.blog-note pre {
    background-color: whitesmoke;
    padding: 5px;
    border: solid 1px gray;
}
.blog-note img {
    max-width: 100%;
    height: auto;
}
</style>
