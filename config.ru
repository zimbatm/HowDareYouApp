#
# This is how Heroku is serving our files
#

top_dir = File.expand_path('..', __FILE__)

require 'rack/contrib/try_static'
require 'rack/contrib/not_found'
require 'rack/contrib/static_cache'
require 'rack/cache'

Rack::Mime::MIME_TYPES['.webapp'] = 'application/x-web-app-manifest+json'

# Middleman's config.rb has the same heuristic
build_dir = 'build'

# Don't send a body for HEAD requests
use Rack::Head

# Make sure we use the right host
if ENV['CANONICAL_HOST']
  require 'rack-canonical-host'
  use Rack::CanonicalHost, ENV['CANONICAL_HOST']
end

# Optional. Serve the website from RAM directly :)
use(Rack::Cache,
  :metastore    => 'heap:/',
  :entitystore  => 'heap:/',
  :default_ttl  => 3600,
  :allow_reload => false,
  :allow_revalidate => false,
  :cache_key => proc do |request|
    # Don't differentiate on hosts or query-string changes. Just the path.
    request.path_info.gsub('/', '-')
  end
)


# Compress pages on the fly if supported
# TODO: use the existing .gz extension if it exists
use Rack::Deflater

# Serve assets with long expirations.
# versioning is handled by middleman
use Rack::StaticCache, :root => build_dir, :urls => ["/images", "/stylesheets", "/javascripts"], :versioning => false

# First try to serve the static file
use Rack::TryStatic, :root => build_dir, :urls => %w[/], :try => ['index.html', '/index.html']

# If nothing else works, show a 404 page
page_not_found = Rack::NotFound.new(
  # FIXME: use a 404.html page
  File.join(build_dir, 'index.html')
)
page_not_found_with_revalidate = proc do |env|
  ret = page_not_found.call(env)
  ret[1]['Cache-Control'] = 'must-revalidate'
  ret
end
run page_not_found_with_revalidate
