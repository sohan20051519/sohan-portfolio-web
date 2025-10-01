from playwright.sync_api import sync_playwright, expect

def run(playwright):
    # Launch browser
    browser = playwright.chromium.launch(headless=True)

    # Set mobile viewport
    context = browser.new_context(
        viewport={'width': 375, 'height': 812}, # Using a common iPhone viewport
        is_mobile=True,
        user_agent='Mozilla/5.0 (iPhone; CPU iPhone OS 13_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Mobile/15E148 Safari/604.1'
    )
    page = context.new_page()

    try:
        # Navigate to the local development server
        page.goto("http://localhost:5173", wait_until="networkidle")

        # --- Hero Section Verification ---
        hero_section = page.locator("section#home")
        expect(hero_section).to_be_visible(timeout=15000)
        page.wait_for_timeout(1000) # Wait for animations to settle
        page.screenshot(path="jules-scratch/verification/01_hero_section.png")
        print("Hero section screenshot taken successfully.")

        # --- Professional Summary Verification ---
        summary_section = page.locator("section#about")
        summary_section.scroll_into_view_if_needed()
        page.wait_for_timeout(3000) # Increased wait for decryption animation

        # Locate the specific card
        summary_card = summary_section.locator("div.text-center > .glass")
        expect(summary_card).to_be_visible()
        summary_card.screenshot(path="jules-scratch/verification/02_summary_section.png")
        print("Professional Summary screenshot taken successfully.")

        # --- Continuous Learning Verification ---
        learning_section = page.locator("section#certificates")
        learning_section.scroll_into_view_if_needed()
        page.wait_for_timeout(500)

        # Locate the specific card
        learning_card = learning_section.locator("div.text-center > .glass")
        expect(learning_card).to_be_visible()
        learning_card.screenshot(path="jules-scratch/verification/03_learning_section.png")
        print("Continuous Learning screenshot taken successfully.")

    except Exception as e:
        print(f"An error occurred: {e}")

    finally:
        # Clean up
        context.close()
        browser.close()

with sync_playwright() as playwright:
    run(playwright)