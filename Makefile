SHELL:=/bin/bash
PORT=3000
DOCKER_IMG=hugo-webpack
DOCKER_CWD=/usr/src/app
DOCKER_RUN="docker run --rm -p ${PORT}:${PORT} -v ${PWD}/site:${DOCKER_CWD}/site -v ${PWD}/src:${DOCKER_CWD}/src -v ${PWD}/dist:${DOCKER_CWD}/dist ${DOCKER_IMG}"

clean:
	rm -rf dist

build:
	docker build -f Dockerfile -t ${DOCKER_IMG} .

serve-dev:
	@eval $(DOCKER_RUN) npm run serve-dev

serve-prod:
	@eval $(DOCKER_RUN) npm run serve-prod

dist:
	@eval $(DOCKER_RUN) npm run build

lint:
	@eval $(DOCKER_RUN) npm run lint --silent
	@eval $(DOCKER_RUN) npm run stylelint --silent

dev: build serve-dev

serve: build serve-prod

release: clean build lint dist
