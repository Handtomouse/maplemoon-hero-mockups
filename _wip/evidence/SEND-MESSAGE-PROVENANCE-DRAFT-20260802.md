# SEND MESSAGE: PROVENANCE PARAGRAPH, DRAFT WORDING
# Written: 2026-08-02 · macbook Claude Code (worker session)
# Status: DRAFT for Nate. NOT SENT, NOT APPROVED, NOT AUTHORISED TO SEND.
# Scope: covers ONE topic only, asking Carli and Dylan to confirm supplier and organic
# certification. It is a paragraph to sit inside the review send, not the whole message.

---

## PART 1: CLIENT-FACING WORDING (Carli and Dylan)

Three alternatives, light-touch to explicit. Pick one; do not stack them.

All three are written to get the same two facts back:
1. **who the carob is bought from**, and
2. **whether organic certification is held, by whom, and the certificate number.**

---

### Option A: lightest touch

> One small thing while you're in there. A few places across the site say the carob is
> Australian and organic. It's in the page title, the line under the logo on the homepage, and
> a handful of spots in the copy. Could you confirm those read right to you, and let me know
> who you buy the carob from? And if there's organic certification on it, could you send me the
> certifier and the certificate number when you get a chance? I'd rather have it on file now
> than chase it the week we go live.

*Use if:* you want the lightest possible ask and are confident they'll come back with the
detail without being prompted twice.

*Risk:* "if there's organic certification" gives them an easy "yes there is" without the
number, and you'd be asking again.

---

### Option B: middle, recommended

> One thing I'd like to lock down while you're reviewing. The site says the carob is Australian
> and organic in a few prominent places: the page title, the eyebrow line under the homepage
> logo, and through the body copy on the homepage, shop and stockists pages. I've kept all of
> that in, because you're the ones who actually know the supply chain.
>
> Two things I need from you so I can put it to bed:
>
> 1. **Who you buy the carob from**, the grower or supplier name, and where they are.
> 2. **The organic certification**: whether it's held, who the certifier is (ACO, NASAA,
>    AUS-QUAL, whoever), and the certificate number. A photo of the certificate is perfect.
>
> No rush on the review itself, but these two are worth getting to me early, because "organic"
> is one of the few words on a food site that has to be backed by an actual certificate rather
> than by it being true, and I'd rather sort that now than in the week we're switching the shop
> on.

*Use if:* you want one clear ask that will actually return the certificate number. This is the
one I'd send.

*Note:* the certifier names are examples to make the question concrete and easy to answer. If
you'd rather not name any, cut the bracket. It still reads fine.

---

### Option C: most explicit

> Before we go much further I want to be straight with you about one part of the copy.
>
> Right now the site describes the carob as Australian and organic. That's in the browser page
> title, the eyebrow line under the logo on the homepage, the meta description, and several
> lines of body copy across the homepage, shop, our story, carob story and stockists pages.
> I've deliberately left every one of those in for this review, because they're your claims to
> make and you're the only people who can confirm them.
>
> Two separate things, and they need separate answers:
>
> - **Australian.** Who do you buy the carob from, and where are they? I have the Australian
>   Carob Co credited on the carob story page as the source of the farm photography, but I
>   don't want to assume that's also who you buy from.
> - **Organic.** Is there organic certification behind it, and if so, who's the certifier and
>   what's the certificate number? This one's different from the first: "organic" on a food
>   product means certified by an approved certifier, and that certificate is held by a
>   specific business. It's worth knowing whether it's held by the grower, by you, or both.
>
> Nothing here needs solving this week, and it doesn't hold up the review. But it does need to
> be settled before the shop goes live to the public, so it's better as a question now than a
> scramble later. If the paperwork is all there, this is a five-minute job and I'll stop
> asking.

*Use if:* you want it unambiguous and on the record, and you're comfortable with a slightly
longer paragraph in the send.

---

### Wording checks applied to all three

- No accusation, no implication that anything is false, no suggestion they've done something
  wrong. The framing throughout is "you're the authority, confirm it for me."
- Deliberately free of compliance-notice vocabulary. It reads as a designer asking a practical
  question, not as a warning. (The specific words screened out are listed in Part 2.)
- Each option names the two deliverables explicitly (supplier; certifier plus certificate
  number) rather than asking a vague "can you confirm provenance", which returns nothing
  usable.

---
---

## PART 2: FOR NATE ONLY. NOT FOR THE CLIENT. DO NOT PASTE ANY OF THIS BELOW THIS LINE.

### The two claims are not one claim

"Australian" and "organic" are separate and fail separately.

**Australian** is a factual statement about where the carob was grown. You've said it is
Australian. If that's right, it needs a supplier name behind it and nothing more exotic.

**Organic** is not a description. It is a certification held by a certified operator, issued by
an approved certifier, attached to a specific business and a specific certificate number. Carob
grown organically by an uncertified grower is not "organic" for labelling purposes. It is also
possible for the *grower* to be certified while Maple Moon is not, which matters because the
site says the finished bars are made from Australian organic carob, not merely that the grower
is certified.

Practical consequence: a supplier confirmation can settle "Australian" outright. It cannot
settle "organic". Only a certificate can.

### Timing: this is a pre-launch blocker, not a pre-send blocker

I'd separate these deliberately:

- **The review send is defensible.** The package goes to Carli and Dylan, who are the authority
  on their own supply chain. Putting the claims in front of them is how they get confirmed or
  corrected; stripping them out would remove the thing they need to rule on.
- **Public launch is where it stops being defensible.** The Shopify work you've described as
  roughly a week out is the point at which either the certification exists, or the word
  "organic" comes out of the title, the hero eyebrow, the meta descriptions and the body copy.

So: ask now, resolve before launch. Don't hold the send for it.

### What I actually found in the frozen package (verified, use this rather than memory)

Claims are on **five** of the six pages, not one or two:

| Page | Where |
|---|---|
| `homepage.html` | `<title>Maple Moon: Australian Organic Carob</title>`; meta description "Australian organic carob… Slow-made on the far north coast of NSW."; hero eyebrow "Australian organic carob"; badge "Organic Ingredients"; "grows in the warm Australian sun"; "Sun-ripened"; "Australian-grown carob pods."; "The far north coast" |
| `shop.html` | meta description "…Made from Australian organic carob."; body "All made from Australian organic carob, naturally sweet with nothing added"; "Roasted organic carob powder" |
| `our-story.html` | subnav "Australian carob"; "From Brunswick Heads, far north coast NSW"; "simple, clean, organic, and guided by nature's rhythm" |
| `carob-story.html` | "Maple Moon uses Australian-grown carob."; badge "Australian grown"; caption "Farm photography · The Australian Carob Co" |
| `stockists.html` | "bars, moons, bites and elixirs, all made from Australian organic carob" |

One counting caution: `stockists.html` has roughly 26 occurrences of "Organic", but all except
the one line above are **stockist business names** (About Me Organics, Kunara Organic
Marketplace, and so on). Don't read that page as carrying 26 claims. It carries one.

### Two things the register and the copy disagree on

**(a) No page actually names a carob supplier.** The only occurrence of "Australian Carob Co"
anywhere in the frozen package is a photo credit on `carob-story.html`: "Farm photography ·
The Australian Carob Co". That is a credit for imagery, not a statement of who the carob is
bought from. CV-046 records supplied copy referencing "Australian Carob Co. / South Australia /
Byron Bay", but I could not find that supplier paragraph in the built package. So the site
makes an origin claim without naming a source, which is why Options B and C ask for the
supplier by name rather than asking them to confirm one.

**(b) The geography does not obviously reconcile.** CV-046 and CV-063 both point at **South
Australia** for the carob. The site copy's geography is **far north coast NSW / Brunswick Heads
/ Byron Bay**. On `our-story.html` that reads clearly as where *Maple Moon* is based, which is
consistent. But on the homepage the carob section places "Australian-grown carob pods" (item
01) and "The far north coast" (item 03) as adjacent numbered items in the same block. I am not
certain how an ordinary reader parses that. It may read as the carob being grown on the far
north coast, which would contradict the register. Worth deciding whether that block needs
disambiguating regardless of how the certification question lands.

### Register rows, quoted exactly

From `docs/orchestration/reviews/CARLI-CANVA-NOTE-REGISTER-20260731.md`:

- **CV-046** (Carob Story), captured, delivery not checked. Disposition `needs-fact-check`;
  "supplier, geography, process and ingredient claims require authority".
- **CV-063** (FAQ), captured, delivery not checked. "Supplier answer says Maple Moon gets carob
  from an Australian carob farm in South Australia". Disposition `needs-fact-check`; "Canva
  contains spelling errors and is not sufficient supplier proof".

Both are open. Getting the supplier name plus a certificate number closes both, and they can
only be closed by Carli and Dylan.

### Vocabulary screened out of Part 1

The client-facing wording above was checked to contain none of: liability, exposure,
regulatory, ACCC. If you edit Part 1, keep it that way. The point is that this reads as a
designer asking a practical question, not as a compliance notice.

### What this draft is not

It records no verdict, approves no claim, and authorises no send. Any statement that this copy
has been *verified* would be wrong. It is **retained pending certification**, which is a
different state, and downstream records should say so.
