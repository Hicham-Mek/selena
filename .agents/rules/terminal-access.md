# Terminal Command Access Policy

The policy in one sentence:
ALLOW = inspect, test, lint, format-check, build
ASK   = modify code state, dependencies, Git, database, Docker, network, system
DENY  = destructive operations, privilege escalation, forced history changes, disk destruction

## ALLOW

- `pwd`
- `ls`
- `ls -la`
- `ls -l`
- `ls -lah`
- `git status`
- `git diff`
- `git diff --cached`
- `git log`
- `git log --oneline`
- `git branch`
- `git branch --show-current`
- `git show`
- `git remote -v`
- `node --version`
- `node -v`
- `npm --version`
- `npm -v`
- `pnpm --version`
- `pnpm -v`
- `yarn --version`
- `yarn -v`
- `php --version`
- `php -v`
- `composer --version`
- `composer -V`
- `php artisan list`
- `php artisan about`
- `php artisan route:list`
- `php artisan config:show`
- `php artisan test`
- `./vendor/bin/pint --test`
- `./vendor/bin/phpstan analyse`
- `npm run lint`
- `npm run test`
- `npm run build`
- `npm run typecheck`
- `pnpm lint`
- `pnpm test`
- `pnpm build`
- `pnpm typecheck`
- `yarn lint`
- `yarn test`
- `yarn build`

## ASK

- `git add`
- `git commit`
- `git checkout`
- `git switch`
- `git merge`
- `git rebase`
- `git reset`
- `git restore`
- `git revert`
- `git stash`
- `git fetch`
- `git pull`
- `git push`
- `npm install`
- `npm ci`
- `npm update`
- `npm uninstall`
- `pnpm install`
- `pnpm add`
- `pnpm update`
- `pnpm remove`
- `yarn install`
- `yarn add`
- `yarn upgrade`
- `yarn remove`
- `composer install`
- `composer update`
- `composer require`
- `composer remove`
- `php artisan migrate`
- `php artisan migrate:fresh`
- `php artisan migrate:refresh`
- `php artisan migrate:reset`
- `php artisan db:seed`
- `php artisan db:wipe`
- `php artisan key:generate`
- `php artisan storage:link`
- `docker`
- `docker compose`
- `curl`
- `wget`
- `ssh`
- `scp`
- `chmod`
- `chown`
- `kill`
- `pkill`

## DENY

- `sudo`
- `rm -rf`
- `rm -r`
- `rmdir`
- `git push --force`
- `git push -f`
- `git reset --hard`
- `git clean -fd`
- `git clean -fdx`
- `dd`
- `mkfs`
- `fdisk`
- `chmod 777`
- `chown root`
- `kill -9`
- `shutdown`
- `reboot`
- `docker system prune`
- `docker system prune -a`

### DENY — dangerous shell patterns

- `curl ... | sh`
- `curl ... | bash`
- `curl ... | zsh`
- `wget ... | sh`
- `wget ... | bash`
- `wget ... | zsh`

Also deny commands that:
- directly modify `/etc`
- directly modify `/usr`
- directly modify `/bin`
- directly modify `/sbin`
- directly modify `/boot`
- directly modify `/root`

### Sensitive files to protect

- `.env`
- `.env.*`
- `.git/`
- `storage/`
- `~/.ssh/`
- `~/.aws/`
