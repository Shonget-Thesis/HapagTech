import unittest
from selenium import webdriver

class RegisterTest(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome()

    def test_register_success(self):
        self.driver.get('http://localhost:8000/register')
        self.driver.find_element(By.NAME, 'username').send_keys('newuser')
        self.driver.find_element(By.NAME, 'password').send_keys('newpass')
        self.driver.find_element(By.NAME, 'confirm_password').send_keys('newpass')
        self.driver.find_element(By.XPATH, '//button[@type="submit"]').click()
        self.assertIn('login', self.driver.current_url)

    def test_register_failure(self):
        self.driver.get('http://localhost:8000/register')
        self.driver.find_element(By.NAME, 'username').send_keys('')
        self.driver.find_element(By.NAME, 'password').send_keys('')
        self.driver.find_element(By.NAME, 'confirm_password').send_keys('')
        self.driver.find_element(By.XPATH, '//button[@type="submit"]').click()
        self.assertIn('register', self.driver.current_url)

    def tearDown(self):
        self.driver.quit()
