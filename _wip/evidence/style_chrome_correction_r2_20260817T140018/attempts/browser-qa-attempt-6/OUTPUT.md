# Full-browser attempt 6 — mixed-purpose context preserved

All required widths through most 1024px cases ran, but the harness still used
one page both to activate the skip target and to capture top geometry. The skip
correctly moved that page away from the top, creating reset races. The final
harness uses an isolated fresh context for first-focus/activation and a separate
never-scrolled context for image, geometry, overflow and screenshot checks.

This correction strengthens test isolation; it changes no output rule or
threshold.
