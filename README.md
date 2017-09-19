# Junction/PubSub

[XMPP](http://xmpp.org/) [Publish-Subscribe](http://xmpp.org/extensions/xep-0060.html)
framework for [Node](http://nodejs.org), built on [Junction](http://github.com/jaredhanson/junction).

Junction/PubSub is a minimalist framework layered on top of Junction, providing
robust tooling to applications that need publish-subscribe functionality.  The
Junction/PubSub architecture is modeled upon the proven pairing of
[Connect](http://www.senchalabs.org/connect/) + [Express](http://expressjs.com/),
making development of XMPP applications as simple as that of web applications.

## Usage

#### Create an Application

To create a new application, simply invoke `pubsub()`.

    var app = pubsub();

#### Routing

Junction/PubSub uses the name of the `<pubsub/>` child element to provide a
routing API.  For example, an entity may wish to publish to a node:

    app.publish('princely_musings', function(req, res, next) {
      // publish item
    });

#### Mount and Connect to XMPP Network

Publish-Subscribe is a protocol that runs over XMPP, along side other extension
protocols.  Because of this, the pub-sub `app` is typically mounted as a sub-app
of larger XMPP application.

    var xmpp = junction()
      .use(junction.logger())
      .use(app);  // use pubsub app in larger XMPP app

    xmpp.connect({ jid: 'user@jabber.org', password: 's3cr3t' });

## Tests

    $ npm install --dev
    $ make test

[![Build Status](https://secure.travis-ci.org/jaredhanson/junction-pubsub.png)](http://travis-ci.org/jaredhanson/junction-pubsub)

## Credits

  - [Jared Hanson](http://github.com/jaredhanson)

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2011-2017 Jared Hanson <[http://jaredhanson.net/](http://jaredhanson.net/)>

<a target='_blank' rel='nofollow' href='https://app.codesponsor.io/link/vK9dyjRnnWsMzzJTQ57fRJpH/jaredhanson/junction-pubsub'>  <img alt='Sponsor' width='888' height='68' src='https://app.codesponsor.io/embed/vK9dyjRnnWsMzzJTQ57fRJpH/jaredhanson/junction-pubsub.svg' /></a>
