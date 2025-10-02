from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    context = browser.new_context()
    page = context.new_page()
    page.goto("http://localhost:5173/")

    # --- Desktop View ---
    page.set_viewport_size({"width": 1920, "height": 1080})

    # Screenshot of the area between skills and projects
    page.evaluate("document.getElementById('projects').scrollIntoView()")
    page.wait_for_timeout(2000)
    page.screenshot(path="jules-scratch/verification/desktop_skills_projects_final.png")

    # Screenshot of the area between projects and certifications
    page.evaluate("document.getElementById('certificates').scrollIntoView()")
    page.wait_for_timeout(2000)
    page.screenshot(path="jules-scratch/verification/desktop_projects_certificates_final.png")

    # --- Mobile View ---
    page.set_viewport_size({"width": 375, "height": 812})

    # Screenshot of the ProfileCard in the hero section
    page.evaluate("document.getElementById('home').scrollIntoView()")
    page.wait_for_timeout(2000)
    page.screenshot(path="jules-scratch/verification/mobile_profile_card.png")

    # Screenshot of the area between skills and projects
    page.evaluate("document.getElementById('projects').scrollIntoView()")
    page.wait_for_timeout(2000)
    page.screenshot(path="jules-scratch/verification/mobile_skills_projects_final.png")

    # Screenshot of the area between projects and certifications
    page.evaluate("document.getElementById('certificates').scrollIntoView()")
    page.wait_for_timeout(2000)
    page.screenshot(path="jules-scratch/verification/mobile_projects_certificates_final.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)