# METHOD SPEC: iMac keyboard-traversal harness
# Task: MAPLEMOON-KEYBOARD-PROOF-20260802
# Author: iMac worker (Claude Code)
# Written: 2026-08-02
# Status: DRAFT — awaiting Nate's go before build

## Why this spec exists

Per `DOM-SCREENING.json > key_delivery_diagnostic_20260802`, macbook Claude
explicitly stated: "Real traversal for the four outstanding pages should
be produced on a machine where Chrome can be brought frontmost (iMac worker
session), or on this laptop after the takeover gate is approved."

That is a hand-off to me. It is not a case for returning the task to macbook.

## Root cause the prior run identified

- Extension's key action DID reach the browser (hasFocus flipped false→true).
- 8 Tab presses from BODY produced zero focus advance.
- After programmatic focus onto first link, 2 more Tabs did not move focus.
- macOS Full Keyboard Access is enabled (ruled out).
- **Remaining cause: Chrome was not OS-frontmost.** Making it frontmost
  requires the gated `osascript activate`.

## Vehicle choice (iMac)

- **Key delivery:** `osascript -e 'tell application "System Events" to key
  code 48'` (Tab). This is a true WindowServer-level event via macOS
  Accessibility APIs. Not a synthesized KeyboardEvent.
- **Focus read:** Chrome DevTools Protocol (CDP) over WebSocket to
  `Runtime.evaluate`. CDP reads DOM state; it does not synthesize input.
- **Viewport clamp:** CDP `Emulation.setDeviceMetricsOverride` to
  {width:500, height:667, deviceScaleFactor:2, mobile:true}. Same
  ACCEPTED TOOLING LIMIT as prior run.
- **App scoping:** Use Nate's existing Chrome (single install on this
  Mac). Open a new Chrome window with `--new-window` targeting each page.
  Activate by app name.

## Failure-mode defence (what the prior run lacked)

Every Tab is atomic and self-defending:

```
for i in range(press_budget):
    osascript activate Google Chrome       # re-frontmost every Tab
    sleep 50ms                             # WindowServer settle
    if not cdp.eval("document.hasFocus()") : ABORT_PAGE
    osascript key code 48                  # Tab
    sleep 30ms
    stop = cdp.eval(descriptor_of_activeElement_js)
    if stop.was_body_and_stayed_body: focus_delivery_failed += 1
    stops.append(stop)
    if wrapped_to_first_stop: record wrapped_at = i and break
```

Two additional guards:

1. **Screenshot at t=0** of the front window, saved next to results, so we
   have visual evidence Chrome was frontmost and viewport matched intent.
2. **Focus-delivery counter**: if >3 consecutive Tabs failed to move focus
   (BODY → BODY), abort the page as UNVERIFIED with `focus_delivery_failed`
   reason. Do not attribute to page defect.

## Retained stop-list schema

The whole point of the re-run. Per stop:

```
{
  "i": <ordinal from 1>,
  "tag": "A" | "BUTTON" | "INPUT" | ...,
  "accessible_label": <computed name>,   // aria-label, textContent, alt, ...
  "width": <getBoundingClientRect().width>,
  "height": <getBoundingClientRect().height>,
  "in_closed_dialog": <bool>,
  "id": <element.id or "">,
  "classes": <element.className or "">
}
```

Plus per-page: `first_stop`, `wrapped_at` (index or null),
`unique_controls` (dedup by signature=tag+label+id).

## Press budget

Prior run used 60 for shop. Per brief: budget must be ≥ 2× tabbable count.
Static counts (from DOM-SCREENING):

  our-story:    23 → budget 60
  carob-story:  19 → budget 50
  stockists:    37 → budget 90
  faq:          36 → budget 90
  shop:         54 → budget 130   (prior 60 was undersized — a candidate
                                    cause for the 59-stop, 28-unique gap)

## Gate cost to Nate

- One `gogo` per Bash call.
- One Bash call per page × 5 pages = **5 gogos total, spaced out**.
- I will announce each page start in chat so Nate can approve as it comes,
  or he can pre-fire gogos knowing the sequence.

## What I will NOT do

- Modify `staging-v1/**`, `check-maplemoon-review.py`, server bind addresses.
- Push shared branches.
- Record CR verdicts.
- Fall back to synthesized keys if osascript fails.
- Change shop's prior VALID verdict — only report the actual cycle content
  and where it wraps, so Nate can settle the 59/28 gap.

## Deliverables

- `RESULTS.json` (schema-matched to prior, augmented with full stop lists)
- `screenshot_<page>_t0.png` per page (Chrome frontmost + viewport proof)
- `HARNESS.py` (the script itself, checked-in for reproducibility)
- scp of the whole `IMAC-KEYBOARD-PROOF-20260802/` folder back to macbook's
  `_wip/evidence/`.

## Open questions for Nate before I build

1. Do you want the harness to use Nate's existing Chrome (may briefly steal
   focus during the run), or launch an isolated Chrome (`--user-data-dir=
   /tmp/mm-chrome-...`) so your main browser is undisturbed?
2. Do you want me to try the CDP path to reach literal 390 CSS px via
   `setDeviceMetricsOverride` (extension couldn't reach 390; CDP might),
   or hold to 500x667 as ACCEPTED TOOLING LIMIT per prior run?
3. Do you want an ACK from macbook Claude first, or is your verbal go
   enough (given macbook Claude already handed this to me in writing)?

I proceed only after Nate answers those or waives them.

— iMac worker
