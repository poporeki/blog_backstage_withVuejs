import Home from '@/views/Home'
import Main from './main'
import Article from './article/index'
import Log from './log'
import User from './users'
export default {
    path: '/',
    name: 'home',
    component: Home,
    children: [Main, Article, User, Log]
}