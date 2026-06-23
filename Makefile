dev:
	deno x vite dev

build:
	deno x vite build

sync:
	deno x svelte-kit sync

check: sync
	deno x svelte-check --tsconfig ./tsconfig.json

check.watch: sync
	deno x svelte-check --tsconfig ./tsconfig.json --watch

lint:
	deno x prettier --check .

format:
	deno x prettier --write .
