# MapleMoon family-and-friends soft-launch test plan

**Status:** local planning only; no test, invitation, tracking or collection is active  
**Commerce:** mock journey only; no order, payment or inventory action  
**Activation:** HOLD until Nate approves the exact artifact, participants, access, notice, data owner, retention and analysis route

## Purpose

Use a small, privacy-conscious test to learn whether ordinary visitors understand MapleMoon, navigate the six-page experience, explore products and complete the clearly mocked cart journey without encountering anything broken or misleading. The test is directional product/design evidence, not statistically representative research and not production analytics.

## Named research questions

| ID | Question | Primary evidence |
|---|---|---|
| Q1 | Can a first-time visitor explain what MapleMoon is and find the core pages without help? | Task completion, page/section views, navigation clicks, comprehension response |
| Q2 | Can a visitor find a product of interest and understand the mock Add to Cart, cart and checkout-confirmation journey? | Product-interest click and mock-cart funnel; task-success response |
| Q3 | Which words, sections or assets appear inaccurate, unclear, incomplete or untrustworthy? | Typed feedback classified as factual/content or missing asset |
| Q4 | Does the experience remain usable across phone and laptop/desktop, keyboard navigation and 200% zoom? | Device family, manual task result, accessibility feedback and technical failures |
| Q5 | Where do reviewers stop, abandon feedback or encounter broken links, images, layout or interactions? | Funnel exits, feedback abandon and technical-failure evidence |

Every proposed event in the companion schema names at least one of these questions. If an event does not answer a question, it is excluded.

## Proposed cohorts

Names, counts and invitations are deliberately unset.

| Code | Proposed role | What it tests | Gate |
|---|---|---|---|
| `internal-qa` | Nate/HandToMouse technical dry run | Exact frozen artifact, event validation, accessibility and failure handling | Local dry run must pass before any external cohort |
| `ff-first-look` | Small set of first-time family/friends reviewers | Unprompted comprehension, navigation and mock purchase journey | Nate approves named participants, message, access and window |
| `client-review` | Carli and Dylan | Factual/content accuracy, design preference and supplied-asset gaps | Separate exact client-send approval after Nate wakes |

Do not merge client feedback with family/friends behaviour in one undifferentiated result. Do not infer demographic, health, lifestyle or purchasing segments.

## Staged route

1. **Frozen-artifact gate** — record exact page and asset hashes; `share_ready` remains false until all approvals exist.
2. **Internal dry run** — use synthetic/test events only; prove schema validation, test-data separation, no payment/order action and deletion/export behaviour.
3. **Small first-look cohort** — only after Nate and the privacy/security owner approve participants, notice, access, collection and retention.
4. **Stop and inspect** — fix critical breakage before adding participants; never expand automatically.
5. **Optional client review** — separately approved wording and channel; no site material is sent while Nate sleeps.
6. **Close** — export the approved aggregate, delete raw test data under the approved retention rule, record limitations and deactivate the test route.

## Reviewer tasks

Use the same concise script without coaching:

1. In one sentence, what do you think MapleMoon offers?
2. Find the Shop and choose one real, evidenced product that interests you.
3. Add it to the mock cart, change quantity or remove it, then reach the clearly fake checkout confirmation.
4. Find the story of MapleMoon and the explanation of carob.
5. Find how you would locate a stockist and where you would look for a common question.
6. Submit one clearly labelled mock feedback item or explain why you chose not to.

The script must not direct participants toward a preferred answer or ask about health outcomes, taste superiority or purchase intent.

## Task and funnel definitions

### Core navigation funnel

`hub view → clean page open → at least one meaningful section view → another clean page or return to hub`

### Product-interest funnel

`Shop view → product-interest action → mock Add to Cart → cart open → quantity/remove optional → mock checkout start → fake confirmation`

### Feedback funnel

`feedback open → required fields valid → mock submit → honest no-send/no-store confirmation`

An abandonment is counted only when a funnel started and no next step occurred before the approved session timeout. The timeout and success thresholds must be selected before activation and may not be changed after seeing results.

## Minimum safety and quality gates

- Zero real order, payment, inventory, email, client-message or production action.
- Zero internal, annotated, WIP, governance, localhost, account or credential exposure.
- Zero unapproved product, price, process, health or comparative claim.
- Zero raw names, emails, phone numbers, payment details, precise location, full IP, cross-site identifiers or session replay.
- No exact user agent, exact viewport or device fingerprint; use coarse approved families only.
- A visible notice states the purpose, test status, data categories, owner, retention and contact before any real collection.
- Keyboard, focus, literal 200% zoom, 390 px and 1440 px checks pass on the frozen artifact.
- Critical broken journeys stop the test; the cohort does not expand around a defect.

## Minimal questionnaire

Only if separately approved:

- task completed: yes / partly / no;
- “In your own words, what is MapleMoon?”;
- confidence that the page was clear: 1–5;
- optional concise feedback using the approved taxonomy;
- optional accessibility issue category.

Free text must warn reviewers not to include personal or sensitive information. A non-free-text alternative must remain available.

## Privacy, consent and retention gate

Current disposition is **no collection**. Before activation, the owner must document:

- the minimum data actually needed for Q1–Q5;
- the lawful notice/consent disposition and the person responsible for it;
- who can access raw and aggregate test data;
- storage location, encryption and export controls;
- a short retention period and verified deletion method;
- how a participant can ask what was collected or request deletion;
- how test data is kept separate from any later production analytics.

No tool, endpoint, cookie, third-party script, session replay or persistent identifier is selected by this plan.

## Pre-activation decisions

Nate must approve the exact frozen artifact, named participants, cohort sizes, start/end window, invitation wording, access/expiry, event subset, notice, data owner, storage, retention, analysis owner and stop thresholds. These decisions may be taken later without blocking local website work.
