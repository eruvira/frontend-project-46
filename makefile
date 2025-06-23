install:
	npm install

lint:
	npx eslint .

fix:
	npx eslint . --fix

link:
	npm link
	
test:
	npm test

ci:
	npm run lint && npm test


