import Vistor from './vistors'
import User from './user'
import MainCommon from '@/components/home/MainCommon'
import Reg from './reg'
export default {
  path: 'users',
  component: MainCommon,
  children: [Vistor, User, Reg]
}