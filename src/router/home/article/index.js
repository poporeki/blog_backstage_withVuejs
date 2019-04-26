import ShowArtList from './showlist';
import AddArticle from './addart';
import ArticleType from './arttype'
import ArticleUpdate from './articleupdate'
import ArticleTag from './arttag'
import MainCommon from '@/components/home/MainCommon'
export default {
  path: 'art',
  component: MainCommon,
  children: [ShowArtList, AddArticle, ...ArticleType, ...ArticleTag, ArticleUpdate]
}