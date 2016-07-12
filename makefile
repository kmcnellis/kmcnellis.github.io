.PHONY: all less jekyll serve guard build install
all: jekyll

jekyll:
	jekyll build

serve:
	jekyll serve --watch

live:
	grunt serve

build:
	grunt build

install:
	gem install bundler
	bundle install

	npm install -g grunt-cli
	npm install
