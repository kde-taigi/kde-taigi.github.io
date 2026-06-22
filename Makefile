dev:
	dx vite dev

build:
	dx vite build

sync:
	dx svelte-kit sync

check: sync
	dx svelte-check --tsconfig ./tsconfig.json

check.watch: sync
	dx svelte-check --tsconfig ./tsconfig.json --watch

lint:
	dx prettier --check .

format:
	dx prettier --write .
