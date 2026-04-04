from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import pytest

def test_navigation_home(driver):
    """Verifica que la página de inicio carga y los botones de rol están presentes."""
    driver.get("http://localhost:4200")
    
    # Check buttons exist
    btn_admin = driver.find_element(By.ID, "btn-go-admin")
    btn_cashier = driver.find_element(By.ID, "btn-go-cashier")
    
    # Flexible assertion for the title
    assert "Sistema" in driver.page_source
    driver.save_screenshot("screenshots/home_page.png")

def test_crud_rutas_happy_path(driver):
    """Camino feliz: Crear una nueva ruta de tránsito."""
    driver.get("http://localhost:4200/admin/rutas")
    wait = WebDriverWait(driver, 10)
    
    # Click 'Nueva Ruta'
    btn_new = wait.until(EC.element_to_be_clickable((By.ID, "btn-new-route")))
    btn_new.click()
    
    # Wait for modal and fill form
    wait.until(EC.visibility_of_element_located((By.ID, "input-name"))).send_keys("Ruta Selenium Express")
    driver.find_element(By.ID, "input-origin").send_keys("Santo Domingo")
    driver.find_element(By.ID, "input-destination").send_keys("Santiago")
    
    price_input = driver.find_element(By.ID, "input-price")
    price_input.clear()
    price_input.send_keys("500")
    
    # Save
    btn_save = wait.until(EC.element_to_be_clickable((By.ID, "btn-save-route")))
    btn_save.click()
    
    # Verify in table
    time.sleep(3) # Wait for API and UI refresh
    assert "Ruta Selenium Express" in driver.page_source
    driver.save_screenshot("screenshots/ruta_creada_ok.png")

def test_crud_rutas_negative_empty(driver):
    """Prueba negativa: Intentar guardar sin datos (botón debería estar deshabilitado)."""
    driver.get("http://localhost:4200/admin/rutas")
    wait = WebDriverWait(driver, 10)
    
    wait.until(EC.element_to_be_clickable((By.ID, "btn-new-route"))).click()
    
    # Wait for modal
    btn_save = wait.until(EC.presence_of_element_located((By.ID, "btn-save-route")))
    
    # Verify button is disabled (Angular [disabled]="...")
    assert not btn_save.is_enabled()
    driver.save_screenshot("screenshots/ruta_negativa_error.png")

def test_cajero_registro_ticket(driver):
    """Prueba funcional: El cajero registra un pasaje para una ruta existente."""
    driver.get("http://localhost:4200/cajero")
    wait = WebDriverWait(driver, 15)
    
    # Wait for routes to load (search for an option)
    wait.until(EC.presence_of_element_located((By.ID, "select-route")))
    time.sleep(2) # Extra time for async load
    
    # Select first route in dropdown
    select = driver.find_element(By.ID, "select-route")
    options = select.find_elements(By.TAG_NAME, "option")
    
    if len(options) <= 1:
        # If no routes yet, let's create one first or skip gracefully
        pytest.skip("No routes available for cashier test")
        
    options[1].click() # The first real route
    
    # Fill passenger info
    driver.find_element(By.ID, "input-passenger-name").send_keys("Pasajero Selenium")
    driver.find_element(By.ID, "input-passenger-document").send_keys("123-4567890-1")
    
    # Register
    btn_reg = wait.until(EC.element_to_be_clickable((By.ID, "btn-register-voyage")))
    btn_reg.click()
    
    # Check history
    time.sleep(3)
    assert "Pasajero Selenium" in driver.page_source
    driver.save_screenshot("screenshots/ticket_registrado_ok.png")
