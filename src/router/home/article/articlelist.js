import ArticleList from "@/views/article/ArticleListView";
import ArticleRecycleList from "@/views/article/ArticleRecycleView";

let articleRecycle = {
  path: 'recycle/list',
  meta: {
    title: '文章回收站'
  },
  component: ArticleRecycleList
}
let articleList = {
  path: 'list',
  meta: {
    title: '文章列表'
  },
  component: ArticleList
}
export default [articleList, articleRecycle]