
namespace :assets do
  # Cedar stack will execute that task if it exists, on slug compile-time.
  # This allows the slug image to be pre-filled with our static website.
  #
  # This is a much better approach than the on-demand approach because it
  # allows faster boot times when scaling up and also makes sure the
  # cache-buster timestamp is the same on all processes.
  desc "middleman build"
  task :precompile do
    sh "bundle exec middleman build"
  end
end
