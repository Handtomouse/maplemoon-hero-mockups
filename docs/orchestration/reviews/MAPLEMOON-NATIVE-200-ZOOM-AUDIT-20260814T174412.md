# MapleMoon native 200% browser-zoom audit — HOLD

## Verdict

HOLD. The native 200% condition was not reached or claimed. No candidate defect was observed; the required native-zoom evidence could not be safely acquired while the user's current application remained frontmost.

## What was proved

- Checkpoint and phase-start passed before the first evidence write.
- Integrated-certification and certified-preview receipt hashes, all seven page hashes and the four shared runtime/style hashes were exact at acquisition and close.
- Two isolated headed Chrome launches used fresh recorded profiles, unique CDP ports and exact PIDs. Each exposed exactly one MapleMoon page target at the local certified candidate.
- The first global-input safety check stopped before any keystroke because isolated PID `34563` was not frontmost.
- A process-directed native Command-Plus was then posted only to PID `34563`; Chrome ignored it. Quantitative metrics remained `innerWidth=1200`, `DPR=2`, `visualViewport.width=1200`, proving the result was still 100%, not 200%.
- A replacement Launch Services instance used PID `44151`, profile `/tmp/maplemoon-native-zoom-ls.KrEwK2` and port `9348`. The user's Messages PID `79920` remained frontmost, so no zoom key was sent.
- Exact audit PIDs `34563`, `44151` and server PID `34109` were closed. Both temporary profiles remain recorded and recoverable. No matching process or listener remained on ports `4412`, `9347` or `9348`.

## What remains unknown

- The required 175% reject control and native 200% proof.
- Effective CSS widths 390 and 720 while native zoom remains 200%.
- The seven-route 200% navigation, cart, focus, inertness, screenshot and visual matrices.

## Safety boundary

No user Chrome window was focused, resized, navigated, zoomed or closed. No global zoom key was sent. No CSS zoom, device emulation or page-scale substitute was used. No candidate, Styles Kit, deployment, Git, production or client action occurred.

## Required unblock

Run this packet in a GUI session where the uniquely identified isolated Chrome PID can be made frontmost without displacing or targeting an existing user browser/application, then rerun from a new non-overwriting checkpoint.
