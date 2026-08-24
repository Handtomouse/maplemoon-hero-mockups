# R3 attempt 2 — source-note count correction

The second run stopped at `STOCK_NOTE_FAIL expected=7 actual=8`. The seven UNKNOWN records are not the complete source-note set: MoonTree also carries the documented `26309` to `2630` correction note. The Stockists page had not yet been written and remained byte-identical to R2 (`b7cb9f…`). Home contained only the intended approved cleanup (`8ad9c525…`).

Correction: remove all eight visitor-irrelevant source-note fields while preserving the 204-object governed field projection. Recovery requires this exact Home partial hash, exact R2 Stockists hash, and byte equality for every other R3 file before the deterministic transforms are regenerated from R2 inputs.
