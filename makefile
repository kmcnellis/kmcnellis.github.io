all: less

less:
	@echo "less>css"
	lessc css/master.less > css/master.css	
