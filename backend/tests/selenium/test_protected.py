import unittest
from selenium import webdriver

class ProtectedPageTest(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome()

    def test_redirect_if_not_logged_in(self):
        self.driver.get('http://localhost:8000/protected')
        self.assertIn('login', self.driver.current_url)

    def tearDown(self):
        self.driver.quit()
