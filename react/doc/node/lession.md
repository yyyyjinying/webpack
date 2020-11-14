# nvm .nvmrc
## nvm mac安装如下：
- curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.35.2/install.sh | bash
- 如果拒绝 
- - sudo vi /etc/hosts
- - 在文件的尾部追加内容 
- - - 199.232.68.133 raw.githubusercontent.com
- - 再次执行 curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.35.2/install.sh | bash
- nvm 查看是否成功
- 如果显示 -bash: nvm: command not found
- 解决 command not found 的问题
- - vi .bash_profile 打开.bash_profile文件
- - 检查是否写有：
- - - export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
- - 有的话，执行命令 source .bash_profile // 每次修改.bashrc后，使用source ~/.bashrc（或者 . ~/.bashrc）就可以立刻加载修改后的设置，使之生效。
- 成功 nvm
## nvm 常用命令
- nvm install stable ## 安装最新稳定版 node，当前是node v9.5.0 (npm v5.6.0)

- nvm install <version> ## 安装指定版本，可模糊安装，如：安装v4.4.0，既可nvm - - install v4.4.0，又可nvm install 4.4

- nvm uninstall <version> ## 删除已安装的指定版本，语法与install类似

- nvm use <version> ## 切换使用指定的版本node

- nvm ls ## 列出所有安装的版本

- nvm ls-remote ## 列出所有远程服务器的版本（官方node version list）

- nvm current ## 显示当前的版本

- nvm alias <name> <version> ## 给不同的版本号添加别名

- nvm unalias <name> ## 删除已定义的别名

- nvm reinstall-packages <version> ## 在当前版本 node 环境下，重新全局安装指定版本号
# nodemon
- nvm：nodejs 版本管理工具。
也就是说：一个 nvm 可以管理很多 node 版本和 npm 版本。
nodejs：在项目开发时的所需要的代码库
npm：nodejs 包管理工具。
在安装的 nodejs 的时候，npm 也会跟着一起安装，它是包管理工具。
npm 管理 nodejs 中的第三方插件

