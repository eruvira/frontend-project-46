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

gendiff:
	node bin/gendiff.js __fixtures__/file1.json __fixtures__/file2.json --format json

gendiff-yaml:
	node bin/gendiff.js __fixtures__/file1.yml __fixtures__/file2.yml




