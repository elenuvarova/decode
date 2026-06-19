#!/bin/bash
# sf_svg.sh — export true vector SVG from SF Symbols app
# Usage: ./sf_svg.sh <symbol-name> [point-size]
# Example: ./sf_svg.sh house.fill 24

SYMBOL="${1}"
SIZE="${2:-24}"

if [[ -z "$SYMBOL" ]]; then
    echo "Usage: $0 <symbol-name> [point-size]" >&2
    exit 1
fi

osascript <<ASCRIPT
tell application "SF Symbols Beta"
    activate
end tell
delay 2.0

tell application "System Events"
    tell process "SF Symbols Beta"
        set frontmost to true
        delay 0.4

        -- Search for symbol
        keystroke "f" using command down
        delay 0.5
        keystroke "a" using command down
        delay 0.1
        keystroke "$SYMBOL"
        delay 1.5

        -- Escape: commits search, moves focus out of search field
        key code 53
        delay 0.4

        -- Click first result in grid
        set theGrid to list 1 of list 1 of scroll area 2 of splitter group 1 of window 1
        if (count of UI elements of theGrid) = 0 then
            error "No results found for: $SYMBOL"
        end if
        click UI element 1 of theGrid
        delay 0.5

        -- Open "Copy Image As…"
        click menu item "Copy Image As…" of menu 1 of menu bar item "Edit" of menu bar 1

        -- Wait for sheet to appear
        set sw to 0
        repeat while (count of sheets of window 1) = 0 and sw < 6
            delay 0.3
            set sw to sw + 0.3
        end repeat
        if (count of sheets of window 1) = 0 then error "Dialog did not open"

        -- Interact with sheet
        tell sheet 1 of window 1
            tell group 1
                -- Set format to SVG
                try
                    set fmt to pop up button 1
                    if value of fmt is not "SVG" then
                        click fmt
                        delay 0.3
                        click menu item "SVG" of menu 1 of fmt
                        delay 0.3
                    end if
                end try
                -- Set point size
                try
                    set value of text field 1 to "$SIZE"
                    key code 36
                    delay 0.2
                end try
                -- Click Copy Image
                try
                    click button "Copy Image"
                on error
                    key code 36
                end try
            end tell
        end tell

        delay 0.6
    end tell
end tell
return ""
ASCRIPT

pbpaste
