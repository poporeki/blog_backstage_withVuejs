import MainCommon from '@/components/home/MainCommon'
import AddLog from './logadd'
import LogList from './loglist'
export default {
  path: 'log',
  component: MainCommon,
  children: [AddLog, LogList]
}