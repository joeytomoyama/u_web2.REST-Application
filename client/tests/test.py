from selenium import webdriver
PATH="/bin/chromedriver"

# options = webdriver.ChromeOptions()
# options.add_argument('--ignore-certificate-errors')
driver=webdriver.Chrome()

driver.get("http://localhost:3000/")
# driver.get("https://google.com/")
driver.implicitly_wait(5)



driver.quit()