# Gifts 6-month Plan

## Application Overview

Test plan for the Gift subscription page targeting the URL https://www.scentbird.com/gift?months=6.

Assumptions / starting state:
- Tests run from a fresh browser profile (no prior cookies, sessions, or local storage) unless otherwise specified.
- Network connectivity is available, except in negative tests that explicitly simulate network failures.
- User roles: Guest (not authenticated) and Authenticated (existing test account).

Goals:
- Check the flow of the process for issuing a 6-month gift subscription (without a purchase scenario)
- Cover form validation, error states, and input boundaries.
- Verify pricing and analytics events.
- Cover responsive layout and accessibility.
- Cover edge cases (URL tampering, network failures, session expiry).

Target file: specs/gifts-6month-plan.md

## Test Scenarios

### 1. Gift 6-month page tests

#### 1.1. Happy path - Guest flow using Gift Recipients information: Email Address

**Steps:**
  1. Open browser with a fresh profile.
  2. Navigate to https://www.scentbird.com/gift?months=6.
  3. Verify page loads and shows correct content with price.
  4. Select Gift Recipients information option: Email Address (default).
  5. Enter valid recipient name and email.
  6. Write a short personal message (should be optional).
  7. Choose scent preference (Perfume(default)/Cologne).
  8. Enter sender name (Who is it from?). Should be optional.
  9. Ensure "Send right now" is selected; if choosing later, pick a valid date in the future.
  10. Click "PAY FOR YOUR ORDER".
  11. Check "Your cart total" modal window (Item, price)
  12. Check a gift for a free subscription for yourself in your customer card (accept/reject)
  13. Check redirect to register/login page (check redirect parameter: redirect=%2Fsubscription%2Fpayment)

**Expected Results:**
  - Page loads successfully (200) and essential UI elements visible: recipient fields, amount, "Pay for your order" button.
  - Form accepts valid inputs and no inline validation errors appear.
  - Cart and site state reflect actual order; no residual errors.
  - Success criteria: tester can reproduce flow. Failure: the tester cannot reproduce the flow (for example: required fields are blocked without a clear validation message or other errors not provided for in this flow).

#### 1.2. Happy path - Authenticated user flow using Gift Recipients information: Email Address.

**Steps:**
  1. Log in with a test account (or start with cookie/session to simulate logged-in state).
  2. Navigate to https://www.scentbird.com/gift?months=6.
  3. Verify logged-in header and that the user is logged-in.
  4. Fill recipient details as in guest flow 1.1.
  5. Click "PAY FOR YOUR ORDER".
  6. Check "Your cart total" modal window (Item, price)
  7. Check a gift for a free subscription for "new user" in your customer card (accept/reject)
  8. Check redirect to the /subscription/payment page.

**Expected Results:**
  - Logged-in UI visible.
  - Order is associated with authenticated account.
  - Page loads successfully (200) and essential UI elements visible: recipient fields, amount, "Pay for your order" button.
  - Form accepts valid inputs and no inline validation errors appear.
  - Cart and site state reflect actual order; no residual errors.
  - Success criteria: tester can reproduce flow. Failure: the tester cannot reproduce the flow (for example: required fields are blocked without a clear validation message or other errors not provided for in this flow).

#### 1.3. Form validation - Gift Recipients information: Email Address. Required fields.

**Steps:**
  1. Open https://www.scentbird.com/gift?months=6 with fresh profile.
  2. Leave recipient name/email blank and enter invalid recipient email formats (e.g., "no-at", "@no-domain", "test@domain").
  3. Attempt to click "PAY FOR YOUR ORDER" after each invalid input.

**Expected Results:**
  - The form shows inline validation messages for required fields and invalid email formats.
  - You cannot proceed to the next step of the flow until required fields are valid.
  - Success criteria: validation messages are descriptive and prevent submission. Failure: form submits with invalid or missing required info.

#### 1.4. Happy path - Guest flow using Gift Recipients information: Share link.

**Steps:**
  1. Open browser with a fresh profile.
  2. Navigate to https://www.scentbird.com/gift?months=6.
  3. Verify page loads and shows correct content with price.
  4. Select Gift Recipients information option: Share link.
  5. Verify: Recipient's name/email fields, "Write a personal message" textinput, "What type of scent does this person prefer?", "When would you like to send it?" blocks are hidden.
  6. Сheck the new text block with a hint that appeared on the page.
  7. Enter sender name (Who is it from?). Should be optional.
  8. Proceed to click "PAY FOR YOUR ORDER"
  9. Check "Your cart total" modal window (Item, price)
  10. Check a gift for a free subscription for yourself in your customer card (accept/reject)
  11. Check redirect to register/login page (check redirect parameter: redirect=%2Fsubscription%2Fpayment)

**Expected Results:**
  - When "Share link" selected, email, name and text input is not visibled and UI updates to show share link instructions.
  - Success criteria: tester can reproduce flow. Failure: the tester cannot reproduce the flow (for example: required fields are blocked without a clear validation message or other errors not provided for in this flow).

  #### 1.5. Happy path - Authenticated user flow using Gift Recipients information: Share link

**Steps:**
  1. Log in with a test account (or start with cookie/session to simulate logged-in state).
  2. Navigate to https://www.scentbird.com/gift?months=6.
  3. Verify logged-in header and that the user is logged-in.
  4. Fill recipient details as in guest flow 1.4.
  5. Click "PAY FOR YOUR ORDER".
  6. Check "Your cart total" modal window (Item, price)
  7. Check a gift for a free subscription for "new user" in your customer card (accept/reject)
  8. Check redirect to the /subscription/payment page.

**Expected Results:**
  - When "Share link" selected, email, name and text input is not visibled and UI updates to show share link instructions.
  - Success criteria: tester can reproduce flow. Failure: the tester cannot reproduce the flow (for example: required fields are blocked without a clear validation message or other errors not provided for in this flow).

#### 1.6. Check the “When would you like to send it?” field - Select a later date to send.

**Steps:**
1. Open browser with a fresh profile.
  2. Navigate to https://www.scentbird.com/gift?months=6.
  3. Verify page loads and shows correct content with price.
  4. Select Gift Recipients information option: Email Address (default).
  5. Enter valid recipient name and email.
  6. Write a short personal message (should be optional).
  7. Choose scent preference (Perfume(default)/Cologne).
  8. Enter sender name (Who is it from?). Should be optional.
  9. Set “When would you like to send it?” to "Choose a later date to send"

**Expected Results:**
  - The user should not be able to set and approve a date in the past or set empty values.

#### 1.7. Boundary - gift message ("Write a personal message") character limits

**Steps:**
  1. Open the page.
  2. Locate the personal message textbox.
  3. Enter message at: 1) zero chars, 2) typical length (~200 chars), 3) maximum allowed chars (it looks like there is no length validation), and 4) one character beyond maximum.
  4. Attempt to submit the form for each case.

**Expected Results:**
  - Zero-value characters are allowed — the field is optional;
  - Typical length accepted with no truncation.
  - At maximum allowed characters the field accepts input and storing/transmission works.
  - Beyond maximum the UI either prevents additional typing or shows a validation error with clear guidance.
  - Success criteria: message limits enforced gracefully and preserved through checkout. Failure: message truncation without notice or server rejection after submission.

  #### 1.8. Boundary - Recipient's name character limits

**Steps:**
  1. Open the page.
  2. Locate the Recipient's name textbox.
  3. Enter message at: 1) zero chars, 2) typical length (~20 chars with spaces), 3) maximum allowed chars, and 4) one character beyond maximum.
  4. Attempt to submit the form for each case.

**Expected Results:**
  - Validation shows required;
  - Typical length accepted with no truncation.
  - At maximum allowed characters the field accepts input and storing/transmission works.
  - Beyond maximum the UI either prevents additional typing or shows a validation error with clear guidance.
  - Success criteria: message limits enforced gracefully and preserved through checkout. Failure: message truncation without notice or server rejection after submission. 
  BUG_1 - Recipient's name character limit. Somthing went wrong. No error handling from Graphql

  #### 1.9. Boundary - sender ("Who is it from?") character limits. Check both Gift Recipients information (Email Address, Share Link).

**Steps:**
  1. Open the page.
  2. Locate the "Who is it from?" textbox.
  3. Enter message at: 1) zero chars, 2) typical length (~20 chars with spaces), 3) maximum allowed chars (it looks like there is no length validation), and 4) one character beyond maximum.
  4. Attempt to submit the form for each case.

**Expected Results:**
  - Zero-value characters are allowed — the field is optional;
  - Typical length accepted with no truncation.
  - At maximum allowed characters the field accepts input and storing/transmission works.
  - Beyond maximum the UI either prevents additional typing or shows a validation error with clear guidance.
  - Success criteria: message limits enforced gracefully and preserved through checkout. Failure: message truncation without notice or server rejection after submission.

#### 1.10. Responsive layout - mobile, tablet, desktop

**Steps:**
  1. Open the page in desktop with popular viewports; inspect layout and key controls.
  2. Open in tablet viewports (Android/IOS) and mobile viewports (Android/IOS).
  3. On each viewport: verify form fields are visible and usable, buttons are reachable, and no content overflows.
  4. Test keyboard access on desktop and touch interactions on mobile.
  5. Test orientation change on mobile (portrait/landscape).

**Expected Results:**
  - Layout adapts without overlapping content; form inputs usable at all sizes.
  - Call-to-action button remains visible and accessible.
  - No overflow or horizontal scrolling required on mobile.
  - Success criteria: page usable on core breakpoints. Failure: broken responsive layout or unreachable controls.

#### 1.11. Accessibility - keyboard navigation

**Steps:**
  1. Using keyboard only (Tab/Shift+Tab/Enter), navigate the entire form and reach the "Pay for your order" button.
  2. Confirm radio groups are keyboard-focusable and have accessible labels.
  
**Expected Results:**
  - All interactive elements are reachable via keyboard in a logical order.
  - Success criteria: no blocking accessibility issues. Failure: essential controls unreachable.

#### 1.12. Analytics & events - page view

**Steps:**
  1. Open browser devtools network/console or intercept analytics endpoints.
  2. On page load, observe page view analytics event (e. g. Mixpanel event)
  
**Expected Results:**
  - Events for page view and user interactions are emitted to analytics endpoints with correct payload.
  - Events fire without blocking UI or causing errors.
  - Success criteria: analytics team can map events to expected schema. Failure: missing or malformed events.

#### 1.13. Localization

**Steps:**
  1. Change site locale to EU or use EU VPN and visiting the URL.

**Expected Results:**
  - The page should only be accessible to US users.

#### 1.14. Session expiration mid-checkout

**Steps:**
  1. Start checkout flow as a logged-in user.
  2. Simulate session expiry.
  3. Attempt to submit form and observe behavior.
  4. After session expiry, attempt to re-authenticate or continue as guest and retry.

**Expected Results:**
  - If session expires, UI shows a clear message and provides steps (e.g., re-login or continue as guest).
  - No sensitive data is lost silently; inputs persist where possible or user is informed.
  - Order is not created without valid session or appropriate guest flow. Success criteria: graceful recovery path. Failure: loss of data without guidance or server errors.

#### 1.15. Common page checks

**Steps:**
  1. Favicon, title, menu's, breadcrumbs, header, footer, links.

#### 1.16. Checking Graphql API requests

**Steps:**
  1. Checking POST https://test-api.scentbird.com/graphql?opname=CartModify (validation)