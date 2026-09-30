# Chrome Web Store Listing Draft

## Name

GrayFocus

## Short description

Turn websites grayscale and save your choice separately for each site.

## Detailed description

GrayFocus lets you reduce color on websites with a per-site grayscale toggle. Turn it on or off from the toolbar, and GrayFocus remembers your choice for future visits. Your preferences stay in your browser; no account is required.

## Category and language

- Category: Productivity
- Language: English

## Single purpose

GrayFocus turns website colors grayscale on sites where the user has enabled it, helping reduce color distractions.

## Permission justifications

- `storage`: Save the user's grayscale on/off preference for each website hostname in Chrome local storage.
- `activeTab`: Apply the user's requested grayscale setting to the current tab when they use the toolbar popup.
- `scripting`: Add or remove the grayscale class in the current tab after the user uses the popup.
- Website access (`<all_urls>`): Check the saved preference and apply the grayscale stylesheet on websites the user has configured. GrayFocus does not read page text or transmit page content.

## Data and code disclosures

- Website hostnames and on/off preferences are stored locally in the user's Chrome profile.
- GrayFocus does not send this information to a server, sell it, or share it with third parties.
- GrayFocus does not use analytics, advertising, or remotely hosted code.
- Privacy policy draft: see [PRIVACY.md](PRIVACY.md). Publish it at a public HTTPS URL and enter that URL in the dashboard.

## Remaining listing asset

Capture at least one 1280x800 screenshot showing GrayFocus working on a webpage with the grayscale effect enabled. The extension package already includes its 128x128 store icon.