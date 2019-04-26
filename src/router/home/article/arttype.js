import AddArticleType from '@/views/article/ArticleAddTypeView'
import ArticleTypeList from '@/views/article/ArticleTypeListView'
let addArcType = {
  path: 'type/add',
  meta: {
    title: '添加分类'
  },
  component: AddArticleType
}

let ArcList = {
  path: 'type/list',
  meta: {
    title: '文章分类列表'
  },
  component: ArticleTypeList
}
export default [addArcType, ArcList]