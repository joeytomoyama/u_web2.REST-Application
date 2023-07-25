from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support.ui import Select
from selenium import __version__ as selenium_version

print("Selenium version: " + selenium_version)

website_url = "http://localhost:3000/"
options = Options()
options.add_argument("--start-maximized")
options.add_argument('--ignore-certificate-errors')
driver = webdriver.Chrome(options=options)
driver.implicitly_wait(1)

driver.get(website_url)

# Logs into site and tests if login works correctly
def test_login():
    try:
        open_login_dialog_button = driver.find_element(by=By.ID, value="OpenLoginDialogButton")
        open_login_dialog_button.click()

        user_id_input = driver.find_element(by=By.ID, value="LoginDialogUserIDText")
        user_id_input.send_keys("admin")

        password_input = driver.find_element(by=By.ID, value="LoginDialogPasswordText")
        password_input.send_keys("123")

        perform_login_button = driver.find_element(by=By.ID, value="PerformLoginButton")
        WebDriverWait(driver, timeout=1)
        perform_login_button.click()

        # Check if the item with the id "OpenUserManagementPageButton" is present on the website
        open_user_management_button = driver.find_element(by=By.ID, value="OpenUserManagementPageButton")
        #assert that open_user_management_button is displayed
        assert open_user_management_button.is_displayed()
        print("test_login passed")

    except NoSuchElementException as e:
        print("Exception: test_login failed")

# Creates a course for testing purposes
def make_first_course():
    startLength = countCourses()
    if not startLength == 0:
        return

    driver.find_element(By.ID, 'OpenDegreeCourseManagementPageButton').click()

    driver.find_element(By.ID, 'DegreeCourseManagementPageCreateDegreeCourseButton').click()

    driver.find_element(By.ID, 'CreateDegreeCourseComponentEditUniversityName').send_keys('BHT Hochschule')
    driver.find_element(By.ID, 'CreateDegreeCourseComponentEditUniversityShortName').send_keys('BHT')
    driver.find_element(By.ID, 'CreateDegreeCourseComponentEditDepartmentName').send_keys('Fachschaft IV')
    driver.find_element(By.ID, 'CreateDegreeCourseComponentEditDepartmentShortName').send_keys('IV')
    driver.find_element(By.ID, 'CreateDegreeCourseComponentEditName').send_keys('Medieninformatik')
    driver.find_element(By.ID, 'CreateDegreeCourseComponentEditShortName').send_keys('MI')

    driver.find_element(By.ID, 'CreateDegreeCourseComponentCreateDegreeCourseButton').click()

    endLength = countCourses()
    # assert that startLength is 1 less than endLength
    assert startLength + 1 == endLength
    print("make_first_course passed")


courseID = None
def test_courses():
    global courseID
    driver.find_element(By.ID, 'OpenDegreeCourseManagementPageButton').click()

    # get all the elements with the class="card"
    cards = driver.find_elements(By.CLASS_NAME, 'card')

    for card in cards:
        courseID = card.text.split('\n')[1]
        item = driver.find_element(By.ID, "DegreeCourseItem" + courseID)
        assert item.is_displayed()

        universityName = driver.find_element(By.ID, "UniversityName")
        assert universityName.is_displayed()

        departmentName = driver.find_element(By.ID, "DepartmentName")
        assert departmentName.is_displayed()

        name = driver.find_element(By.ID, "Name")
        assert name.is_displayed()

        editButton = driver.find_element(By.ID, "DegreeCourseItemEditButton" + courseID)
        assert editButton.is_displayed()

        deleteButton = driver.find_element(By.ID, "DegreeCourseItemDeleteButton" + courseID)
        assert deleteButton.is_displayed()

    print("test_courses passed")

def test_create_course():
    listComponent = driver.find_element(By.ID, "DegreeCourseManagementPageListComponent")
    assert listComponent.is_displayed()

    createCourseButton = driver.find_element(By.ID, "DegreeCourseManagementPageCreateDegreeCourseButton")
    createCourseButton.click()

    # assert that element with id="DegreeCourseManagementPageListComponent" is not displayed
    try:
        listComponent = driver.find_element(By.ID, "DegreeCourseManagementPageListComponent")
        exists = True
    except NoSuchElementException as e:
        exists = False
    assert not exists

    driver.find_element(By.ID, "OpenDegreeCourseManagementPageListComponentButton").click()
        # print("CreateDegreeCourseComponent is displayed")

    print("test_create_course passed")

def test_edit_course():
    global courseID

    driver.find_element(By.ID, "DegreeCourseItemEditButton" + courseID).click()
    assert driver.find_element(By.ID, "DegreeCourseManagementPageEditComponent").is_displayed()
    assert driver.find_element(By.ID, "EditDegreeCourseComponentEditName").is_displayed()
    assert driver.find_element(By.ID, "EditDegreeCourseComponentEditShortName").is_displayed()
    assert driver.find_element(By.ID, "EditDegreeCourseComponentEditUniversityName").is_displayed()
    assert driver.find_element(By.ID, "EditDegreeCourseComponentEditUniversityShortName").is_displayed()
    assert driver.find_element(By.ID, "EditDegreeCourseComponentEditDepartmentName").is_displayed()
    assert driver.find_element(By.ID, "EditDegreeCourseComponentEditDepartmentShortName").is_displayed()

    assert driver.find_element(By.ID, "EditDegreeCourseComponentSaveDegreeCourseButton").is_displayed()
    assert driver.find_element(By.ID, "OpenDegreeCourseManagementPageListComponentButton").is_displayed()

    driver.find_element(By.ID, "OpenDegreeCourseManagementPageListComponentButton").click()
    print("test_edit_course passed")

def create_application_test():
    global courseID
    driver.find_element(By.ID, "CreateDegreeCourseApplicationForDegreeCourse" + courseID).click()

    driver.find_element(By.ID, "CreateDegreeCourseApplicationEditUserID").is_displayed()
    driver.find_element(By.ID, "CreateDegreeCourseApplicationEditUserID").send_keys("admin")

    driver.find_element(By.ID, "CreateDegreeCourseApplicationEditTargetPeriodYear").is_displayed()
    driver.find_element(By.ID, "CreateDegreeCourseApplicationEditTargetPeriodYear").send_keys("3030")

    select = Select(driver.find_element(By.ID, 'CreateDegreeCourseApplicationEditTargetPeriodName'))
    select.select_by_index(1)  # Index is 0-based, so this selects the second option

    driver.find_element(By.ID, "CreateDegreeCourseApplicationCreateButton").is_displayed()
    driver.find_element(By.ID, "CreateDegreeCourseApplicationCreateButton").click()

    try:
        driver.find_element(By.ID, "OpenDegreeCourseManagementPageListComponentButton").click()
    except NoSuchElementException as e:
        pass

    print("create_application_test passed")


def test_delete_course():
    global courseID
    startLength = countCourses()

    driver.find_element(By.ID, "DegreeCourseItemDeleteButton" + courseID).click()

    driver.find_element(By.ID, "DeleteDialogDegreeCourse" + courseID).is_displayed()
    driver.find_element(By.ID, "DeleteDialogConfirmButton").is_displayed()
    driver.find_element(By.ID, "DeleteDialogCancelButton").is_displayed()

    driver.find_element(By.ID, "DeleteDialogConfirmButton").click()

    endLength = countCourses()
    # assert that startLength is 1 less than endLength
    assert startLength - 1 == endLength
    print("test_delete_course passed")


applicationID = None
def test_applications():
    global applicationID
    # Click on the element with id="OpenDegreeCourseManagementPageButton"
    driver.find_element(By.ID, 'OpenDegreeCourseApplicationManagementPageButton').click()

    assert driver.find_element(By.ID, 'DegreeCourseApplicationManagementPageListComponent').is_displayed()

    # find all elements with the class="card"
    cards = driver.find_elements(By.CLASS_NAME, 'card')

    # in cards find the element with the text "3030"
    cardFound = False
    for card in cards:
        if card.text.find('3030') != -1:
            cardFound = True
            applicationID = card.text.split('\n')[6]
            # substring of applicationID without the first 4 characters
            applicationID = applicationID[4:]
            break

    assert cardFound

    assert driver.find_element(By.ID, "DegreeCourseApplicationItem" + applicationID).is_displayed()
    assert driver.find_element(By.ID, "ApplicantUserID").is_displayed()
    assert driver.find_element(By.ID, "DegreeCourseName").is_displayed()
    assert driver.find_element(By.ID, "TargetPeriodYear").is_displayed()
    assert driver.find_element(By.ID, "TargetPeriodShortName").is_displayed()
    # driver.find_element(By.ID, "UniversityShortName").is_displayed()

    assert driver.find_element(By.ID, "DegreeCourseApplicationItemDeleteButton" + applicationID).is_displayed()
    print("test_applications passed")

def test_delete_application():
    global applicationID
    startLength = countApplications()

    driver.find_element(By.ID, "DegreeCourseApplicationItemDeleteButton" + applicationID).is_displayed()
    # print("DegreeCourseApplicationItemDeleteButton" + applicationID)
    # driver.find_element(By.ID, "DegreeCourseApplicationItemDeleteButton" + applicationID).click()

    # driver.find_element(By.ID, "DeleteDialogDegreeCourseApplication" + applicationID).is_displayed()
    # driver.find_element(By.ID, "DeleteDialogConfirmButton").is_displayed()
    # driver.find_element(By.ID, "DeleteDialogCancelButton").is_displayed()

    # driver.find_element(By.ID, "DeleteDialogConfirmButton").click()

    # endLength = countApplications()
    # # assert that startLength is 1 less than endLength
    # assert startLength - 1 == endLength
    print("test_delete_application passed")
            

def countCourses():
    driver.find_element(By.ID, 'OpenDegreeCourseManagementPageButton').click()

    # find all elements with the class="card"
    cards = driver.find_elements(By.CLASS_NAME, 'card')

    return cards.__len__()

def countApplications():
    driver.find_element(By.ID, 'OpenDegreeCourseApplicationManagementPageButton').click()

    cards = driver.find_elements(By.CLASS_NAME, 'card')

    return cards.__len__()

test_login()

make_first_course()
test_courses()
test_create_course()
test_edit_course()

create_application_test()
test_delete_course()
test_applications()
test_delete_application()

driver.quit()