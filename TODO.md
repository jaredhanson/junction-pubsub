# To-Do List

## In Progress

- Research Owner User Cases, and implement or prioritize as needed.
  See: http://xmpp.org/extensions/xep-0060.html#owner

## High Priority

- Implement support for requesting specific items by ItemID
  See: 6.5.6 Returning Notifications Only
- Implement payloadParser middleware, with support for parsing payloads from
  publish and items stanzas.

## Medium Priority

- Add an 'id' attribute to outgoing message stanzas, and properly track any
  notification related errors that occur.
  See: 7.1.2 Success Case
  See: 12.3 Handling Notification-Related Errors
- Set 'type' attribute on outgoing message stanzas to 'headline'
  See: 12.6 Not Routing Events to Offline Storage
- Implement support for specifying options with a publish request
  See: 7.1.5 Publishing Options
- Return item-not-found errors in response to pubsub requests that do not match
  a route.

## Low Priority

- Implement support for retrieving subscriptions
  See: 5.6 Retrieve Subscriptions
- Implement support for retrieving affiliations
  See: 5.7 Retrieve Affiliations
- Implement support for configuring subscription options
  See: 6.3 Configure Subscription Options
- Implement support for requesting default subscription configuration options
  See: 6.4 Request Default Subscription Configuration Options
- Implement standard middleware to check for matching JIDs
  See: 6.1.3.1 JIDs Do Not Match
- Implement Jabber Search middleware
  See: 5.2 Discover Nodes
- Implement Result Set Management middleware
  See: 6.5.4 Returning Some Items
  See: 6.5.7 Requesting the Most Recent Items
- Implement SHIM middleware
  See: 7.1.2.4 Inclusion of Subscription ID
  See: 7.2.2.2 Inclusion of Subscription ID
  See: 12.15 Inclusion of SHIM Headers
- Implement Extended Stanza Addressing middleware
  See: XEP-0253 - Section 3. Notifications (http://xmpp.org/extensions/xep-0253.html)
  http://xmpp.org/extensions/xep-0033.html
- Research Microblogging over XMPP
  http://xmpp.org/extensions/xep-0277.html
- Research PubSub Chaining
  http://xmpp.org/extensions/xep-0253.html
- Research PubSub Queueing
  http://xmpp.org/extensions/xep-0254.html
