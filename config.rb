###
# Helpers
###

# Automatic image dimensions on image_tag helper
activate :automatic_image_sizes

activate :s3_sync do |s3_sync|
  s3_sync.bucket                     = 'howdareyouapp.com'
  s3_sync.region                     = 'us-east-1'
  s3_sync.aws_access_key_id          = ENV['AWS_ACCESS_KEY_ID']
  s3_sync.aws_secret_access_key      = ENV['AWS_SECRET_ACCESS_KEY']
  # We delete stray files by default.
  s3_sync.delete                     = false
  # We chain after the build step by default. This may not be your desired behavior...
  s3_sync.after_build                = false
  s3_sync.prefer_gzip                = false
  s3_sync.reduced_redundancy_storage = false
end

# Version of HowDareYouApp
set :my_version, '1.2'

set :css_dir, 'stylesheets'

set :js_dir, 'javascripts'

set :images_dir, 'images'

# Build-specific configuration
configure :build do
  # For example, change the Compass output style for deployment
  activate :minify_css

  # Minify Javascript on build
  activate :minify_javascript

  # Cache invalidation
  #activate :cache_buster
  #
  activate :asset_hash

  # Use relative URLs
  # activate :relative_assets

  # Compress PNGs after build
  # First: gem install middleman-smusher
  # require "middleman-smusher"
  # activate :smusher

  # Compress files
  #activate :gzip

  # Or use a different image path
  # set :http_path, "/Content/images/"
end
