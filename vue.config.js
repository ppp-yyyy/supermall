module.exports = {
    configureWebpack:{
        resolve:{
            // 路径相关
            // .css/.js之类的隐藏
            extensions:[],
            //配置别名
            alias:{
                // '@': "src",
                'assets': '@/assets',
                'common': '@/common',
                'components': '@/components',
                'network': '@/network',
                'views': '@/views',
            }
        }
    }
}