import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options


class LoginTest(unittest.TestCase):
    def setUp(self):
        chrome_options = Options()
        chrome_options.add_argument('--headless')
        chrome_options.add_argument('--no-sandbox')
        chrome_options.add_argument('--disable-dev-shm-usage')
        self.driver = webdriver.Chrome(options=chrome_options)
        self.driver.implicitly_wait(10)

    def tearDown(self):
        self.driver.quit()

    def test_login_page_loads(self):
        self.driver.get('http://localhost:8000/login')
        self.assertIn('login', self.driver.current_url)

    def test_login_success(self):
        self.driver.get('http://localhost:8000/login')
        self.driver.find_element(By.NAME, 'username').send_keys('testuser')
        self.driver.find_element(By.NAME, 'password').send_keys('testpass')
        self.driver.find_element(By.XPATH, '//button[@type="submit"]').click()
        self.assertIn('dashboard', self.driver.current_url)

    def test_login_failure(self):
        # TODO: implement login failure test
        pass

if __name__ == '__main__':
    unittest.main()
