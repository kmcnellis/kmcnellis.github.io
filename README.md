My personal website - view at [kmcnellis.com](http://www.kmcnellis.com)
Currently a work in progress

To run locally:

To compile less into css:
```
make less

# or

lessc css/master.less > css/master.css
```
Using live reload:
```
make guard

# or

bundler install
guard
```
Using jekyll to serve the webpages:
```
make serve

# or

jekyll serve --watch
```
To just build:
```
make jekyll

#or

jekyll build
```
To use less instead of css, uncomment 
