#
# This is how Heroku is serving our files
#

top_dir = File.expand_path('..', __FILE__)

require 'rack/contrib/try_static'
require 'rack/contrib/not_found'
require 'rack/cache'

# Middleman's config.rb has the same heuristic
build_dir = 'build'

# Don't send a body for HEAD requests
use Rack::Head

# Optional. Serve the website from RAM directly :)
use Rack::Cache,
  :metastore    => 'heap:/',
  :entitystore  => 'heap:/',
  :default_ttl  => 3600,
  :allow_reload => false

# Compress pages on the fly if supported
# TODO: use the existing .gz extension if it exists
use Rack::Deflater

# Make sure we use the right host
if ENV['CANONICAL_HOST']
  require 'rack-canonical-host'
  use Rack::CanonicalHost, ENV['CANONICAL_HOST']
end

# Add expiration headers for some assets
#use Expirator, ['image/*']

# First try to serve the static file
use Rack::TryStatic, :root => build_dir, :urls => %w[/], :try => ['index.html', '/index.html']

# If nothing else works, show a 404 page
page_not_found = Rack::NotFound.new(
  File.join(build_dir, '404.html')
)
run page_not_found
