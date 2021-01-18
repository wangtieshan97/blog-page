<template>
    <div class="blog-home">
        <header-bar></header-bar>
        <b-jumbotron header="欢迎访问我的博客" lead="在这里，我会分享一些有意思的小玩意，感兴趣的话可以多多关注我哦！" fluid container-fluid class="d-none d-md-block"></b-jumbotron>
        <br class="d-md-none">
        <b-container>
            <b-row>
                <b-col>
                    <b-alert :show="Boolean(selectedTag)" dismissible @dismissed="clearTag">{{ `当前标签：${selectedTag && selectedTag.name}` }}</b-alert>
                    <b-list-group>
                        <b-list-group-item v-for="(item, index) in notes" :key="index">
                            <b-link :to="`/note?id=${item.id}`">
                                <big>{{ item.title }}</big>
                            </b-link>
                            <div>
                                <small>阅读:{{ item.click }} 推荐:{{ item.support }} posted by {{ (new Date(item.update_time)).toLocaleString() }}</small>
                            </div>
                            <b-link :to="`/editor?id=${item.id}`">编辑</b-link>
                        </b-list-group-item>
                    </b-list-group>
                    <br>
                    <b-pagination v-model="pageNum" @input="pageChange" :total-rows="total" :per-page="pageSize" align="center"></b-pagination>
                </b-col>
                <b-col cols="3" class="d-none d-lg-block">
                    <b-card header="公告" class="mb-3">
                        <span>站长：王铁山</span>
                    </b-card>
                    <b-card header="友情链接" class="mb-3">
                        <b-link href="https://www.cnblogs.com/viewts/" target="_blank">博客园</b-link>
                    </b-card>
                    <b-card header="我的标签" class="mb-3">
                        <b-list-group>
                            <b-list-group-item button class="d-flex justify-content-between align-items-center" v-for="(item, index) in tags.slice(0, 10)" :key="index" @click="selectTag(item)">
                                <span>{{ item.name }}</span>
                                <b-badge variant="primary" pill>{{ item.note_num }}</b-badge>
                            </b-list-group-item>
                            <b-list-group-item v-if="tags.length > 10" to="/tag">更多</b-list-group-item>
                        </b-list-group>
                    </b-card>
                </b-col>
            </b-row>
        </b-container>
        <footer-bar></footer-bar>
    </div>
</template>

<script>
import HeaderBar from './HeaderBar'
import FooterBar from './FooterBar'

export default {
    name: 'Home',
    components: {
        HeaderBar,
        FooterBar
    },
    data() {
        return {
            // 笔记列表
            notes: [],
            // 分页信息
            pageNum: 1,
            pageSize: 10,
            total: 1,
            // 标签列表
            tags: [],
            // 选中的标签
            selectedTag: null
        }
    },
    methods: {
        // 获取笔记列表
        getNotes() {
            this.$http.get(`/note_list/${this.pageNum}/${this.pageSize}`).then(res => {
                if (res.code === 0) {
                    this.notes = res.data.list
                    this.total = res.data.total
                } else {
                    this.$bvToast.toast(res.msg)
                }
            }).catch(err => {
                console.log(err)
            })
        },
        // 按标签查询笔记
        findNoteByTag(tagId) {
            this.$http.get(`/find_note_by_tag/${tagId}/${this.pageNum}/${this.pageSize}`).then(res => {
                if (res.code === 0) {
                    this.notes = res.data.list
                    this.total = res.data.total
                } else {
                    this.$bvToast.toast(res.msg)
                }
            }).catch(err => {
                console.log(err)
            })
        },
        // 选择标签
        selectTag(tag) {
            this.selectedTag = tag
            this.pageNum = 1
            this.findNoteByTag(tag.id)
        },
        // 删除选中标签
        clearTag() {
            this.selectedTag = null
            this.pageNum = 1
            this.getNotes()
        },
        // 分页改变
        pageChange() {
            if (this.selectedTag) {
                this.findNoteByTag(this.selectedTag.id)
            } else {
                this.getNotes()
            }
        }
    },
    created() {
        // 初始化标签和笔记列表
        this.$http.get('/tag_list').then(res => {
            if (res.code === 0) {
                const tagId = this.$route.query.tag
                if (tagId) {
                    this.selectedTag = res.data.find(item => item.id === Number(tagId))
                }
                if (this.selectedTag) {
                    this.findNoteByTag(this.selectedTag.id)
                } else {
                    this.getNotes()
                }
                this.tags = res.data.sort((a, b) => (b.note_num - a.note_num))
            } else {
                this.$bvToast.toast(res.msg)
            }
        }).catch(err => {
            console.log(err)
        })
    }
}
</script>
