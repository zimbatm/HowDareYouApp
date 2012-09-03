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

* Manifest file
* Application icon
