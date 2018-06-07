var components =  [
{
  name: 'van-swipe',
  label: '幻灯',
  config: [{
    key: 'autoplay',
    name: '自动播放时间',
    default: 0,
    type: 'number'
  }],
  slots: [{
    isList: true,
    componentName: 'van-swipe-item',
    content: `<img src="http://via.placeholder.com/200x100" alt="" style="width:100%"/>`
  }]
},
{
  name: 'media',
  label: 'Media',
  config: [
  // {
  //   key: 'img',
  //   name: '图片配置',
  //   defaultValue: {},
  //   // type: 'obj'
  // }, 
  // 拆分
  {
    key: 'image.width',
    name: '图片宽度',
    defaultValue: '.2rem',
  },
  {
    key: 'spaceBetween',
    name: '间距',
    defaultValue: '.2rem',
  }],
  slots: [{
    content: `<h2>xxxx</h2><p>dffffdf</p>`
  }]
},
{
  name: 'placeholder',
  label: '占位',
  config: [],
  slots: [{
    content: `占位组件`
  }]
}]

export default components;