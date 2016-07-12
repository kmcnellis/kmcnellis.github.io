.PHONY: all less jekyll serve guard build install
all: install build

serve: live

live:
	grunt serve

build:
	grunt build

install:
	gem install bundler
	bundle install

	npm install -g grunt-cli
	npm install
