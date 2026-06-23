# fxp-cli thinks a file that isn't .xml cannot be xml 🙄
src/lib/assets/terms.json: static/terms.tbx
	deno run -A scripts/xml2json.ts -i "$<" -o "$@"

DEPS := src/lib/assets/terms.json

dev: $(DEPS)
	deno x vite dev

build: $(DEPS)
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
