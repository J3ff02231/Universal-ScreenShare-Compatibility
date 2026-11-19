# Universal ScreenShare Compatibility

A lightweight browser extension for Chromium-based browsers, designed to improve HTML5 video screen-sharing compatibility.

Universal ScreenShare Compatibility applies visual adjustments to HTML5 video elements to help resolve black-screen issues when sharing browser content through applications such as Discord.

Designed for the Chromium ecosystem, the extension aims to provide a universal solution across Chromium-based browsers and different websites, rather than being limited to a single browser or streaming platform.

<p align="center">
  <strong>Version 1.0.1</strong> · Manifest V3 · Chromium-based browsers
</p>

## Overview

Have you ever tried sharing a streaming video through Discord, only to find that the video appears as a black screen while the webpage and audio are still visible?

Universal ScreenShare Compatibility was created to address this kind of issue.

The extension detects HTML5 video elements and applies visual adjustments intended to improve browser video compositing and screen-capture compatibility.

It is designed to work across Chromium-based browsers, providing a broader approach than solutions intended for a single browser or streaming service.

## Features

- **Chromium-wide compatibility:** Designed for Chromium-based browsers supporting Manifest V3.
- **Universal website support:** Works across websites allowed by the extension's host permissions.
- **HTML5 video detection:** Finds video elements on the current page.
- **Dynamic detection:** Detects videos added after the page has loaded.
- **Visual compatibility adjustments:** Applies specific CSS properties to detected video elements.
- **Enable/disable control:** Turn compatibility adjustments on or off through the extension popup.
- **Video status information:** Displays information about detected video elements.
- **Dynamic extension icon:** Changes the extension icon according to its enabled state.
- **Custom interface:** Includes a dedicated popup with status indicators and controls.

## How does it work?

The extension monitors webpages for HTML5 `<video>` elements.

When a video is detected, it applies the following CSS properties:

```css
filter: sepia(0%);
opacity: 0.9999;
mix-blend-mode: normal;
```

These adjustments are intended to influence how the browser composites the video element.

The extension also uses a `MutationObserver` to detect video elements that are dynamically added to the page.

Original inline styles are saved so they can be restored when the extension is disabled.

**Important:** These adjustments do not guarantee that every video player or streaming platform will be compatible with screen sharing.

## Compatibility

Universal ScreenShare Compatibility is designed for Chromium-based browsers that support Manifest V3 and the required extension APIs.

Its universal approach allows it to operate across different Chromium-based browsers without being tied to a specific browser brand.

Compatibility may still depend on the browser version, website implementation, video player, and screen-capture method.

## Installation

### Chromium-based browsers

1. Download or clone this repository.
2. Extract the project folder if you downloaded it as a ZIP.
3. Open your browser's extensions management page.
4. Enable **Developer mode**.
5. Select **Load unpacked**.
6. Choose the folder containing `manifest.json`.
7. The extension should now appear in your browser toolbar.

## Usage

1. Open a website containing an HTML5 video player.
2. Click the Universal ScreenShare Compatibility icon in your browser toolbar.
3. Check the extension's current status.
4. Enable the compatibility adjustments.
5. Start sharing your browser screen or window through Discord.
6. Check whether the video is visible in the transmitted stream.

You can disable the adjustments at any time through the popup.

## Project structure

```text
Universal-ScreenShare-Compatibility/
│
├── manifest.json
├── background.js
├── content.js
├── popup.html
├── popup.js
└── README.md
```

## Limitations

- Compatibility is not guaranteed for every website or video player.
- Some video players may use rendering methods other than standard HTML5 video elements.
- Protected video playback may behave differently depending on the DRM implementation and browser.
- The extension does not decrypt video streams, extract encryption keys, or download protected content.
- The extension does not remove DRM protection.

## Credits and attribution

This project is based in part on the implementation approach used by:

**Netflix Screenshare Fix** by **Nikolaos Papoutsakis (npapoutsakis)**

Original repository:

https://github.com/npapoutsakis/netflix-screenshare-fix

The original project provided the reference implementation for the visual video-compositing adjustments used in this extension, including:

- `filter: sepia(0%)`
- `opacity: 0.9999`
- `mix-blend-mode: normal`
- DOM mutation monitoring for video detection.

Universal ScreenShare Compatibility adapts and extends this approach for broader website and Chromium-based browser compatibility.

Additional modifications and functionality include generalized website matching, multiple video element processing, original style preservation and restoration, extension controls, status reporting, and a custom popup interface.

The original author and project retain their respective copyright and attribution.

See the original repository for its MIT License and original project information.

## Disclaimer

This project is provided for compatibility testing and educational purposes.

It is not affiliated with, endorsed by, or associated with Discord, Crunchyroll, Netflix, Video.js, or any other streaming platform.

Users are responsible for complying with the terms of service and applicable rules of the websites and applications they use.

## License

See the `LICENSE` and `THIRD-PARTY-NOTICES.md` files for licensing information and third-party attribution.
