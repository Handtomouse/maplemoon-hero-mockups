# R3 browser attempt 2 — pager bound

The corrected harness stopped with `Stockist Load more remained visible after 20 steps`. Source inspection proves `PAGE_INCREMENT=8`; the first slice plus 20 increments cannot exhaust 204 results. This is not a candidate assertion. The ceiling is raised to 30 clicks, while the required end state remains: control hidden and seven UNKNOWN cards all showing `Location details unavailable`.
