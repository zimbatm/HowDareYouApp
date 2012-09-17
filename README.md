How dare you !
==============

Simple Middleman + Heroku Cedar stack example.

The trick is to pre-compile the whole static site on slug compile time.
Then it's just a matter of distributing the files using thin and a smart
config.ru.

Installation
------------

```
> heroku create
> heroku config:add RACK_ENV=production
> git push heroku master
```

TODO
----

* Application icon (requirement for the FF market place. See
https://developer.mozilla.org/en-US/docs/Apps/Manifest?redirectlocale=en-US&redirectslug=Apps%2FThe_Manifest
)

http://nashape.com/blog/2012/09/12/big-favicons/

https://developer.mozilla.org/en-US/docs/DOM/Apps.install


NOTES
-----

iOS doesn't support caching sound files. See
http://stackoverflow.com/questions/9268023/can-you-cache-sound-files-in-an-ios-web-app-using-a-manifest-or-web-storage
