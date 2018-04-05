require('shelljs/global')

rm('-rf', 'build/new-top-sky-alpha-front-v2/.nuxt');
cp('-R', ['alpha-front/.nuxt', 'alpha-front/backpack_output','alpha-front/static'],'build/new-top-sky-alpha-front-v2')

cd('build/new-top-sky-alpha-front-v2')

exec('git add .')
exec('git commit -m publish')
exec('git push')




