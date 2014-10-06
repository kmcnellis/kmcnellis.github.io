all: jekyll

less:
	@echo "less>css"
	lessc css/master.less > css/master.css

jekyll: less
	jekyll build

serve: less
	jekyll serve --watch

guard: less
	bundler install
	guard --no-bundler-warning
