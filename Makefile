
build: components index.js names.js
	@component build --dev

components: component.json
	@component install --dev

test: build
	@open test.html

clean:
	rm -fr build components template.js

.PHONY: clean test
