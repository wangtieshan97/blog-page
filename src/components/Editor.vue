<template>
    <div class="blog-editor">
        <header-bar title="编辑笔记"></header-bar>
        <br>
        <b-container>
            <b-overlay :show="loading">
                <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                    <b-form-group label="标题：" description="笔记标题不能为空">
                        <b-form-input v-model.trim="title" required placeholder="请输入标题"></b-form-input>
                    </b-form-group>
                    <b-form-group label="内容：" description="在此处粘贴所复制的markdown文本">
                        <b-form-textarea v-model.trim="content" placeholder="请输入内容" rows="5"></b-form-textarea>
                    </b-form-group>
                    <b-form-group label="标签：" description="选择与笔记类型相关的标签">
                        <b-form-tags v-model="tagsName" size="lg" add-on-change no-outer-focus>
                            <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
                                <ul v-if="tags.length > 0" class="list-inline d-inline-block">
                                    <li v-for="tag in tags" :key="tag" class="list-inline-item">
                                        <b-form-tag @remove="removeTag(tag)" :title="tag" :disabled="disabled" variant="info">{{ tag }}</b-form-tag>
                                    </li>
                                </ul>
                                <b-form-select v-bind="inputAttrs" v-on="inputHandlers" :disabled="disabled || availableOptions.length === 0" :options="availableOptions">
                                    <template v-slot:first>
                                        <option disabled value="">选择标签</option>
                                    </template>
                                </b-form-select>
                            </template>
                        </b-form-tags>
                    </b-form-group>
                    <div><b-button variant="outline-primary" size="sm" pill v-b-modal.create-tag>创建新标签</b-button></div>
                    <br>
                    <b-form-group label="附件：" description="请上传images文件夹下的图片">
                        <b-form-file v-model="images" @input="uploadImage" multiple accept="image/*" placeholder="选择图片" browse-text="浏览"></b-form-file>
                    </b-form-group>
                    <div v-if="showProgress">
                        <b-progress :value="progressValue" :max="progressMax" animated></b-progress>
                        <br>
                    </div>
                    <b-button type="submit" variant="primary">提交</b-button>&nbsp;
                    <b-button type="reset" variant="danger">重置</b-button>&nbsp;
                    <b-button v-if="$route.query.id" variant="outline-danger" pill @click="deleteConfirm">删除</b-button>
                </b-form>
            </b-overlay>
        </b-container>
        <br>
        <footer-bar></footer-bar>
        <b-modal id="create-tag" title="创建新标签" @show="newTagName = ''">
            <b-form-input v-model.trim="newTagName" placeholder="请输入标签名"></b-form-input>
            <template v-slot:modal-footer="{ cancel }">
                <b-button variant="danger" @click="cancel()">取消</b-button>
                <b-button variant="success" :disabled="newTagName.length < 2" @click="createTag">确认</b-button>
            </template>
        </b-modal>
    </div>
</template>

<script>
import HeaderBar from './HeaderBar'
import FooterBar from './FooterBar'

export default {
    name: 'Editor',
    components: {
        HeaderBar,
        FooterBar
    },
    data() {
        return {
            // 标题
            title: '',
            // 内容
            content: '',
            // 标签名
            tagsName: [],
            // 图片名
            imagesName: [],
            // 标签选项列表
            tagOptions: [],
            // 新标签名
            newTagName: '',
            // 图片附件
            images: [],
            // 进度条选项
            showProgress: false,
            progressValue: 0,
            progressMax: 100,
            // 加载中
            loading: false,
            // 用于重置表单
            show: true
        }
    },
    computed: {
        // 过滤标签
        availableOptions() {
            return this.tagOptions.filter(item => this.tagsName.indexOf(item) === -1)
        }
    },
    methods: {
        // 提交表单
        onSubmit(evt) {
            evt.preventDefault()
            if (this.tagsName.length == 0) {
                this.$bvToast.toast('标签不能为空')
                return
            }
            let params = {
                title: this.title,
                content: this.content,
                tags_name: this.tagsName
            }
            let url = '/create_note'
            if (this.imagesName.length > 0) {
                params.images_name = this.imagesName
            }
            if (this.$route.query.id) {
                params.id = this.$route.query.id
                url = '/change_note'
            }
            this.loading = true
            this.$http.post(url, params).then(res => {
                this.loading = false
                if (res.code === 0) {
                    this.$bvToast.toast('保存笔记成功')
                } else {
                    this.$bvToast.toast(res.msg)
                }
            }).catch(err => {
                this.loading = false
                console.log(err)
            })
        },
        // 重置表单
        onReset(evt) {
            evt.preventDefault()
            this.title = ''
            this.content = ''
            this.tagsName = []
            this.images = []
            this.show = false
            this.$nextTick(() => {
                this.show = true
            })
        },
        // 获取标签列表
        getTagOptions() {
            this.$http.get('/tag_list').then(res => {
                if (res.code === 0) {
                    this.tagOptions = res.data.map(item => item.name)
                } else {
                    this.$bvToast.toast(res.msg)
                }
            }).catch(err => {
                console.log(err)
            })
        },
        // 创建新标签
        createTag() {
            const params = {
                name: this.newTagName
            }
            this.$http.post('/create_tag', params).then(res => {
                this.$bvModal.hide('create-tag')
                if (res.code === 0) {
                    this.getTagOptions()
                } else {
                    this.$bvToast.toast(res.msg)
                }
            }).catch(err => {
                this.$bvModal.hide('create-tag')
                console.log(err)
            })
        },
        // 上传图片
        uploadImage() {
            const fd = new FormData()
            for (const image of this.images) {
                fd.append('files', image)
            }
            this.progressValue = 0
            this.progressMax = 100
            this.showProgress = true
            this.$http.post('/upload', fd, {
                onUploadProgress: evt => {
                    this.progressValue = evt.loaded
                    this.progressMax = evt.total
                }
            }).then(res => {
                setTimeout(() => {
                    this.showProgress = false
                }, 1000)
                if (res.code === 0) {
                    // 累计附件
                    for (const image of this.images) {
                        this.imagesName.push(image.name)
                    }
                } else {
                    this.$bvToast.toast(res.msg)
                }
            }).catch(err => {
                this.showProgress = false
                console.log(err)
            })
        },
        // 删除笔记
        deleteConfirm() {
            this.$bvModal.msgBoxConfirm('是否永久删除该文章?', {
                title: '警告',
                buttonSize: 'sm',
                okVariant: 'danger',
                okTitle: '删除',
                cancelTitle: '取消',
                centered: true
            }).then(value => {
                if (value) {
                    this.$http.get(`/delete_note/${this.$route.query.id}`).then(res => {
                        if (res.code === 0) {
                            this.$bvToast.toast('删除成功，即将返回主页')
                            setTimeout(() => {
                                this.$router.replace({
                                    path: '/'
                                })
                            }, 1000)
                        } else {
                            this.$bvToast.toast(res.msg)
                        }
                    }).catch(err => {
                        console.log(err)
                    })
                }
            })
        }
    },
    created() {
        this.getTagOptions()
        // 表单回填
        if (this.$route.query.id) {
            this.loading = true
            this.$http.get(`/note_info/${this.$route.query.id}`).then(res => {
                this.loading = false
                if (res.code === 0) {
                    this.title = res.data.title
                    this.content = res.data.content
                    this.tagsName = res.data.tags.map(item => item.name)
                } else {
                    this.$bvToast.toast(res.msg)
                }
            }).catch(err => {
                this.loading = false
                console.log(err)
            })
        }
    }
}
</script>
