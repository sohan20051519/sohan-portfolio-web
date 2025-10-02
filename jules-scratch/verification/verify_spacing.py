from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    context = browser.new_context()
    page = context.new_page()
    page.goto("http://localhost:5173/")

    # Scroll to the projects section to ensure the gap is in view
    projects_section = page.locator("#projects")
    projects_section.scroll_into_view_if_needed()

    # Wait for any animations to complete
    page.wait_for_timeout(2000)

    page.screenshot(path="jules-scratch/verification/desktop_view_updated.png")

    # Emulate mobile view
    page.set_viewport_size({"width": 375, "height": 812})

    # Scroll to the projects section again for mobile view
    projects_section.scroll_into_view_if_needed()

    # Wait for any animations to complete
    page.wait_for_timeout(2000)

    page.screenshot(path="jules-scratch/verification/mobile_view_updated.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)