#!/usr/bin/env sh

# 錯誤終止腳本
set -e

# 運行 gulp build
gulp build

cd public

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:hexschool/vue3-starter-files.git master:gh-pages

cd -