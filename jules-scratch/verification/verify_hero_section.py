from playwright.sync_api import sync_playwright, expect

def run(playwright):
    # Launch browser
    browser = playwright.chromium.launch(headless=True)

    # Set mobile viewport
    context = browser.new_context(
        viewport={'width': 375, 'height': 667},
        is_mobile=True,
        user_agent='Mozilla/5.0 (iPhone; CPU iPhone OS 13_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Mobile/15E148 Safari/604.1'
    )
    page = context.new_page()

    try:
        # Navigate to the local development server
        page.goto("http://localhost:5173")

        # Wait for the hero section to be visible
        hero_section = page.locator("section#home")
        expect(hero_section).to_be_visible(timeout=10000)

        # Wait for animations to complete
        page.wait_for_timeout(1000)

        # Take a screenshot
        page.screenshot(path="jules-scratch/verification/verification.png")
        print("Screenshot taken successfully.")

    except Exception as e:
        print(f"An error occurred: {e}")

    finally:
        # Clean up
        context.close()
        browser.close()

with sync_playwright() as playwright:
    run(playwright)