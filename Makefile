.PHONY: help
help:
	@echo "---------Available options:-------------"
	@echo "run-dev: it will put the container up"
	@echo "stop: it will stop the containers"

.PHONY: run-dev
run-dev:
	docker-compose up -d --build --force-recreate

.PHONY: stop
stop:
	docker-compose down

.PHONY: lint
lint:
	docker-compose -f docker-compose-lint.yaml up
