import unittest
from selenium import webdriver

class ValidationTest(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome()

    def test_form_validation_errors(self):
        self.driver.get('http://localhost:8000/register')
        self.driver.find_element(By.NAME, 'username').send_keys('')
        self.driver.find_element(By.NAME, 'password').send_keys('')
        self.driver.find_element(By.NAME, 'confirm_password').send_keys('')
        self.driver.find_element(By.XPATH, '//button[@type="submit"]').click()
        self.assertIn('register', self.driver.current_url)

    def tearDown(self):
        self.driver.quit()
