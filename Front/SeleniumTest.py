import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import string 
import random

def get_random_string(length):
    characters = string.ascii_letters + string.digits
    return ''.join(random.choice(characters) for i in range(length))
# Start the Selenium WebDriver
driver = webdriver.Chrome()

# Open the registration page
driver.get("http://localhost:5173/")
print("Opened the registration page")

try:

    WebDriverWait(driver, 20).until(EC.presence_of_element_located((By.CSS_SELECTOR, "#root")))
    print("Signup button found")
    time.sleep(1)
    def type_with_delay(input_element, text, delay=0.2):
        for char in text:
            input_element.send_keys(char)
            time.sleep(delay)

    signup_window = driver.find_element(By.CSS_SELECTOR, "#Signup")
    print("Signup window found")
    print(signup_window.text)
    signup_window.click()

    first_name_input = driver.find_element(By.NAME, "name")
    print("First name input found")
    type_with_delay(first_name_input, "Achraf")

    phone_number_input = driver.find_element(By.NAME, "phoneNumber")
    print("Phone number input found")
    type_with_delay(phone_number_input, "0790060033")

    email_input = driver.find_element(By.NAME, "email")
    print("Email input found")
    type_with_delay(email_input, "achraf"+get_random_string(4)+"@gmail.com")

    password_input = driver.find_element(By.NAME, "password")
    print("Password input found")
    type_with_delay(password_input, get_random_string(10))

    sign_up_button = driver.find_element(By.ID, "submit")
    print("Sign up button found")
    sign_up_button.click()

    time.sleep(1)

except Exception as e:
    print(f"An error occurred: {e}")

finally:
    time.sleep(10)  