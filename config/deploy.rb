# config valid for current version and patch releases of Capistrano
lock "~> 3.20.0"

set :application, "background_designer"
set :repo_url, "https://github.com/pannonbeard/background_designer.git"

# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp
set :branch, 'main'

# Default deploy_to directory is /var/www/my_app_name
set :deploy_to, "/home/deploy/apps/#{fetch :application}"

# Default value for :format is :airbrussh.
# set :format, :airbrussh

# You can configure the Airbrussh format using :format_options.
# These are the defaults.
# set :format_options, command_output: true, log_file: "log/capistrano.log", color: :auto, truncate: :auto

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
append :linked_files, 'config/master.key'

# Default value for linked_dirs is []
append :linked_dirs, "log", "tmp/pids", "tmp/cache", "tmp/sockets", "public/system", "storage"

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for local_user is ENV['USER']
# set :local_user, -> { `git config user.name`.chomp }

# Default value for keep_releases is 5
set :keep_releases, 5

# Uncomment the following to require manually verifying the host key before first deploy.
# set :ssh_options, verify_host_key: :secure

namespace :deploy do
  after :finished, :restart_systemd_service do
    on roles(:app) do
      execute :sudo, "systemctl restart myapp.service"
    end
  end
end

set :solid_queue_systemd_unit_name, "my_app_solid_queue.service"

namespace :solid_queue do
  desc "Quiet solid_queue (start graceful termination)"
  task :quiet do
    on roles(:app) do
      execute :sudo, "systemctl", "kill", "-s", "SIGTERM", fetch(:solid_queue_systemd_unit_name), raise_on_non_zero_exit: false
    end
  end

  desc "Stop solid_queue (force immediate termination)"
  task :stop do
    on roles(:app) do
      execute  :sudo, "systemctl", "kill", "-s", "SIGQUIT", fetch(:solid_queue_systemd_unit_name), raise_on_non_zero_exit: false
    end
  end

  desc "Start solid_queue"
  task :start do
    on roles(:app) do
      execute  :sudo, "systemctl", "start", fetch(:solid_queue_systemd_unit_name)
    end
  end

  desc "Restart solid_queue"
  task :restart do
    on roles(:app) do
      execute  :sudo, "systemctl", "restart", fetch(:solid_queue_systemd_unit_name)
    end
  end
end

# SolidQueue hooks
after "deploy:starting", "solid_queue:quiet"
after "deploy:updated", "solid_queue:stop"
after "deploy:published", "solid_queue:start"
after "deploy:failed", "solid_queue:restart"