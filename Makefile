# For more information: https://gjs.guide/extensions/development/typescript.html#build-and-packaging-automation
NAME=disable-touchpad-gestures
UUID=$(shell cat src/metadata.json | jq -r '.uuid')

.PHONY: all pack install clean

all: dist/extension.js

node_modules: package.json
	npm install

dist/extension.js dist/prefs.js: node_modules
	npx tsc

schemas/gschemas.compiled: src/schemas/org.gnome.shell.extensions.$(NAME).gschema.xml
	glib-compile-schemas src/schemas

$(NAME).zip: dist/extension.js dist/prefs.js schemas/gschemas.compiled
	@cp -r src/schemas dist/
	@cp src/metadata.json dist/
	@(cd dist && zip ../$(NAME).zip -9r .)

pack: $(NAME).zip

install: $(NAME).zip
	@touch ~/.local/share/gnome-shell/extensions/${UUID}
	@rm -rf ~/.local/share/gnome-shell/extensions/${UUID}
	@mv dist ~/.local/share/gnome-shell/extensions/${UUID}

uninstall:
	@rm -rf ~/.local/share/gnome-shell/extensions/${UUID}

clean:
	@rm -rf dist node_modules $(NAME).zip

test:
	@dbus-run-session -- gnome-shell --nested --wayland