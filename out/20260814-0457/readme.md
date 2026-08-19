# MapleMoon carob story pickup shoot

Status: commission-ready, not sent.

This packet turns the Job 5 HOLD into one controlled pickup shoot. It commissions five required photographs:

1. Matched carob comparison specimen
2. Matched cacao comparison specimen
3. The grove
4. The pod
5. The roast

An optional carob-branch hero is included only as an on-day insurance frame. It is not part of the quoted minimum unless the photographer prices it in.

## Recommended commissioning route

Primary crew: Mitch West and Maelee Fauchet, Enlighten Media.

- Email: enlightenmedia.contact@gmail.com
- Mitch: +61 412 696 354
- Maelee: maeleefauchet@hotmail.fr
- Existing channel: Maple Moon Photo Shoot iMessage group

The previous relationship was warm and collaborative. Mitch and Maelee handled capture, lighting, site inspection and setup well. Advanced cleanup later moved in-house, so this pickup separates capture from final art finishing:

- Photographer scope: controlled capture, RAW originals, neutral selects, source metadata and written usage terms.
- HandToMouse scope: final responsive crops, shared grade, retouch QA, contact sheet and page testing.
- Optional photographer retouch: quote separately against the acceptance specification.

Nigel Young at The Australian Carob Co is the proposed farm-access and specimen liaison, not the photographer:

- Email: nigel@australiancarobs.com
- Phone: +61 439 823 725

Current availability, location access, specimen supply, fee and usage terms are unknown. They must be confirmed before booking.

## Why a pickup is necessary

The current review packet is useful evidence but remains HOLD. Its grove, pod and roast frames were made on three dates, two camera types, different focal lengths, flash versus no flash, and exposures ranging from 1/250 second to 1.3 seconds. A grade cannot truthfully turn those captures into one photographer, one day and one light.

The current carob and cacao comparison also fails as a pair at the live page crops. The pickup locks both specimens to one camera, tripod, background and lighting setup.

Slot 7 is not another visible region. It is the hidden background layer of slot 2, so no seventh primary image is commissioned.

## Files

- commission_brief.md: concise photographer-facing scope and commercial request.
- shot_list_and_call_sheet.md: exact five-shot capture plan, props, lighting and crop contracts.
- acceptance_and_delivery_spec.md: technical, rights, retouch and integrity gates.
- message_draft_enlighten.md: send-ready commissioning message for the existing photo group or email.
- message_draft_nigel.md: send-ready farm-access and specimen request.
- source_register.md: exact evidence paths, checksums and prior relationship facts.
- files_sha256.txt: packet integrity receipt generated after verification. It intentionally excludes itself.

## Decision gates before booking

All six questions need a written answer:

1. Can one photographer shoot all five required images on one local calendar day?
2. Can the entire set be made at or beside a real carob grove under one stable diffuse-light setup?
3. Can the team source one botanically verified cacao specimen and keep its source receipt?
4. Can the process owner identify and sign off one exact roasted carob batch for the roast frame?
5. Will the photographer deliver untouched RAWs, metadata and the stated commercial usage rights?
6. What is the total fee, travel cost, earliest available date and turnaround?

Do not book, wire images, or promote the current Job 5 packet until those gates are closed.

## Existing review packet

- Manifest: /Users/handtomouse/maplemoon_carobstory_set_20260814/MANIFEST.md
- Contact sheet: /Users/handtomouse/maplemoon_carobstory_set_20260814/CONTACT_SHEET.html
- Manifest SHA-256: 636c864256b6cc3f4fd5a8138fd5d83adff3da17db526da807e9e415ebd768ec
- Contact sheet SHA-256: b30cf456c0d3a2e0763137f4079b5fdca2472d492b23a2e79042fa9680184883

No build file, live page, task, server, Git branch or external communication was changed by this handoff.

## Verification receipt

Command:

```sh
sh out/20260814-0457/verify_packet.sh
cd out/20260814-0457
shasum -a 256 -c files_sha256.txt
```

Real output:

```text
NONEMPTY readme.md 5483 bytes
NONEMPTY commission_brief.md 4655 bytes
NONEMPTY shot_list_and_call_sheet.md 7741 bytes
NONEMPTY acceptance_and_delivery_spec.md 8593 bytes
NONEMPTY message_draft_enlighten.md 2829 bytes
NONEMPTY message_draft_nigel.md 2548 bytes
NONEMPTY source_register.md 6586 bytes
CLEAN prohibited dash count 0
CLEAN prohibited word count 0
FOUND cmp_carob
FOUND cmp_cacao
FOUND gallery_grove
FOUND gallery_pod
FOUND gallery_roast
FOUND 0.545
FOUND 1.213
FOUND 1.790
FOUND 1.430
FOUND enlightenmedia.contact@gmail.com
FOUND nigel@australiancarobs.com
FOUND No booking has been made
FILES 8
BYTES 39757
acceptance_and_delivery_spec.md: OK
commission_brief.md: OK
message_draft_enlighten.md: OK
message_draft_nigel.md: OK
readme.md: OK
shot_list_and_call_sheet.md: OK
source_register.md: OK
verify_packet.sh: OK
```

Reference immutability recheck:

```text
18391571dc32c8c6e1f30094c8486e4ca72bc54f2570370a9d9fc26d128177cf  /Users/handtomouse/maplemoon_build_20260813/carob-story.html
636c864256b6cc3f4fd5a8138fd5d83adff3da17db526da807e9e415ebd768ec  /Users/handtomouse/maplemoon_carobstory_set_20260814/MANIFEST.md
b30cf456c0d3a2e0763137f4079b5fdca2472d492b23a2e79042fa9680184883  /Users/handtomouse/maplemoon_carobstory_set_20260814/CONTACT_SHEET.html
```
