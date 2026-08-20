# .vercelignore does not support nested re-inclusion

**Measured 20 Aug 2026 against a real `vercel build` on this repo. Do not undo this without repeating that test.**

## The rule

In `.vercelignore`, a negation **one level** below an excluded glob works.
A negation **two or more levels** below does not, even when every intermediate directory is
re-included in the correct order.

## The evidence

Both of these were in `.vercelignore` at the same time, in this order, during the same build:

```
_wip/*
!_wip/a11y_inner.css              <- SHIPPED
!_wip/styles/
_wip/styles/*
!_wip/styles/homepage.css         <- DID NOT SHIP
!_wip/deploy/
_wip/deploy/*
!_wip/deploy/site/
_wip/deploy/site/*
!_wip/deploy/site/mock-cart.css   <- DID NOT SHIP
!_wip/deploy/site/mock-cart.js    <- DID NOT SHIP
```

Verified by `rm -rf .vercel/output && vercel build --yes`, then listing
`.vercel/output/static/_wip/`. Nine files present, none of the nested three.

Only one variable differed between the working and non-working cases: depth.

## Why this catches people

The four-line `dir/*` then `!dir/` then `dir/*` then `!file` pattern is the **standard gitignore
workaround**, and it is correct in git. `git check-ignore` will confirm it. `.vercelignore` uses
identical syntax with different semantics, so the rules look right to anyone who knows git, nothing
errors, and the file is simply absent. You find out when a stylesheet 404s in production.

The mechanism is not confirmed. Vercel's collector appears to decide per-file against the rule list,
or to prune on the first directory-level match without evaluating deeper negations, rather than
walking with re-inclusion state the way git does. That is an inference. The behaviour above is measured.

## What to do instead

**Keep the allowlist flat.** Never express "ship one file from deep inside an excluded tree". Put a
copy of the file one level down, or in a directory that already ships, and negate it there.

## How to test any change to this file

A simulation is not a test. Two separate checks on 20 Aug both reported PASS on the nested rules
because both simulated gitignore semantics — they confirmed the assumption instead of testing it.
The only thing that settled it was running the real builder:

```bash
rm -rf .vercel/output && vercel build --yes
find .vercel/output/static -type f | wc -l
find .vercel/output/static -name 'settings_data.json' -o -ipath '*password*' -type f
```

`vercel build` is local and does not deploy.
