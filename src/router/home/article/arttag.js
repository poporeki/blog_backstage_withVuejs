import AddArticleTag from '@/views/article/ArticleAddTagView'
import ArticleTagsList from '@/views/article/ArticleTagsListView'
//添加标签页
let addArcTag = {
  path: 'tag/add',
  meta: {
    title: '添加标签'
  },
  component: AddArticleTag
}
//标签列表页
let arcTagList = {
  path: 'tag/list',
  meta: {
    title: '标签列表'
  },
  component: ArticleTagsList
}


export default [
  addArcTag,
  arcTagList
]