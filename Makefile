NODE = node
TEST = vows
#TESTS ?= test/*-test.js test/**/*-test.js
TESTS ?= test/**/*-test.js

test:
	@NODE_ENV=test NODE_PATH=lib $(TEST) $(TEST_FLAGS) $(TESTS)

docs: docs/api.html

docs/api.html: lib/junction-pubsub/*.js
	dox \
		--title Junction/PubSub \
		--desc "Publish-Subscribe development framework for Junction" \
		$(shell find lib/junction-pubsub/* -type f) > $@

docclean:
	rm -f docs/*.{1,html}

.PHONY: test docs docclean
