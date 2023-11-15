# Tabby Background Plugin

Change Tabby background image and more...

## Features

- Change background to your favorite picture.
- Change UI Font to your favorite font, not affect terminal font.
- All changes applied in pure css, no dynamic javascript.
- Compatible with builtin black and white skin.
- Tested on Windows and MacOS with Tabby version 1.0.201.

## Usage

### Install

To install, use Tabby builtin plugin manager.

### Change Background Image

Enter the image file path into textbox or use the file picker.

For who use portable mode and want to use relative image path, image file can be placed in portable **data** directory, the image path must begin with **../../../data/**.

### Change UI Font

Enter the font family name into the textbox, can use the font name in **appearance** setting tab.

## Screenshot

### Settings Tab

![Black Settings](screenshots/black_settings.png)

### Fullscreen Mode

![Black Menu](screenshots/black_menu.png)
![Black Terminal](screenshots/black_term.png)
![White Menu](screenshots/white_menu.png)

### Float Mode

![White Menu Float](screenshots/white_menu_float.png)
![Black Term Float](screenshots/black_term_float.png)
![White Menu Float Shadow](screenshots/white_menu_float_shadow.png)
![White Term Float Shadow](screenshots/white_term_float_shadow.png)

## Changelog

- 1.3.1: Cleanup and minify.
- 1.3.0: UI rearrange.
- 1.2.6: Add drop shadow filter for float mode.
- 1.2.5: Add more background filters.
- 1.2.4: Add terminal toolbar transparent.
- 1.2.3: Add float mode.
- 1.2.2: Add group list transparent.
- 1.2.0: Add tabs parameter override.
- 1.1.4: Do not depend on in app global css.
- 1.1.2: Add image file picker.
- 1.1.0: Add change UI font.
- 1.0.0: Initial version.
