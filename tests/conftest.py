from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import pytest
import os

@pytest.fixture
def driver():
    # Setup Chrome options if needed (e.g. headless)
    options = webdriver.ChromeOptions()
    # options.add_argument("--headless") 
    
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
    driver.maximize_window()
    driver.implicitly_wait(10) # Wait for elements to appear
    yield driver
    driver.quit()

@pytest.hookimpl(tryfirst=True, hookwrapper=True)
def pytest_runtest_makereport(item, call):
    # This setup allows us to take screenshots on failure
    outcome = yield
    rep = outcome.get_result()
    if rep.when == 'call' and rep.failed:
        mode = 'a' if os.path.exists('failures.txt') else 'w'
        try:
            driver = item.funcargs['driver']
            screenshot_path = f"screenshots/{item.name}_failed.png"
            driver.save_screenshot(screenshot_path)
            print(f"Screenshot saved to {screenshot_path}")
        except Exception as e:
            print(f"Fail to take screenshot: {e}")
