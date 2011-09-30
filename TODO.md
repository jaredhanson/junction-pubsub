# To-Do List

## High Priority

- Implement support for requesting specific items by ItemID
  See: 6.5.6 Returning Notifications Only
- Implement payloadParser middleware, with support for parsing payloads from
  publish and items stanzas.

## Medium Priority

- Add an 'id' attribute to outgoing message stanzas, and properly track any
  notification related errors that occur.
  See: 7.1.2 Success Case
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
